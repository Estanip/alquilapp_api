import { Schema } from 'mongoose';
import { ICourt } from '../interfaces/court.interfaces';
import { SurfaceTypes } from '../entities/court.entity';
import { NextFunction } from 'express';

export const CourtSchema: Schema = new Schema<ICourt>(
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

CourtSchema.post('save', function (error: any, doc: any, next: NextFunction): void {
    if (error.name === 'MongoServerError' && error.code === 11000)
        return next(new Error('Court number must be unique'));
    else return next(error);
});
