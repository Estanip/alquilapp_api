import { Model, model } from 'mongoose';
import { IUserDocument } from '../interfaces/user.interface';
import { UserSchema } from '../schemas/user.schema';

export const UserModel: Model<IUserDocument> = model<IUserDocument>('User', UserSchema, 'users');
