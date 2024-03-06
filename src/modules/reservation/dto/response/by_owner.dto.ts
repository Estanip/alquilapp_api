import {
    IReservation,
    IReservationDocument,
    TReservationCollection,
} from '../../interfaces/reservation.interfaces';

interface IByOwner extends IReservation {
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
                        players: reservation.players,
                        owner_id: reservation.owner_id,
                        total_price: reservation.total_price,
                    });
                else if (new Date(reservation.date) >= new Date())
                    reservations.active.push({
                        _id: reservation._id.toString(),
                        date: reservation?.date,
                        from: reservation?.from,
                        to: reservation?.to,
                        players: reservation.players,
                        owner_id: reservation.owner_id,
                        total_price: reservation.total_price,
                        court: reservation?.court,
                    });
            });
        } else reservations = null;
        return reservations;
    }
}
