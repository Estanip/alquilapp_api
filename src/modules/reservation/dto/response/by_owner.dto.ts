import { TimeZones } from 'src/constants';
import { PlayerDocument } from 'src/modules/users/modules/player/schemas';
import {
  IPlayerPopulate,
  IReservation,
  IReservationSchemaWithPlayerPopulate,
} from '../../interfaces';
import { Reservation, ReservationDocument } from '../../schemas';

type TReservationData = Omit<Reservation, 'players'> & {
  players: IPlayerPopulate[];
};

type TPlayerPopulateResponse = {
  id: string;
  first_name: string;
  last_name: string;
  membership_type: string;
  fee: number;
};

type TPlayerResponse = {
  user: string;
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
                id: player.user._id.toString(),
                first_name: player.user.first_name,
                last_name: player.user.last_name,
                membership_type: player.user.membership_type,
                fee: player.fee,
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
                id: player.user._id,
                first_name: player.user.first_name,
                last_name: player.user.last_name,
                membership_type: player.user.membership_type,
                fee: player.fee,
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
  static toResponse(data: ReservationDocument): IByOwnerAndDateResponse {
    const reservation: IByOwnerAndDateResponse = data
      ? {
          _id: data._id.toString(),
          date: data?.date,
          from: data?.from,
          to: data?.to,
          court: data?.court,
          players: data?.players.map((player: PlayerDocument) => {
            return {
              user: player.user.toString(),
              fee: player.fee,
            };
          }),
          owner_id: data.owner_id,
        }
      : null;

    return reservation;
  }
}
