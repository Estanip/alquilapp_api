import { Types } from 'mongoose';
import { CourtNumbers } from 'src/modules/court/interfaces';
import { Reservation, ReservationDocument } from 'src/modules/reservation/schemas';
import { Player } from 'src/modules/users/modules/player/schemas';

export interface IReservation {
  _id?: string;
  date: string;
  from: string;
  to?: string;
  court: CourtNumbers;
  players: Player[];
  total_price: number;
  owner_id?: Types.ObjectId;
}
export interface IPlayerPopulate {
  user: { _id: string; first_name: string; last_name: string; membership_type: string };
  fee: number;
}
export interface IReservationSchemaWithPlayerPopulate extends Omit<Reservation, 'players'> {
  players: IPlayerPopulate[];
}

export type TReservationCollection = ReservationDocument[];
