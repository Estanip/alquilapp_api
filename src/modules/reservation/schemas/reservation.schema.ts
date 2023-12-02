import { NotFoundException } from '@nestjs/common';
import { Schema } from 'mongoose';
import { IReservationAttributes, IReservationDocument } from '../interfaces/reservation.interfaces';
import { PLayerSchema } from './player.schema';
import { CourtModel } from 'src/modules/court/models/court.model';
import { NextFunction } from 'express';
import { UserModel } from 'src/modules/users/models/user.model';
import { IUserDocument } from 'src/modules/users/interfaces/user.interface';
import { ReservationModel } from '../models/reservation.model';

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
            type: Schema.Types.ObjectId,
            ref: 'Court',
            required: [true, 'Court field cannot be empty'],
        },
        players: [
            {
                type: PLayerSchema,
                required: [true, 'Players field cannot be empty'],
            },
        ],
        total_price: {
            type: Number,
            required: [true, 'Total price field cannot be empty'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

ReservationSchema.pre('validate', function (next: NextFunction) {
    CourtModel.findById(this.court, function (err: unknown, data: IReservationDocument) {
        if (data) return next();
        else return next(new NotFoundException('Court does not exists'));
    });
});

ReservationSchema.pre('validate', async function (next: NextFunction) {
    const users: IUserDocument[] = [];
    for (const player of this.players) {
        users.push(await UserModel.findById(player.user));
    }

    if (users.some((user) => user === null))
        return next(new NotFoundException('User does not exists'));
    else return next();
});

ReservationSchema.pre('validate', function (next: NextFunction) {
    ReservationModel.findOne(
        { date: this.date, to: this.to, from: this.from, court: this.court },
        function (err: unknown, data: IReservationDocument) {
            if (!data) return next();
            else return next(new NotFoundException('The court shift is taken'));
        },
    );
});
