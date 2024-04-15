import { ConflictException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Types } from 'mongoose';
import { SHIFT_DURATION } from 'src/constants/reservations.constants';
import { CourtNumbers } from 'src/modules/court/interfaces';
import { PlayerSchema } from 'src/modules/users/modules/player/schemas';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { IPlayerPopulate } from '../interfaces';

@Schema({ versionKey: false, timestamps: true })
export class ReservationSchema extends AbstractDocument {
  @Prop({
    type: String,
    required: [true, 'date field cannot be empty'],
  })
  date: string;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'date field cannot be empty'],
  })
  owner_id: Types.ObjectId;

  @Prop({
    type: String,
    required: [true, 'From field cannot be empty'],
  })
  from: string;

  @Prop({
    type: String,
  })
  to?: string;

  @Prop({
    type: Number,
    enum: CourtNumbers,
    min: 0,
    max: 5,
    required: [true, 'Court field cannot be empty'],
  })
  court: number;

  @Prop({ type: Number })
  total_price: number;

  @Prop([
    {
      type: PlayerSchema,
      required: [true, 'Players field cannot be empty'],
    },
  ])
  players: PlayerSchema[];
}

export type TReservationSchemas = ReservationSchema[];
export interface IReservationSchemaWithPlayerPopulate extends Omit<ReservationSchema, 'players'> {
  players: IPlayerPopulate[];
}

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
