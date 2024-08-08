import { Types } from 'mongoose';
import { MemberDocument } from 'src/modules/member/schemas';

export enum MembershipTypes {
  SOCIO = 'SOCIO',
  NO_SOCIO = 'NO SOCIO',
  ABONADO = 'ABONADO',
}

export interface IMember {
  user_id?: Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  identification_number: string;
  birth_date: string;
  is_enabled: boolean;
  membership_type: MembershipTypes;
}

export type TMemberCollection = MemberDocument[];
