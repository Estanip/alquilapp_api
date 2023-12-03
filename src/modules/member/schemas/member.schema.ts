import { Schema } from 'mongoose';
import { IMemberAttributes } from '../interfaces/member.interfaces';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';

export const MemberSchema: Schema = new Schema<IMemberAttributes>(
    {
        email: {
            type: String,
            lowercase: true,
            required: [true, 'Email field cannot be empty'],
            match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please insert a valid email format'],
            unique: true,
            index: true,
        },
        first_name: {
            type: String,
            required: [true, 'First Name field cannot be empty'],
        },
        last_name: {
            type: String,
            required: [true, 'Last Name field cannot be empty'],
        },
        identification_number: {
            type: String,
            required: [true, 'Identification number field cannot be empty'],
            minlength: [7, 'Idenfitication number must have at least 7 characters'],
            maxLength: [8, 'Idenfitication number cannot be longer than 8 characters'],
            unique: true,
        },
        birth_date: {
            type: Date,
            required: [true, 'Date of birth cannot be empty'],
        },
        phone_number: { type: String },
        membership_type: {
            type: String,
            enum: MembershipTypes,
            required: [true, 'Membership Type field cannot be empty'],
        },
        is_enabled: Boolean,
    },
    {
        collation: { locale: 'en', strength: 2 },
        timestamps: true,
        versionKey: false,
    },
);
