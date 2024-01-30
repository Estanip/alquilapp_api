import { Document } from 'mongoose';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { Player } from '../entities/player.entity';
import { ReservationSchema } from '../schemas/ReservationSchema';

export interface IReservation {
    date: Date;
    from: string;
    to: string;
    court: CourtNumbers;
    players: Player[];
    total_price: number;
}

export interface IReservationDocument extends IReservation, Document {}

export type TReservationCollection = ReservationSchema[];
