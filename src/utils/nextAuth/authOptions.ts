import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/mongoLib/mongodb";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

import sendCustomEmail from '@/utils/mailer/sendEmail';
import emailVerificationTemplate from '@/emailTemplates/emailVerificationTemplate';
import updateUser from "@/app/actions/updateUser";

import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import bcrypt from "bcryptjs";
import User from "@/utils/mongoLib/models/user";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
//     jwt: {
//         secret: process.env.NEXTAUTH_SECRET,
//     },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signup',
        verifyRequest: '/verify-request', // (used for check email message)
        newUser: '/onboard'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // google only provide refresh token on initial login to force google to
            // reissue added below config.
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            async sendVerificationRequest({ identifier, url }) {
                await sendCustomEmail(
                    identifier,
                    `Please verify your email`,
                    emailVerificationTemplate,
                    { link: url }
                )
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { type: "text" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                await connectMongoDB();
                const foundUser = await User.findOne({ email: credentials?.email });
                if (!foundUser) {
                    throw new Error("User doesn't exists");
                }
                const matchPassword = await bcrypt.compare(
                    credentials!.password,
                    foundUser?.password
                );
                if (!matchPassword) {
                    throw new Error("Incorrect password");
                }
                return foundUser;
            }
        }),
        CredentialsProvider({
            id: "onboard",
            name: "Credentials",
            credentials: {
                name: { type: "text" },
                birthday: { type: "text" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                const res = await updateUser(
                    credentials?.name as string,
                    credentials?.birthday as unknown as Date,
                    credentials?.password as string
                );
                if ([400, 500].includes(res?.status as number)) {
                    throw new Error(res.message);
                }
                return res as NextAuthUser;
            }
        }),
    ],
    callbacks: {
        async jwt({
            token,
            user,
            account,
            trigger,
            session,
        }
//         {
//             token: JWT;
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             user?: any;
//             account?: Account | null;
//             trigger?: "signIn" | "signUp" | "update" | undefined;
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             session?: any;
//         }
        ) {
            if (trigger === "update" && session) {
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               token.user = { ...(token.user as any), ...session };
            }
            if (user) {
               token.accessToken = account?.access_token;
               token.expires_at = account?.expires_at;
               token.provider = account?.provider;
               //delete user.password;
               token.user = user;
            }
            return token;
        },
        async session({
            session,
            token
        }:{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
           session: any;
           token: JWT;
        }) {
            // Send properties to the client
            session.accessToken = token.accessToken;
            session.provider = token.provider;
            session.providerAccountId = token.providerAccountId;
            session.user.id = token.id;
            session.user = {
                ...session.user,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...(token.user as any),
                id: token.id
            };
            //delete session.user.password;
            return session
        }
    },
    cookies: {
        sessionToken: {
            name: "lead_session",
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            }
        }
    }
};