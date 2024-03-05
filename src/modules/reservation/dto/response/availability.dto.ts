import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { TReservationCollection } from '../../interfaces/reservation.interfaces';

interface IByAvailability {
    readonly date: Date;
    readonly from: string;
    readonly court: CourtNumbers;
}

type TResponse = IByAvailability[];

export class AvailavilitiesResponseDto {
    static toResponse(data: TReservationCollection): TResponse {
        const availabitlies: TResponse = [];
        if (data?.length > 0) {
            data?.map((reservation) => {
                availabitlies.push({
                    date: reservation?.date,
                    from: reservation?.from,
                    court: reservation?.court,
                });
            });
        }
        return availabitlies;
    }
}
