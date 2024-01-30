import { SchemaFactory } from '@nestjs/mongoose';
import { PlayerSchema } from './PlayerSchema';

export const playerSchema = SchemaFactory.createForClass(PlayerSchema);
