import { IPlayerPopulate } from '../../interfaces';
import { ReservationSchema } from '../../schemas';

type TReservationData = Omit<ReservationSchema, 'players'> & {
    players: IPlayerPopulate[];
};

type TPlayerPopulateResponse = {
    id: string;
    first_name: string;
    last_name: string;
    membership_type: string;
    fee: number;
};
interface IReservationResponse extends Omit<ReservationSchema, '_id' | 'owner_id' | 'players'> {
    _id: string;
    owner_id: string;
    players: TPlayerPopulateResponse[];
}

type TGetAllResponse = IReservationResponse[];
export class ReservationsResponseDto {
    static getAll(data: TReservationData[]): TGetAllResponse {
        const reservations: TGetAllResponse = [];
        if (data?.length > 0) {
            data?.map((reservation: TReservationData) =>
                reservations.push({
                    _id: reservation?._id?.toString(),
                    owner_id: reservation.owner_id.toString(),
                    date: reservation?.date,
                    from: reservation?.from,
                    court: reservation?.court,
                    total_price: reservation?.total_price,
                    players: reservation?.players.map((player: IPlayerPopulate) => {
                        return {
                            id: player.user._id,
                            first_name: player.user.first_name,
                            last_name: player.user.last_name,
                            membership_type: player.user.membership_type,
                            fee: player.fee,
                        };
                    }),
                }),
            );
        }
        return reservations;
    }

    static getOne(data: TReservationData): IReservationResponse | null {
        let reservation = null;
        if (Object.values(data).length) {
            reservation = {
                _id: data?._id?.toString(),
                owner_id: data.owner_id.toString(),
                date: data?.date,
                from: data?.from,
                court: data?.court,
                total_price: data?.total_price,
                players: data?.players.map((player: IPlayerPopulate) => {
                    return {
                        id: player.user._id,
                        first_name: player.user.first_name,
                        last_name: player.user.last_name,
                        membership_type: player.user.membership_type,
                        fee: player.fee,
                    };
                }),
            };
        }
        return reservation;
    }
}
