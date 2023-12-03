import { NotFoundException, ConflictException } from '@nestjs/common';
import { Schema } from 'mongoose';
import { IReservationAttributes, IReservationDocument } from '../interfaces/reservation.interfaces';
import { PLayerSchema } from './player.schema';
import { CourtModel } from 'src/modules/court/models/court.model';
import { NextFunction } from 'express';
import { UserModel } from 'src/modules/users/models/user.model';
import { IUserAttributes, IUserDocument } from 'src/modules/users/interfaces/user.interface';
import { ReservationModel } from '../models/reservation.model';
import { ICourtDocument } from 'src/modules/court/interfaces/court.interfaces';
import { PricingModel } from 'src/modules/pricing/models/pricing.model';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { IPlayerAttributes } from '../interfaces/player.interfaces';

export const ReservationSchema: Schema = new Schema<IReservationAttributes>(
    {
        date: {
            type: Date,
            required: [true, 'date field cannot be empty'],
        },
        from: {
            type: String,
            required: [true, 'From field cannot be empty'],
        },
        to: {
            type: String,
            required: [true, 'To field cannot be empty'],
        },
        court: {
            type: Number,
            enum: CourtNumbers,
            required: [true, 'Court field cannot be empty'],
        },
        players: [
            {
                type: PLayerSchema,
                unique: true,
                required: [true, 'Players field cannot be empty'],
            },
        ],
        total_price: Number,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

/* COURT VALIDATION */
ReservationSchema.pre('validate', function (next: NextFunction) {
    CourtModel.findOne({ court_number: this.court })
        .then((data: ICourtDocument) => {
            if (data) return next();
            else return next(new NotFoundException('Court does not exists'));
        })
        .catch((err: unknown) => console.log(err));
});

/* PLAYERS STATUS VALIDATION */
ReservationSchema.pre('validate', async function (next: NextFunction) {
    const playersIds = this.players.map((player: IPlayerAttributes) => {
        return player.user.toString();
    });
    if (
        playersIds.some((id: string, idx: string) => {
            return playersIds.indexOf(id) != idx;
        })
    )
        return next(new ConflictException('Repeated players'));

    const users: IUserDocument[] = [];
    for (const player of this.players) {
        users.push(await UserModel.findById(player.user));
    }

    if (users.some((user: IUserAttributes) => user === null))
        throw new NotFoundException('User does not exists');

    if (users.some((user: IUserAttributes) => !user.is_enabled))
        throw new NotFoundException('User has not yet been validated');

    if (users.some((user: IUserAttributes) => !user.is_membership_validated))
        throw new NotFoundException('User membership has not yet been validated');
    else return next();
});

/* AVAILABILITY VALIDATION */
ReservationSchema.pre('validate', function (next: NextFunction) {
    ReservationModel.findOne({ date: this.date, to: this.to, from: this.from, court: this.court })
        .then((data: IReservationDocument) => {
            if (!data) return next();
            else return next(new ConflictException('The court shift is taken'));
        })
        .catch((err: unknown) => console.log(err));
});

/* DATE VALIDATION */
ReservationSchema.pre('validate', function (next: NextFunction) {
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

/* PRICE CONVERTION */
ReservationSchema.pre('save', async function (next: NextFunction) {
    for (const player of this.players) {
        const user_membership = (await UserModel.findById(player.user))?.membership_type;
        if (!user_membership)
            return next(new NotFoundException('Error when try to get membershipt type of user'));
        const price = (
            await PricingModel.findOne({
                court: this.court,
                membership_type: user_membership,
            })
        )?.price;
        if (!price) return next(new NotFoundException('Error when try to get price associated'));
        else player.fee = price;
    }

    this.total_price = this.players.reduce((acc: number, cur: IPlayerAttributes) => {
        return acc + cur.fee;
    }, 0);
});

const _isTimeDifferenceOneHour = (from: any, to: any) => {
    const differenceInMilliseconds = Math.abs(to - from);
    const oneHourInMilliseconds = 60 * 60 * 1000;
    return differenceInMilliseconds === oneHourInMilliseconds;
};
