import { Document, Types } from 'mongoose';

export interface IReservation extends Document {
    day: Date;
    from: string;
    to: string;
    court: Types.ObjectId;
    players: [Types.ObjectId];
    total_price: number;
}
