import { Document } from 'mongoose';
import { CourtNumbers } from 'src/modules/court/interfaces/court.interfaces';
import { IPlayer } from './player.interfaces';

export interface IReservation {
    date: string;
    from: string;
    to?: string;
    court: CourtNumbers;
    players: IPlayer[];
    total_price: number;
    owner_id: string;
}

export interface IReservationDocument extends IReservation, Document {}

export type TReservationCollection = IReservationDocument[];
