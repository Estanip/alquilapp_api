import { Document } from 'mongoose';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';

export interface IMember {
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

export type TMemberCollection = IMemberDocument[];
