import { Document } from 'mongoose';

export interface IJWTPayload {
    _id: string;
}

export interface IUserVerificationCode {
    user: string;
    code: string;
}

export interface IUserCodeVerificationDocument extends IUserVerificationCode, Document {}
