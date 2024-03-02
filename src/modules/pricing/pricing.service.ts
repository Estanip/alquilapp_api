import {
    ConflictException,
    HttpStatus,
    Injectable,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CourtRepository } from '../court/court.repository';
import { ICourtDocument } from '../court/interfaces/court.interfaces';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdateDto, UpdateValidateUntilDto } from './dto/update-pricing.dto';
import { IPricing, IPricingDocument, TPricingCollection } from './interfaces/pricing.interfaces';
import { PricingRepository } from './pricing.repository';

@Injectable()
export class PricingService {
    constructor(
        private readonly pricingRepository: PricingRepository,
        private readonly courtRepository: CourtRepository,
    ) {}

    async create(createPricingDto: CreatePricingDto) {
        await this._validatePricingExists(createPricingDto);
        await this._validateCourtExists(createPricingDto.court);
        await this.pricingRepository.create(createPricingDto);
        return new SuccessResponse(HttpStatus.CREATED, 'Pricing successfully created');
    }

    async findAll() {
        const data: TPricingCollection = await this.pricingRepository.findAll();
        return new SuccessResponse(HttpStatus.OK, 'List of pricings', data);
    }

    async findOne(id: string) {
        const data: IPricingDocument | unknown = await this.pricingRepository.findById(id, true);
        return new SuccessResponse(HttpStatus.OK, 'Pricing found', data);
    }

    async updatePrice(id: string, UpdateDto: UpdateDto) {
        if (!Object.prototype.hasOwnProperty.call(UpdateDto, 'price'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.pricingRepository.findByIdAndUpdate(id, UpdateDto);
        return new SuccessResponse(HttpStatus.OK, 'Pricing price successffuly updated');
    }

    async updateValiteUntil(id: string, updateValidateUntilDto: UpdateValidateUntilDto) {
        if (!Object.prototype.hasOwnProperty.call(updateValidateUntilDto, 'validate_until'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.pricingRepository.findByIdAndUpdate(id, updateValidateUntilDto);
        return new SuccessResponse(HttpStatus.OK, 'Pricing validate until successffuly updated');
    }

    async _validatePricingExists(data: IPricing) {
        const pricing: IPricingDocument | unknown = await this.pricingRepository.findOne({
            membership_type: data.membership_type,
            court: data.court,
        });
        if (pricing) throw new ConflictException('The pricing just exists');
    }

    async _validateCourtExists(court_number: number) {
        const court: ICourtDocument | unknown = await this.courtRepository.findOne({
            court_number,
        });
        if (!court) throw new NotFoundException('Court does not exists');
    }
}
