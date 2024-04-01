import { Document } from 'mongoose';

export enum SurfaceTypes {
    CLAY = 'Clay',
    HARD = 'Hard',
}

export enum CourtNumbers {
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _5 = 5,
}
export interface ICourt {
    available_from: string;
    available_until: string;
    surface_type: SurfaceTypes;
    court_number: number;
    is_enabled: boolean;
}

export interface ICourtDocument extends ICourt, Document {}

export type TCourtCollection = ICourtDocument[];
