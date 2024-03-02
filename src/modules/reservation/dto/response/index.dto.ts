import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { PlayerSchema } from '../../schemas/PlayerSchema';
import { ReservationSchema } from '../../schemas/ReservationSchema';

export class ReservationsResponseDto {
    readonly _id: string;
    readonly date: Date;
    readonly from: string;
    readonly court: CourtNumbers;
    total_price: number;
    readonly players: PlayerSchema[];

    static getAll(data: ReservationSchema[]): ReservationsResponseDto[] | [] {
        const availabitlies: ReservationsResponseDto[] = [];
        if (data?.length > 0) {
            data?.map((reservation) =>
                availabitlies.push({
                    _id: reservation?._id?.toString(),
                    date: reservation?.date,
                    from: reservation?.from,
                    court: reservation?.court,
                    total_price: reservation?.total_price,
                    players: reservation?.players,
                }),
            );
        }
        return availabitlies;
    }

    static getOne(data: ReservationSchema): ReservationsResponseDto | null {
        let availabitlies: ReservationsResponseDto = null;
        if (Object.values(data).length) {
            availabitlies = {
                _id: data?._id?.toString(),
                date: data?.date,
                from: data?.from,
                court: data?.court,
                total_price: data?.total_price,
                players: data?.players,
            };
        }
        return availabitlies;
    }
}
