import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserSchema } from 'src/modules/users/schemas';

@Schema({ versionKey: false, timestamps: false, _id: false })
export class PlayerSchema {
  @Prop({
    type: Types.ObjectId,
    ref: UserSchema.name,
    required: [true, 'user field cannot be empty'],
  })
  user: Types.ObjectId;

  @Prop({ type: Number })
  fee?: number;
}

export const playerSchema = SchemaFactory.createForClass(PlayerSchema);
