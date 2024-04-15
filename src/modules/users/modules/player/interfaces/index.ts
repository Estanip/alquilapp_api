import { Types } from 'mongoose';

export interface IPlayer {
  user: Types.ObjectId;
  fee?: number;
}
