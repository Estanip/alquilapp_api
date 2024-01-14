import { ICourt } from '../interfaces/court.interfaces';

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
export class Court implements ICourt {
    private _available_from: string;
    private _available_until: string;
    private _surface_type: SurfaceTypes;
    private _court_number: number;
    private _is_enabled: boolean;

    get available_from(): string {
        return this._available_from;
    }

    get available_until(): string {
        return this._available_until;
    }

    get surface_type(): SurfaceTypes {
        return this._surface_type;
    }

    get court_number(): number {
        return this._court_number;
    }

    get is_enabled(): boolean {
        return this._is_enabled;
    }
}
