import { Document } from 'mongoose';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { IPlayer } from './player.interfaces';

export interface IReservation {
    date: Date;
    from: string;
    to?: string;
    court: CourtNumbers;
    players: IPlayer[];
    total_price: number;
    owner_id: string;
}

export interface IReservationDocument extends IReservation, Document {}

export type TReservationCollection = IReservationDocument[];
