import { IPricingDocument } from '../interfaces/pricing.interfaces';
import { PricingSchema } from '../schemas/pricing.schema';
import { Model, model } from 'mongoose';

export const PricingModel: Model<IPricingDocument> = model<IPricingDocument>(
    'Pricing',
    PricingSchema,
    'pricings',
);
