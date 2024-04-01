import { Document, Types } from 'mongoose';
import { CourtNumbers } from 'src/modules/court/interfaces';
import { IPlayer } from 'src/modules/users/modules/player/interfaces';

export interface IReservation {
    date: string;
    from: string;
    to?: string;
    court: CourtNumbers;
    players: IPlayer[];
    total_price: number;
    owner_id: Types.ObjectId;
}

export interface IPlayerPopulate {
    user: { _id: string; first_name: string; last_name: string; membership_type: string };
    fee: number;
}
export interface IReservationDocument extends IReservation, Document {}

export type TReservationCollection = IReservationDocument[];
