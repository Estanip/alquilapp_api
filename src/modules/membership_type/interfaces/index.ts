import { MembershipTypesDocument } from 'src/modules/membership_type/schemas';

export interface IMembershipType {
  type: string;
  description: string;
  is_enabled: boolean;
}

export type TMembershipTypeCollection = MembershipTypesDocument[];
