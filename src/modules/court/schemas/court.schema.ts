import { Schema } from 'mongoose';
import { ICourtAttributes } from '../interfaces/court.interfaces';
import { SurfaceTypes } from '../entities/court.entity';

export const CourtSchema: Schema = new Schema<ICourtAttributes>(
    {
        surface_type: {
            type: String,
            enum: SurfaceTypes,
            required: true,
        },
        court_number: {
            type: Number,
            min: 1,
            max: 5,
            unique: true,
            required: true,
        },
        is_enabled: Boolean,
        available_from: String,
        available_until: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
