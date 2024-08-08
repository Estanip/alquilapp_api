import { IReservation, TReservationCollection } from 'src/modules/reservation/interfaces';
import { Reservation } from 'src/modules/reservation/schemas';

interface IByAvailability extends Pick<IReservation, 'from' | 'court' | 'date'> {}
export class AvailavilitiesResponseDto {
  static toResponse(data: TReservationCollection): IByAvailability[] {
    const availabitlies: IByAvailability[] = [];
    if (data?.length > 0) {
      data?.map((reservation: Reservation) => {
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
