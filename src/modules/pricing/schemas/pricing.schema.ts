import { ConflictException } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { PricingSchema } from './PricingSchema';

export const pricingSchema = SchemaFactory.createForClass(PricingSchema);

/* DATE VALIDATION */
pricingSchema.pre('validate', function (next: NextFunction) {
    const validateUntilDate = new Date(`${this.validate_until.toISOString().substring(0, 10)}`);
    const currentDate = new Date();
    if (validateUntilDate < currentDate) return next(new ConflictException('Date error'));
    else return next();
});
