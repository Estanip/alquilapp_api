import { UnprocessableEntityException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Document, HydratedDocument, Types } from 'mongoose';
import { SHIFT_DURATION } from 'src/constants/reservations.constants';
import { CourtNumbers } from 'src/modules/court/interfaces';
import { Player } from 'src/modules/users/modules/player/schemas';
import { User } from 'src/modules/users/schemas';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ versionKey: false, timestamps: true })
export class Reservation extends Document {
  @Prop({
    type: String,
    required: [true, 'date field cannot be empty'],
  })
  date: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
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
    max: 6,
    required: [true, 'Court field cannot be empty'],
  })
  court: number;

  @Prop({ type: Number })
  total_price: number;

  @Prop([
    {
      type: Types.ObjectId,
      ref: Player.name,
      required: [true, 'Players field cannot be empty'],
    },
  ])
  players: Player[];
}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);

/* DATE VALIDATION */
ReservationSchema.pre('validate', function (next: NextFunction) {
  if (!_validateDate(this.date)) throw new UnprocessableEntityException('Wrong date');
  if (this.to)
    if (Number(this.from.substring(0, 2)) > Number(this.to.substring(0, 2)))
      throw new UnprocessableEntityException('Scheduling error');
  if (!_isTimeDifferenceOneHour(this.from, this.to))
    throw new UnprocessableEntityException('The shift must be one hour');
  else return next();
});

const _isTimeDifferenceOneHour = (from: string, to: string) =>
  parseInt(to.substring(0, 2)) - parseInt(from.substring(0, 2)) === SHIFT_DURATION.ONE_HOUR;

const _validateDate = (date: string) => {
  const currentDate = new Date().toISOString().substring(0, 10);
  const currentYear = currentDate.substring(0, 4);
  const currentMonth = currentDate.substring(5, 7);
  const currentDay = currentDate.substring(8, 10);

  const dateYear = date.substring(0, 4);
  const dateMonth = date.substring(5, 7);
  const dateDay = date.substring(8, 10);

  return dateYear >= currentYear && dateMonth >= currentMonth && dateDay >= currentDay;
};
