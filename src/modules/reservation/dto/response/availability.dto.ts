import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { ReservationSchema } from '../../schemas/ReservationSchema';

export class AvailavilitiesResponseDto {
    readonly date: Date;
    readonly from: string;
    readonly court: CourtNumbers;

    static toResponse(data: Partial<ReservationSchema[]>): AvailavilitiesResponseDto[] | [] {
        const availabitlies: AvailavilitiesResponseDto[] = [];
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
