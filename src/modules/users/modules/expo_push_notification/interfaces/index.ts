import { Types } from 'mongoose';

export interface IUserExpoPushToken {
  user_id: Types.ObjectId;
  token: string;
}
