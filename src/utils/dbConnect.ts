import mongoose from "mongoose";
import config from "../config";
import GenericError from "../classes/errorClasses/GenericError";

const dbConnect = async (): Promise<void> => {
    try {
        if (!config.database_url) {
            throw new GenericError('Database url is not defined', 400);
        }
        await mongoose.connect(config.database_url as string);
        console.log('Database is connected');
    } catch (error: unknown | [message?: string] | string | undefined) {
        console.log(`Error connecting to database`);
    }
}

export { dbConnect };