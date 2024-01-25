import { NextFunction } from 'express';
import { Schema } from 'mongoose';
import { comparePasswords, encryptPassword } from '../../../shared/utils/bcrypt.service';
import { IUserAttributes, IUserDocument } from '../interfaces/user.interface';
import { MemberModel } from 'src/modules/member/models/member.model';
import { IMemberDocument } from 'src/modules/member/interfaces/member.interfaces';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';

export const UserSchema: Schema = new Schema<IUserAttributes>(
    {
        email: {
            type: String,
            lowercase: true,
            required: [true, 'Email field cannot be empty'],
            match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please insert a valid email format'],
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, 'Password field cannot be empty'],
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                'Please insert a valid password format (1 letter, 1 number & 1 upperCase)',
            ],
            minlength: [8, 'Please use minimum of 8 characters'],
        },
        first_name: {
            type: String,
            required: [true, 'First Name field cannot be empty'],
        },
        last_name: {
            type: String,
            required: [true, 'Last Name field cannot be empty'],
        },
        phone_number: { type: String },
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
        membership_type: {
            type: String,
            enum: MembershipTypes,
            required: [true, 'Membership Type field cannot be empty'],
        },
        is_membership_validated: {
            type: Boolean,
            default: false,
        },
        is_enabled: Boolean,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

UserSchema.pre<IUserDocument>('save', async function (next: NextFunction) {
    if (!this.isModified('password')) return next();

    const encryptedPassword = encryptPassword(this.password);
    this.password = encryptedPassword;
});

UserSchema.pre('save', function (next: NextFunction) {
    MemberModel.findOne({ identification_number: this.identification_number })
        .then((data: IMemberDocument) => {
            if (data) {
                if (data.membership_type === this.membership_type)
                    this.is_membership_validated = true;
            }
            return next();
        })
        .catch((err: unknown) => console.log(err));
});

UserSchema.methods.comparePasswords = function (password: string) {
    return comparePasswords(password, this.password);
};

UserSchema.index({ email: 1 }, { unique: true });
