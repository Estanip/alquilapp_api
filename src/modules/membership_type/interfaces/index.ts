import { Document } from 'mongoose';

export interface IMembershipType {
  type: string;
  description: string;
  is_enabled: boolean;
}

export interface IMembershipTypeDocument extends IMembershipType, Document {}

export type TMembershipTypeCollection = IMembershipTypeDocument[];
