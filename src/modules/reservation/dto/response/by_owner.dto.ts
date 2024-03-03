import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { ReservationSchema } from '../../schemas/ReservationSchema';

interface IByOwner {
    readonly _id: string;
    readonly date: Date;
    readonly from: string;
    readonly to: string;
    readonly court: CourtNumbers;
}

type TResponse = {
    active: IByOwner[];
    inactive: IByOwner[];
};

export class ByOwnerResponseDto {
    static toResponse(data: ReservationSchema[]): TResponse {
        let reservations: TResponse = { inactive: [], active: [] };
        if (data?.length > 0) {
            data?.map((reservation) => {
                if (new Date(reservation.date) < new Date())
                    reservations.inactive.push({
                        _id: reservation._id.toString(),
                        date: reservation?.date,
                        from: reservation?.from,
                        to: reservation?.to,
                        court: reservation?.court,
                    });
                else if (new Date(reservation.date) >= new Date())
                    reservations.active.push({
                        _id: reservation._id.toString(),
                        date: reservation?.date,
                        from: reservation?.from,
                        to: reservation?.to,
                        court: reservation?.court,
                    });
            });
        } else reservations = null;
        return reservations;
    }
}
