import { CourtNumbers } from 'src/modules/court/interfaces';
import { MembershipTypes } from 'src/modules/member/interfaces';
import { PricingDocument } from 'src/modules/pricing/schemas';

export enum CurrencyTypes {
  PESOS_ARG = 'ARS',
}
export interface IPricing {
  membership_type: MembershipTypes;
  court: CourtNumbers;
  price: number;
  validate_until: string;
  currency: CurrencyTypes.PESOS_ARG;
}

export type TPricingCollection = PricingDocument[];
