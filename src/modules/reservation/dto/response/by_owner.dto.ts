import {
    IReservation,
    IReservationDocument,
    TReservationCollection,
} from '../../interfaces/reservation.interfaces';

interface IByOwner extends Pick<IReservation, 'date' | 'from' | 'to' | 'court'> {
    readonly _id: string;
}

type TResponse = {
    active: IByOwner[];
    inactive: IByOwner[];
};

export class ByOwnerResponseDto {
    static toResponse(data: TReservationCollection): TResponse {
        let reservations: TResponse = { inactive: [], active: [] };
        if (data?.length > 0) {
            data?.map((reservation: IReservationDocument) => {
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
