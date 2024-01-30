import { SchemaFactory } from '@nestjs/mongoose';
import { MemberSchema } from './MemberSchema';

export const memberSchema = SchemaFactory.createForClass(MemberSchema);
