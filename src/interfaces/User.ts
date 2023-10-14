import { Document, Types } from 'mongoose';
export interface IUser extends Document {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    identification_number: string;
    birth_date: Date;
    user_type: Types.ObjectId;
    member_status: string;
    comparePasswords(password: string): boolean;
    generateToken(user: IUser): string;
}

export type TUserLoginResponse = Pick<
    IUser,
    'email' | 'first_name' | 'last_name' | 'identification_number' | 'member_status'
>;

export type TUserEmail = Pick<IUser, 'email'>;
