import { NextFunction } from 'express';
import { IUser } from '../interfaces/User';
import { Schema, model } from 'mongoose';
import { comparePasswords, encryptPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import UserType from './UserType';

const UserSchema: Schema = new Schema(
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
            minlength: [8, 'Please use minimum of 8 characters'],
            //select: false,
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
        user_type: {
            type: Schema.Types.ObjectId,
            ref: 'UserType',
        },
        member_status: {
            type: String,
            enum: ['Pendiente', 'Verificado'],
            default: 'Pendiente',
        },
    },
    {
        timestamps: true,
    },
);

UserSchema.pre<IUser>('save', async function (next: NextFunction) {
    if (!this.isModified('password')) return next();

    const encryptedPassword = encryptPassword(this.password);
    this.password = encryptedPassword;

    const unknownUserTypeId = await UserType.findOne({
        name: 'Desconocido',
    }).exec();
    this.user_type = unknownUserTypeId ? unknownUserTypeId?._id : null;
});

UserSchema.methods.comparePasswords = function (password: string) {
    return comparePasswords(password, this.password);
};

UserSchema.methods.generateToken = function (user: IUser) {
    return generateToken(user);
};

export default model<IUser>('User', UserSchema);
