import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { IUserVerificationCode } from '../interfaces/auth.interfaces';

@Schema({ versionKey: false, timestamps: true })
export class UserVerificationCodeSchema extends AbstractDocument implements IUserVerificationCode {
    @Prop({
        type: String,
    })
    user: string;

    @Prop({
        type: String,
    })
    code: string;
}
