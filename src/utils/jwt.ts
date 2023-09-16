import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/User';
import { env } from '../../env';

export const generateToken = (user: IUser) => {
  try {
    return jwt.sign({ user }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRE });
  } catch (error) {
    throw new Error(error);
  }
};
