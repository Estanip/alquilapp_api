import { ConflictException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { CourtNumbers } from 'src/modules/court/interfaces';
import { MembershipTypes } from 'src/modules/member/interfaces';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { CurrencyTypes } from '../interfaces';

@Schema({ versionKey: false, timestamps: true })
export class PricingSchema extends AbstractDocument {
    @Prop({
        type: String,
        enum: MembershipTypes,
        required: [true, 'Membership Type field cannot be empty'],
    })
    membership_type: MembershipTypes;

    @Prop({ type: Number, enum: CourtNumbers, required: [true, 'Court field cannot be empty'] })
    court: CourtNumbers;

    @Prop({ type: String, default: CurrencyTypes.PESOS_ARG })
    currency: CurrencyTypes.PESOS_ARG;

    @Prop({ type: Number, min: 0, required: true })
    price: number;

    @Prop({ type: String, required: true })
    validate_until: string;
}

export const pricingSchema = SchemaFactory.createForClass(PricingSchema);

/* DATE VALIDATION */
pricingSchema.pre('validate', function (next: NextFunction) {
    const validateUntilDate = new Date(`${this.validate_until.substring(0, 10)}`);
    const currentDate = new Date();
    if (validateUntilDate < currentDate) return next(new ConflictException('Date error'));
    else return next();
});
