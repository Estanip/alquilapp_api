import { Document } from 'mongoose';
import { CourtNumbers } from 'src/modules/court/interfaces/court.interfaces';
import { MembershipTypes } from 'src/modules/member/interfaces/member.interfaces';

export enum CurrencyTypes {
    PESOS_ARG = 'ARS',
}
export interface IPricing {
    membership_type: MembershipTypes;
    court: CourtNumbers;
    price: number;
    validate_until: Date;
    currency: CurrencyTypes.PESOS_ARG;
}

export interface IPricingDocument extends IPricing, Document {}

export type TPricingCollection = IPricingDocument[];
