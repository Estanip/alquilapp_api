import { Error, Schema } from 'mongoose';
import { IMembershipType } from '../interfaces/membership_type.interfaces';
import { NextFunction } from 'express';
import { MembershipTypes } from '../entities/membership_type.entity';

export const MembershipTypeSchema: Schema = new Schema<IMembershipType>(
    {
        type: {
            type: String,
            required: true,
            unique: true,
            enum: MembershipTypes,
        },
        description: String,
        is_enabled: { type: Boolean, default: true },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

MembershipTypeSchema.post('save', function (error: any, doc: any, next: NextFunction): void {
    if (error.name === 'MongoServerError' && error.code === 11000)
        return next(new Error('Type must be unique'));
    else return next(error);
});
