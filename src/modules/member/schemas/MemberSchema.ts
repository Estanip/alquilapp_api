import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { IMember, MembershipTypes } from '../interfaces/member.interfaces';

@Schema({ versionKey: false, timestamps: true, collation: { locale: 'en', strength: 2 } })
export class MemberSchema extends AbstractDocument implements IMember {
    @Prop({ type: String })
    user_id: string;

    @Prop({
        type: String,
        lowercase: true,
        required: [true, 'Email field cannot be empty'],
        match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please insert a valid email format'],
        unique: true,
        index: true,
    })
    email: string;

    @Prop({
        type: String,
        required: [true, 'First Name field cannot be empty'],
    })
    first_name: string;

    @Prop({
        type: String,
        required: [true, 'Last Name field cannot be empty'],
    })
    last_name: string;

    @Prop({ type: String })
    phone_number: string;

    @Prop({
        type: String,
        required: [true, 'Identification number field cannot be empty'],
        minlength: [7, 'Idenfitication number must have at least 7 characters'],
        maxLength: [8, 'Idenfitication number cannot be longer than 8 characters'],
        unique: true,
    })
    identification_number: string;

    @Prop({
        type: Date,
        required: [true, 'Date of birth cannot be empty'],
    })
    birth_date: Date;

    @Prop({
        type: String,
        enum: MembershipTypes,
        required: [true, 'Membership Type field cannot be empty'],
    })
    membership_type: MembershipTypes;

    @Prop({ type: Boolean, default: false })
    is_enabled: boolean;
}
