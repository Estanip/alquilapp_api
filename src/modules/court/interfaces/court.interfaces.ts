import { Document } from 'mongoose';
import { SurfaceTypes } from '../entities/court.entity';
import { CourtSchema } from '../schemas/CourtSchema';

export interface ICourt {
    available_from: string;
    available_until: string;
    surface_type: SurfaceTypes;
    court_number: number;
    is_enabled: boolean;
}

export interface ICourtDocument extends ICourt, Document {}

export type TCourtCollection = CourtSchema[];
