import { NextFunction } from 'express';
import { Schema } from 'mongoose';
import { comparePasswords, encryptPassword } from '../../../shared/utils/bcrypt.service';
import { IUserAttributes } from '../interfaces/user.interface';

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
        membership_type: String,
        is_enabled: Boolean,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

UserSchema.pre<IUserAttributes>('save', async function (next: NextFunction) {
    if (!this.isModified('password')) return next();

    const encryptedPassword = encryptPassword(this.password);
    this.password = encryptedPassword;
});

UserSchema.methods.comparePasswords = function (password: string) {
    return comparePasswords(password, this.password);
};
