import { Schema } from 'mongoose';
import { IPricing, IPricingDocument } from '../interfaces/pricing.interfaces';
import { NextFunction } from 'express';
import { CurrencyTypes } from '../entities/pricing.entity';
import { PricingModel } from '../models/pricing.model';
import { ConflictException } from '@nestjs/common';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';

export const PricingSchema: Schema = new Schema<IPricing>(
    {
        membership_type: {
            type: String,
            enum: MembershipTypes,
            required: [true, 'Membership Type field cannot be empty'],
        },
        court: {
            type: Number,
            enum: CourtNumbers,
            required: [true, 'Court field cannot be empty'],
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        validate_until: {
            type: Date,
            required: true,
        },
        currency: {
            type: String,
            default: CurrencyTypes.PESOS_ARG,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

PricingSchema.pre('validate', function (next: NextFunction) {
    PricingModel.findOne({ membership_type: this.membership_type, court: this.court })
        .then((data: IPricingDocument) => {
            if (!data) return next();
            else return next(new ConflictException('The pricing just exists'));
        })
        .catch((err: unknown) => console.log(err));
});
