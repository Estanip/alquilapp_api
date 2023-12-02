import { Model, model } from 'mongoose';
import { IReservationDocument } from '../interfaces/reservation.interfaces';
import { ReservationSchema } from '../schemas/reservation.schema';

export const ReservationModel: Model<IReservationDocument> = model<IReservationDocument>(
    'Reservation',
    ReservationSchema,
    'reservations',
);
