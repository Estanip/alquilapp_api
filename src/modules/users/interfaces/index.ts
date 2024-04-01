import { Document } from 'mongoose';
import { MembershipTypes } from 'src/modules/member/interfaces';

export interface IUser {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    identification_number: string;
    birth_date: string;
    membership_type: MembershipTypes;
    is_enabled: boolean;
    is_membership_validated: boolean;
    phone_number: string;
}

export interface IUserAttributes extends IUser {
    comparePasswords(password: string): boolean;
    generateToken(user: TUserTokenBody): string;
}

export interface IUserDocument extends IUserAttributes, Document {}

export type TUserCollection = IUserDocument[];

export type TUserTokenBody = Pick<
    IUserDocument,
    '_id' | 'email' | 'first_name' | 'last_name' | 'identification_number'
>;

export type TUserValidateResponse = Pick<
    IUserDocument,
    '_id' | 'email' | 'first_name' | 'last_name'
>;
