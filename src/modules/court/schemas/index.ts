import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { IMongooseError } from 'src/shared/interfaces';
import { ICourt, SurfaceTypes } from '../interfaces';
@Schema({ versionKey: false, timestamps: true })
export class CourtSchema extends AbstractDocument implements ICourt {
  @Prop({ type: String, enum: SurfaceTypes, required: true })
  surface_type: SurfaceTypes;

  @Prop({ type: Number, min: 1, max: 20, unique: true, required: true })
  court_number: number;

  @Prop({ type: String })
  available_from: string;

  @Prop({ type: String })
  available_until: string;

  @Prop({ type: Boolean })
  is_enabled: boolean;
}

export const courtSchema = SchemaFactory.createForClass(CourtSchema);

// Validate court number be unique
courtSchema.post('save', function (error: IMongooseError, doc: Document, next: NextFunction): void {
  if (error.name === 'MongoServerError' && error.code === 11000)
    throw new BadRequestException('Court must be unique');
  else return next(error);
});
