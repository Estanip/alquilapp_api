import { SurfaceTypes } from '../../entities/court.entity';
import { ICourtDocument, TCourtCollection } from '../../interfaces/court.interfaces';

export class CourtResponseDto {
    readonly _id: string;
    readonly available_from: string;
    readonly available_until: string;
    readonly court_number: number;
    readonly surface_type: SurfaceTypes;
    readonly is_enabled: boolean;

    static toGetAllResponse(data: TCourtCollection): CourtResponseDto[] | [] {
        let courts: CourtResponseDto[] = [];
        if (data?.length > 0) {
            courts = data.map((court) => {
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

    static toGetOneResponse(data: Partial<ICourtDocument>): CourtResponseDto | null {
        let court: CourtResponseDto = null;
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
