import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserSchema } from 'src/modules/users/schemas';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { IUserExpoPushToken } from '../interfaces';

@Schema({ versionKey: false, timestamps: true })
export class UserExpoPushTokenSchema extends AbstractDocument implements IUserExpoPushToken {
  @Prop({
    type: Types.ObjectId,
    ref: UserSchema.name,
    required: [true, 'user field cannot be empty'],
  })
  user_id: Types.ObjectId;

  @Prop({ type: String })
  token: string;
}

export const userExpoPushTokenSchema = SchemaFactory.createForClass(UserExpoPushTokenSchema);
