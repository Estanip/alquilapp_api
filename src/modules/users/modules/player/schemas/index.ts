import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/modules/users/schemas';

export type PlayerDocument = HydratedDocument<Player>;

@Schema({ versionKey: false, timestamps: false, _id: false })
export class Player {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: [true, 'user field cannot be empty'],
  })
  user: Types.ObjectId;

  @Prop({ type: Number })
  fee?: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
