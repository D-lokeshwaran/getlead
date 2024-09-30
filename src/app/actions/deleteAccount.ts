'use server';

import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/user";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/mongoLib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/nextAuth/authOptions";

type CustomSessionType = {
    accessToken: string,
    provider: string,
    providerAccountId: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteAccount = async (email: string) => {
    try {
        await connectMongoDB();
        const { deleteUser, deleteSession, unlinkAccount } = await MongoDBAdapter(clientPromise);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { accessToken, provider, providerAccountId } = await getServerSession(authOptions) as CustomSessionType;
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return { message: "User doesn't exists", status: 500 };
        }
        await Promise.all([
            deleteSession?.(accessToken),
            unlinkAccount?.({ provider, providerAccountId }),
            User.deleteOne(foundUser._id),
            deleteUser?.(foundUser._id), // cleanup all user related in db
        ])
        .then(() => {
            //const deletedAccount = res?.[3];
            console.log("Account deleted Successfully")
        })
        .catch(err => console.log("Account Delete Failed: ", err));

        return {
            message: "Thanks for trying out getLead! See you next time",
            status: 200,
        };
    } catch (error) {
        console.log((error as Error).message);
        return { message: "Something went wrong, please try later", status: 500 };
    }
}

export default deleteAccount