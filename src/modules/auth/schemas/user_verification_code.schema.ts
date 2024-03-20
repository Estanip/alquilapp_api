import { SchemaFactory } from '@nestjs/mongoose';
import { UserVerificationCodeSchema } from './UserVerificationCode';

export const userVerificationCodeSchema = SchemaFactory.createForClass(UserVerificationCodeSchema);
