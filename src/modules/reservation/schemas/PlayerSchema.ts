import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';

@Schema({ versionKey: false, timestamps: false, _id: false })
export class PlayerSchema extends AbstractDocument {
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'user field cannot be empty'],
    })
    user: string;

    @Prop({ type: Number })
    fee: number;
}
