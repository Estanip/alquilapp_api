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
    if (!_isTimeDifferenceOneHour(this.from, this.to))
        return next(new ConflictException('The shift must be one hour'));
    else return next();
});

const _isTimeDifferenceOneHour = (from: string, to: string) =>
    parseInt(to.substring(0, 2)) - parseInt(from.substring(0, 2)) === SHIFT_DURATION.ONE_HOUR;
