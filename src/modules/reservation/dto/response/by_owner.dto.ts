import { TimeZones } from 'src/constants';
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

const _isReservationExpired = (reservation: IReservation) => {
    const currentDate = new Date().toLocaleString('en-GB', {
        timeZone: TimeZones.ARG,
    });
    const reservationDate = new Date(
        `${reservation.date.substring(0, 10)}T${reservation.from}:00`,
    ).toLocaleString('en-GB', { timeZone: TimeZones.ARG });
    if (currentDate > reservationDate) return true;
    if (currentDate < reservationDate) return false;
};

export class ByOwnerResponseDto {
    static toResponse(data: TReservationCollection): TResponse {
        let reservations: TResponse = { inactive: [], active: [] };
        if (data?.length > 0) {
            data?.map((reservation: IReservationDocument) => {
                if (_isReservationExpired(reservation))
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
                else if (!_isReservationExpired(reservation))
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
