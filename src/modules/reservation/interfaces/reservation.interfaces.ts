import { Document, Types } from 'mongoose';
import { Court } from 'src/modules/court/entities/court.entity';
import { Player } from '../entities/player.entity';

export interface IReservation {
    date: Date;
    from: string;
    to: string;
    court: Court;
    players: Player[];
    total_price: number;
}

export interface IReservationAttributes extends Document {
    _id: string;
    date: Date;
    from: string;
    to: string;
    court: Types.ObjectId;
    players: Player[];
    total_price: number;
}

export interface IReservationDocument extends IReservationAttributes {}

export type TReservationCollection = IReservationDocument[];
