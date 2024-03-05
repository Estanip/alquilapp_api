import {
    IReservationDocument,
    TReservationCollection,
} from '../../interfaces/reservation.interfaces';
import { ReservationSchema } from '../../schemas/ReservationSchema';

interface IReservationResponse extends Omit<ReservationSchema, '_id'> {
    _id: string;
}

type TResponse = ReservationSchema[];
export class ReservationsResponseDto {
    static getAll(data: TReservationCollection): TResponse {
        const reservations: TResponse = [];
        if (data?.length > 0) {
            data?.map((reservation: IReservationDocument) =>
                reservations.push({
                    _id: reservation?._id?.toString(),
                    owner_id: reservation.owner_id,
                    date: reservation?.date,
                    from: reservation?.from,
                    court: reservation?.court,
                    total_price: reservation?.total_price,
                    players: reservation?.players,
                }),
            );
        }
        return reservations;
    }

    static getOne(data: IReservationDocument): IReservationResponse | null {
        let reservation = null;
        if (Object.values(data).length) {
            reservation = {
                _id: data?._id?.toString(),
                owner_id: data.owner_id,
                date: data?.date,
                from: data?.from,
                court: data?.court,
                total_price: data?.total_price,
                players: data?.players,
            };
        }
        return reservation;
    }
}
