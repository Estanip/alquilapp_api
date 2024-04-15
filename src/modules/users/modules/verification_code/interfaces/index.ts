import { Types } from 'mongoose';

export interface IUserVerificationCode {
  user_id: Types.ObjectId;
  code: string;
}

export interface IUserCodeVerificationDocument extends IUserVerificationCode, Document {}
