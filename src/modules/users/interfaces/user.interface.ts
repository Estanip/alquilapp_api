import { Document, Types } from 'mongoose';
import { MembershipTypes } from '../entities/user.entity';

export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    identificationNumber: string;
    birthDate: Date;
    membershipType: MembershipTypes;
    isEnabled: boolean;
}

export interface IUserAttributes extends Document {
    readonly _id: Types.ObjectId;
    readonly email: string;
    password: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly identification_number: string;
    readonly birth_date: Date;
    readonly membership_type: MembershipTypes;
    readonly is_enabled: boolean;

    comparePasswords(password: string): boolean;
    generateToken(user: TUserTokenBody): string;
}

export interface IUserDocument extends IUserAttributes {}

export type TUserCollection = IUserDocument[];

export type TUserLoginResponse = Pick<
    IUserAttributes,
    'email' | 'first_name' | 'last_name' | 'identification_number' | 'is_enabled'
>;

export type TUserTokenBody = Pick<
    IUserAttributes,
    '_id' | 'email' | 'first_name' | 'last_name' | 'identification_number'
>;

export type TUserValidateResponse = Pick<
    IUserAttributes,
    '_id' | 'email' | 'first_name' | 'last_name'
>;
