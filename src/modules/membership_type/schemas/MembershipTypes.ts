import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { MembershipTypes } from '../entities/membership_type.entity';

@Schema({ versionKey: false, timestamps: true })
export class MembershipTypesSchema extends AbstractDocument {
    @Prop({ type: String, required: true, unique: true, enum: MembershipTypes })
    type: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Boolean, default: true })
    is_enabled: boolean;
}
