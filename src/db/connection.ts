import mongoose from 'mongoose';
import { env } from '../../env';

export const connection = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(env.MONGO_URI);
    console.log('DB Succesfully Conected');
  } catch (error) {
    console.log(error);
  }
};
