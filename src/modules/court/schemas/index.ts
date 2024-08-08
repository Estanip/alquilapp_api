import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Document, HydratedDocument } from 'mongoose';
import { IMongooseError } from 'src/shared/interfaces';
import { SurfaceTypes } from '../interfaces';

export type CourtDocument = HydratedDocument<Court>;
@Schema({ versionKey: false, timestamps: true })
export class Court extends Document {
  @Prop({ type: String, enum: SurfaceTypes, required: true })
  surface_type: SurfaceTypes;

  @Prop({ type: Number, min: 1, max: 20, unique: true, required: true })
  court_number: number;

  @Prop({ type: String, required: true })
  available_from: string;

  @Prop({ type: String, required: true })
  available_until: string;

  @Prop({ type: Boolean, required: true, default: false })
  is_enabled: boolean;
}

export const CourtSchema = SchemaFactory.createForClass(Court);

// Validate court number be unique
CourtSchema.post('save', function (error: IMongooseError, _, next: NextFunction): void {
  if (error.name === 'MongoServerError' && error.code === 11000)
    throw new BadRequestException('Court must be unique');
  else return next(error);
});
