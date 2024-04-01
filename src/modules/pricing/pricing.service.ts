import { HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreatePricingDto } from './dto/request/create-pricing.dto';
import { UpdateDto, UpdateValidateUntilDto } from './dto/request/update-pricing.dto';
import { PricingResponseDto } from './dto/response/index.dto';
import { IPricingDocument, TPricingCollection } from './interfaces';
import { PricingRepository } from './pricing.repository';
import { PricingValidator } from './utils/validators';

@Injectable()
export class PricingService {
    constructor(
        private readonly pricingRepository: PricingRepository,
        private readonly pricingValidator: PricingValidator,
    ) {}

    async create(createPricingDto: CreatePricingDto) {
        await this.pricingValidator._validateExists({
            ...createPricingDto,
            validate_until: createPricingDto.validate_until.substring(0, 10),
        });
        await this.pricingValidator._validateCourtExists(createPricingDto.court);
        await this.pricingRepository.create({
            ...createPricingDto,
            validate_until: createPricingDto.validate_until.substring(0, 10),
        });
        return new SuccessResponse(HttpStatus.CREATED, 'Pricing successfully created');
    }

    async findAll() {
        const data = (await this.pricingRepository.findAll()) as TPricingCollection;
        return new SuccessResponse(
            HttpStatus.OK,
            'List of pricings',
            PricingResponseDto.getAll(data),
        );
    }

    async findOne(id: string) {
        const data = (await this.pricingRepository.findById(
            new Types.ObjectId(id),
            true,
        )) as IPricingDocument;
        return new SuccessResponse(HttpStatus.OK, 'Pricing found', PricingResponseDto.getOne(data));
    }

    async updatePrice(id: string, UpdateDto: UpdateDto) {
        if (!Object.prototype.hasOwnProperty.call(UpdateDto, 'price'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.pricingRepository.findByIdAndUpdate(new Types.ObjectId(id), UpdateDto);
        return new SuccessResponse(HttpStatus.OK, 'Pricing price successffuly updated');
    }

    async updateValiteUntil(id: string, updateValidateUntilDto: UpdateValidateUntilDto) {
        if (!Object.prototype.hasOwnProperty.call(updateValidateUntilDto, 'validate_until'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.pricingRepository.findByIdAndUpdate(
            new Types.ObjectId(id),
            updateValidateUntilDto,
        );
        return new SuccessResponse(HttpStatus.OK, 'Pricing validate until successffuly updated');
    }
}
