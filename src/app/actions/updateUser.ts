'use server';

import connectMongoDB from "@/utils/mongoLib/connectMongoDB";
import User from "@/utils/mongoLib/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/nextAuth/authOptions";
import bcrypt from "bcryptjs";

const updateUser = async (
    name: string,
    birthday: Date,
    password: string | undefined,
) => {
    try {
        await connectMongoDB();
        if (!name || !birthday) {
            return {
                message: "Please fill all the required fields to complete profile",
                status: 400,
            };
        }
        const { user } = await getServerSession(authOptions);
        const session = await getServerSession(authOptions);
        if (!user || !user?.email) {
            return {
                message: "User doesn't exists, please try in new tab",
                status: 400,
            };
        }

        const foundUser = await User.findOne({ email: user.email });
        if (!foundUser) {
            return { message: "User doesn't exists!", status: 500 };
        }

        const formattedBirthday = new Date(birthday);
        const userValues = {
            name,
            email: user.email,
            birthday: formattedBirthday,
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            userValues.password = hashedPassword
        }
        await User.findByIdAndUpdate(foundUser._id, userValues)
        .then(res => console.log("New user Successfully"))
        .catch(err => console.log("User update Failed: ", err));

        return userValues;
    } catch (error) {
        console.log((error as Error).message);
        return { message: "Something went wrong, please try later", status: 500 };
    }
}

export default updateUser;