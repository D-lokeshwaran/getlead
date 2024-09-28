import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import client from "@/utils/mongoLib/mongodb";

import sendCustomEmail from '@/utils/mailer/sendEmail';
import emailVerificationTemplate from '@/emailTemplates/emailVerificationTemplate';
import updateUser from "@/app/actions/updateUser";

import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import bcrypt from "bcryptjs";
import User from "@/utils/mongoLib/models/user";

export const authOptions = {
    adapter: MongoDBAdapter(client),
    session: {
        strategy: "jwt",
    },
    jwt: {
        encryption: true,
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signup',
        verifyRequest: '/verify-request', // (used for check email message)
        newUser: '/onboard'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as String,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as String,
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
            async sendVerificationRequest({ identifier, url, provider }) {
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
            async authorize(credentials, req) {
                const { name, birthday, password } = credentials;
                const res = await updateUser(name, birthday, password);
                if ([400, 500].includes(res?.status)) {
                    throw new Error(res.message);
                }
                return res;
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
        }) {
            if (trigger === "update" && session) {
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               token.user = { ...(token.user as any), ...session };
            }
            if (user) {
               token.accessToken = account?.access_token;
               token.expires_at = account?.expires_at;
               delete user.password;
               token.user = user;
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client
            session.accessToken = token.accessToken
            session.providerAccountId = token.providerAccountId
            session.user.id = token.id;
            session.user = {
                ...session.user,
                ...(token.user as any),
                id: token.id
            };
            delete session.user.password;
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