import { TimeZones } from 'src/constants';
import { IPlayer } from 'src/modules/users/modules/player/interfaces';
import { IPlayerPopulate, IReservation, IReservationDocument } from '../../interfaces';
import { IReservationSchemaWithPlayerPopulate, ReservationSchema } from '../../schemas';

type TReservationData = Omit<ReservationSchema, 'players'> & {
    players: IPlayerPopulate[];
};

type TPlayerPopulateResponse = {
    first_name: string;
    last_name: string;
    membership_type: string;
};

type TPlayerResponse = {
    user_id: string;
    fee: number;
};

interface IByOwnerResponse extends Omit<IReservation, 'players'> {
    readonly _id: string;
    players: TPlayerPopulateResponse[];
}

interface IByOwnerAndDateResponse extends Omit<IReservation, 'players' | 'total_price'> {
    readonly _id: string;
    players: TPlayerResponse[];
}

type TResponse = {
    active: IByOwnerResponse[];
    inactive: IByOwnerResponse[];
};

const _isReservationExpired = (reservation: TReservationData) => {
    const currentDate = new Date().toLocaleString('en-US', { timeZone: TimeZones.ARG });
    const reservationDate = new Date(
        `${reservation.date.substring(0, 10)}T${reservation.from}:00`,
    ).toLocaleString('en-US');
    if (currentDate > reservationDate) return true;
    if (currentDate < reservationDate) return false;
};

export class ByOwnerResponseDto {
    static toResponse(data: IReservationSchemaWithPlayerPopulate[]): TResponse {
        let reservations: TResponse = { inactive: [], active: [] };
        if (data?.length > 0) {
            data?.map((reservation: TReservationData) => {
                if (_isReservationExpired(reservation))
                    reservations.inactive.push({
                        _id: reservation._id.toString(),
                        date: reservation?.date,
                        from: reservation?.from,
                        to: reservation?.to,
                        court: reservation?.court,
                        players: reservation?.players.map((player: IPlayerPopulate) => {
                            return {
                                first_name: player.user_id.first_name,
                                last_name: player.user_id.last_name,
                                membership_type: player.user_id.membership_type,
                            };
                        }),
                        owner_id: reservation.owner_id,
                        total_price: reservation.total_price,
                    });
                else if (!_isReservationExpired(reservation))
                    reservations.active.push({
                        _id: reservation._id.toString(),
                        date: reservation?.date,
                        from: reservation?.from,
                        to: reservation?.to,
                        players: reservation?.players.map((player: IPlayerPopulate) => {
                            return {
                                first_name: player.user_id.first_name,
                                last_name: player.user_id.last_name,
                                membership_type: player.user_id.membership_type,
                            };
                        }),
                        owner_id: reservation.owner_id,
                        total_price: reservation.total_price,
                        court: reservation?.court,
                    });
            });
        } else reservations = null;
        return reservations;
    }
}

export class ByOwnerAndDateResponseDto {
    static toResponse(data: IReservationDocument): IByOwnerAndDateResponse {
        const reservation: IByOwnerAndDateResponse = data
            ? {
                  _id: data._id.toString(),
                  date: data?.date,
                  from: data?.from,
                  to: data?.to,
                  court: data?.court,
                  players: data?.players.map((player: IPlayer) => {
                      return {
                          user_id: player.user_id.toString(),
                          fee: player.fee,
                      };
                  }),
                  owner_id: data.owner_id,
              }
            : null;

        return reservation;
    }
}
