import { Document } from 'mongoose';
import { MembershipTypesSchema } from '../schemas/MembershipTypes';

export interface IMembershipType {
    type: string;
    description: string;
    is_enabled: boolean;
}

export interface IMembershipTypeDocument extends IMembershipType, Document {}

export type TMembershipTypeCollection = MembershipTypesSchema[];
