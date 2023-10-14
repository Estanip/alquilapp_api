import mongoose from 'mongoose';
import { env } from '../../env';
import Logger from '../utils/logger';

export const connection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(env.MONGO_URI);
        Logger.info('DB Succesfully Conected');
    } catch (error) {
        Logger.error('DB Succesfully Conected');
    }
};
