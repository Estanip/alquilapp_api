import { Document } from 'mongoose';

export interface IMembershipTypeAttributes {
    type: string;
    description: string;
    is_enabled: boolean;
}

export interface IMembershipTypeDocument extends IMembershipTypeAttributes, Document {}

export type TMembershipTypeCollection = IMembershipTypeDocument[];
