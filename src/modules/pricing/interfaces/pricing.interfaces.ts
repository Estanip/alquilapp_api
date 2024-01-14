import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';
import { CurrencyTypes } from '../entities/pricing.entity';
import { Document } from 'mongoose';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';

export interface IPricing {
    membership_type: MembershipTypes;
    court: CourtNumbers;
    price: number;
    validate_until: Date;
    currency: CurrencyTypes.PESOS_ARG;
}

export interface IPricingDocument extends IPricing, Document {}

export type TPricingCollection = IPricingDocument[];
