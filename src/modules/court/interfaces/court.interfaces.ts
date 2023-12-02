import { Document } from 'mongoose';
import { SurfaceTypes } from '../entities/court.entity';

export interface ICourtAttributes extends Document {
    readonly available_from: string;
    readonly available_until: string;
    readonly surface_type: SurfaceTypes;
    readonly court_number: number;
    readonly is_enabled: boolean;
}

export interface ICourt {
    availableFrom: string;
    availableUntil: string;
    surfaceType: SurfaceTypes;
    courtNumber: number;
    isEnabled: boolean;
}

export interface ICourtDocument extends ICourtAttributes {}

export type TCourtCollection = ICourtDocument[];
