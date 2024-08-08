import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/modules/users/schemas';

export type UserExpoPushTokenDocument = HydratedDocument<UserExpoPushToken>;
@Schema({ versionKey: false, timestamps: true })
export class UserExpoPushToken extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: [true, 'user field cannot be empty'],
  })
  user_id: Types.ObjectId;

  @Prop({ type: String })
  token: string;
}

export const UserExpoPushTokenSchema = SchemaFactory.createForClass(UserExpoPushToken);
