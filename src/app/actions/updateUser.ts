'use server';

import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/nextAuth/authOptions";
import bcrypt from "bcryptjs";

type UpdateUserType = {
    name?: string,
    email?: string,
    image?: string,
    birthday?: Date | string,
    password?: string,
    message?: string,
    status?: number,
}

const updateUser = async (
    name: string,
    birthday: Date,
    password: string | undefined,
): Promise<UpdateUserType> => {
    try {
        await connectMongoDB();
        if (!name || !birthday) {
            return {
                message: "Please fill all the required fields to complete profile",
                status: 400,
            };
        }
        const session = await getServerSession(authOptions);
        if (!session?.user || !session?.user?.email) {
            return {
                message: "User doesn't exists, please try in new tab",
                status: 400,
            };
        }

        const foundUser = await User.findOne({ email: session?.user.email });
        if (!foundUser) {
            return { message: "User doesn't exists!", status: 500 };
        }

        const formattedBirthday = new Date(birthday);
        const userValues = {
            name,
            email: session?.user.email,
            image: session?.user.image,
            birthday: formattedBirthday,
        } as UpdateUserType
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            userValues.password = hashedPassword
        }
        await User.findByIdAndUpdate(foundUser._id, userValues)
        .then(() => console.log("New user Successfully"))
        .catch(err => console.log("User update Failed: ", err));

        return userValues;
    } catch (error) {
        console.log((error as Error).message);
        return { message: "Something went wrong, please try later", status: 500 };
    }
}

export default updateUser;