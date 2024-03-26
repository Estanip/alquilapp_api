import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CourtRepository } from 'src/modules/court/court.repository';
import { ICourtDocument } from 'src/modules/court/interfaces/court.interfaces';
import { IPricing, IPricingDocument } from '../interfaces/pricing.interfaces';
import { PricingRepository } from '../pricing.repository';

@Injectable()
export class PricingValidator {
    constructor(
        private readonly pricingRepository: PricingRepository,
        private readonly courtRepository: CourtRepository,
    ) {}
    async _validateExists(data: IPricing) {
        const pricing = (await this.pricingRepository.findOne({
            membership_type: data.membership_type,
            court: data.court,
        })) as IPricingDocument;
        if (pricing) throw new ConflictException('The pricing just exists');
    }

    async _validateCourtExists(court_number: number) {
        const court = (await this.courtRepository.findOne({
            court_number,
        })) as ICourtDocument;
        if (!court) throw new NotFoundException('Court does not exists');
    }
}
