import { Types } from 'mongoose';

export interface IPlayer {
    user_id: Types.ObjectId;
    fee?: number;
}
