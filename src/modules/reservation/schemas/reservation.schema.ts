import { ConflictException } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { ReservationSchema } from './ReservationSchema';

export const reservationSchema = SchemaFactory.createForClass(ReservationSchema);

/* DATE VALIDATION */
reservationSchema.pre('validate', function (next: NextFunction) {
    if (Number(this.from.substring(0, 2)) > Number(this.to.substring(0, 2)))
        throw new ConflictException('Scheduling error');
    const fromDate = new Date(`${this.date.toISOString().substring(0, 10)}T${this.from}:00`);
    const toDate = new Date(`${this.date.toISOString().substring(0, 10)}T${this.to}:00`);
    const currentDate = new Date();
    if (toDate < currentDate) return next(new ConflictException('Date error'));
    if (!_isTimeDifferenceOneHour(fromDate, toDate))
        return next(new ConflictException('The shift must be one hour'));
    else return next();
});

const _isTimeDifferenceOneHour = (from: any, to: any) => {
    const differenceInMilliseconds = Math.abs(to - from);
    const oneHourInMilliseconds = 60 * 60 * 1000;
    return differenceInMilliseconds === oneHourInMilliseconds;
};
