import { IReservation, TReservationCollection } from '../../interfaces/reservation.interfaces';

interface IByAvailability extends Pick<IReservation, 'from' | 'court' | 'date'> {}
export class AvailavilitiesResponseDto {
    static toResponse(data: TReservationCollection): IByAvailability[] {
        const availabitlies: IByAvailability[] = [];
        if (data?.length > 0) {
            data?.map((reservation: IReservation) => {
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
