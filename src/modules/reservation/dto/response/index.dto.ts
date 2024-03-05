import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import {
    IReservationDocument,
    TReservationCollection,
} from '../../interfaces/reservation.interfaces';
import { PlayerSchema } from '../../schemas/PlayerSchema';

interface IReservation {
    readonly _id: string;
    readonly owner_id: string;
    readonly date: Date;
    readonly from: string;
    readonly court: CourtNumbers;
    total_price: number;
    readonly players: PlayerSchema[];
}

type TResponse = IReservation[];
export class ReservationsResponseDto {
    static getAll(data: TReservationCollection): TResponse {
        const reservations: TResponse = [];
        if (data?.length > 0) {
            data?.map((reservation) =>
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

    static getOne(data: IReservationDocument): IReservation | null {
        let reservation: IReservation = null;
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
