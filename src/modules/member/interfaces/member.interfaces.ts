import { Document } from 'mongoose';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';

export interface IMemberAttributes extends Document {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly phone_number: string;
    readonly identification_number: string;
    readonly birth_date: Date;
    readonly is_enabled: boolean;
    readonly membership_type: MembershipTypes;
}

export interface IMember {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    identificationNumber: string;
    membershipType: MembershipTypes;
    birthDate: Date;
    isEnabled: boolean;
}

export interface IMemberDocument extends IMemberAttributes {}

export type TMemberCollection = IMemberDocument[];
