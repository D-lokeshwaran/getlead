'use server';

import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/user";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import client from "@/utils/mongoLib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/nextAuth/authOptions";
import nextReact from 'next-auth/react';


export const deleteAccount = async (email: string) => {
    try {
        await connectMongoDB();
        const { deleteUser, deleteSession, unlinkAccount } = MongoDBAdapter(client);
        const { accessToken, providerAccountId } = await getServerSession(authOptions);
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return { message: "User doesn't exists", status: 500 };
        }
        await Promise.all([
            deleteSession(accessToken),
            unlinkAccount({providerAccountId}),
            User.deleteOne(foundUser._id),
            deleteUser(foundUser._id), // cleanup all user related in db
        ])
        .then(res => {
            const deletedAccount = res?.[3];
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