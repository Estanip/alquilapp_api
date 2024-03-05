import {
    IPricing,
    IPricingDocument,
    TPricingCollection,
} from '../../interfaces/pricing.interfaces';

export class PricingResponseDto {
    static getAll(data: TPricingCollection): IPricing[] {
        const pricings: IPricing[] = [];
        if (data?.length > 0) {
            data?.map((pricing: IPricing) =>
                pricings.push({
                    membership_type: pricing.membership_type,
                    court: pricing.court,
                    price: pricing.price,
                    validate_until: pricing.validate_until,
                    currency: pricing.currency,
                }),
            );
        }
        return pricings;
    }

    static getOne(data: IPricingDocument): IPricing | null {
        let pricing = null;
        if (Object.values(data).length) {
            pricing = {
                membership_type: data.membership_type,
                court: data.court,
                price: data.price,
                validate_until: data.validate_until,
                currency: data.currency,
            };
        }
        return pricing;
    }
}
