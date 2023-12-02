import { Types } from 'mongoose';

export interface ILoginResponse {
    id: Types.ObjectId;
    email: string;
    first_name: string;
    last_name: string;
    identification_number: string;
    token: string;
}

export interface IJWTPayload {
    _id: string;
}
