import { CourtDocument } from 'src/modules/court/schemas';
import { ICourt, TCourtCollection } from '../../interfaces';

interface ICourtResponse extends Omit<ICourt, '_id'> {
  _id: string;
}
export class CourtResponseDto {
  static getAll(data: TCourtCollection): ICourtResponse[] {
    let courts: ICourtResponse[] = [];
    if (data?.length > 0) {
      courts = data.map((court: CourtDocument) => {
        return {
          _id: court?._id?.toString(),
          is_enabled: court?.is_enabled,
          available_from: court?.available_from,
          available_until: court?.available_until,
          court_number: court?.court_number,
          surface_type: court?.surface_type,
        };
      });
    }
    return courts;
  }

  static getOne(data: CourtDocument): ICourtResponse {
    let court = null;
    if (Object.values(data).length) {
      court = {
        _id: data?._id?.toString(),
        is_enabled: data?.is_enabled,
        available_from: data?.available_from,
        available_until: data?.available_until,
        court_number: data?.court_number,
        surface_type: data?.surface_type,
      };
    }
    return court;
  }
}
