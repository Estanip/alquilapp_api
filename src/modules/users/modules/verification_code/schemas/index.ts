import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { IUserVerificationCode } from '../interfaces';

@Schema({ versionKey: false, timestamps: true })
export class UserVerificationCodeSchema extends AbstractDocument implements IUserVerificationCode {
    @Prop({
        type: Types.ObjectId,
    })
    user_id: Types.ObjectId;

    @Prop({
        type: String,
    })
    code: string;
}

export const userVerificationCodeSchema = SchemaFactory.createForClass(UserVerificationCodeSchema);
