import { IReservation } from '../../interfaces';
import { ReservationSchema, TReservationSchemas } from '../../schemas';

interface IByAvailability extends Pick<IReservation, 'from' | 'court' | 'date'> {}
export class AvailavilitiesResponseDto {
    static toResponse(data: TReservationSchemas): IByAvailability[] {
        const availabitlies: IByAvailability[] = [];
        if (data?.length > 0) {
            data?.map((reservation: ReservationSchema) => {
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
