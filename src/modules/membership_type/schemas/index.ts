import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Document, HydratedDocument } from 'mongoose';
import { IMongooseError } from 'src/shared/interfaces';

export type MembershipTypesDocument = HydratedDocument<MembershipTypes>;

@Schema({ versionKey: false, timestamps: true })
export class MembershipTypes extends Document {
  @Prop({ type: String, required: true, unique: true })
  type: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Boolean, default: true })
  is_enabled: boolean;
}

export const MembershipTypesSchema = SchemaFactory.createForClass(MembershipTypes);

// Validate type be unique
MembershipTypesSchema.post('save', function (error: IMongooseError, _, next: NextFunction): void {
  if (error.name === 'MongoServerError' && error.code === 11000)
    throw new BadRequestException('Type must be unique');
  else return next(error);
});
