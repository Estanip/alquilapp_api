import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserSchema } from 'src/modules/users/schemas';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';

@Schema({ versionKey: false, timestamps: false, _id: false })
export class PlayerSchema extends AbstractDocument {
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
