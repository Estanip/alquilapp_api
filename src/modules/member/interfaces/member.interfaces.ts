import { Document } from 'mongoose';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';
import { MemberSchema } from '../schemas/MemberSchema';

export interface IMember {
    user_id?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    identification_number: string;
    birth_date: Date;
    is_enabled: boolean;
    membership_type: MembershipTypes;
}

export interface IMemberDocument extends IMember, Document {}

export type TMemberCollection = MemberSchema[];
