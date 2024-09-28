import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
    throw new Error("please add MONGODB_URI TO .env file");
}

const MONGODB_URI = process.env.MONGODB_URI;

async function connectMongoDB() {
    const options = {
        bufferCommands: false,
    };
    const mongoPromise = mongoose
        .connect(MONGODB_URI, options)
        .then((mongoose) => {
            console.log('DB connected successfully..')
            return mongoose;
        })
        .catch((error) => {
            console.log('Error while connecting to the DB: ', error)
        });

    const connection = await mongoPromise;
    return connection;
}

export default connectMongoDB;
