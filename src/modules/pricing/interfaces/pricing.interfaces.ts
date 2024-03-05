import { Document } from 'mongoose';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';

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
