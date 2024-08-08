import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/modules/users/schemas';

export type UserVerificationCodeDocumemt = HydratedDocument<UserVerificationCode>;

@Schema({ versionKey: false, timestamps: true })
export class UserVerificationCode extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  user_id: User;

  @Prop({
    type: String,
  })
  code: string;
}

export const UserVerificationCodeSchema = SchemaFactory.createForClass(UserVerificationCode);
