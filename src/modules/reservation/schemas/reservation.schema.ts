import { ConflictException } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { SHIFT_DURATION } from 'src/constants/reservations.constants';
import { ReservationSchema } from './ReservationSchema';

export const reservationSchema = SchemaFactory.createForClass(ReservationSchema);

/* DATE VALIDATION */
reservationSchema.pre('validate', function (next: NextFunction) {
    if (this.to)
        if (Number(this.from.substring(0, 2)) > Number(this.to.substring(0, 2)))
            throw new ConflictException('Scheduling error');
    const fromDate = new Date(`${this.date.toISOString().substring(0, 10)}T${this.from}:00`);
    // REVIEW
    const toDate = new Date(
        `${this.date.toISOString().substring(0, 10)}T${
            Number(this.from.substring(0, 2)) + SHIFT_DURATION.ONE_HOUR
        }:00`,
    );
    const currentDate = new Date();
    if (toDate < currentDate) return next(new ConflictException('Date error'));
    if (!_isTimeDifferenceOneHour(fromDate, toDate))
        return next(new ConflictException('The shift must be one hour'));
    else return next();
});

const _isTimeDifferenceOneHour = (from: Date, to: Date) => {
    const differenceInMilliseconds = Math.abs(to.getTime() - from.getTime());
    const oneHourInMilliseconds = 60 * 60 * 1000;
    return differenceInMilliseconds === oneHourInMilliseconds;
};
