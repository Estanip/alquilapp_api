import {
    Injectable,
    HttpStatus,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
/* import { UpdatePricingDto } from './dto/update-pricing.dto';
 */ import { PricingModel } from './models/pricing.model';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { IPricingDocument, TPricingCollection } from './interfaces/pricing.interfaces';
import { UpdatePriceDto, UpdateValidateUntilDto } from './dto/update-pricing.dto';

@Injectable()
export class PricingService {
    private pricingModel: typeof PricingModel;
    constructor() {
        this.pricingModel = PricingModel;
    }

    async create(createPricingDto: CreatePricingDto) {
        await new this.pricingModel(createPricingDto).save();
        return new SuccessResponse(HttpStatus.CREATED, 'Pricing successfully created');
    }

    async findAll() {
        const data: TPricingCollection = await this.pricingModel.find();
        return new SuccessResponse(HttpStatus.OK, 'List of pricings', data);
    }

    async findOne(id: string) {
        const data: IPricingDocument = await this.pricingModel.findById(id);
        if (!data) throw new NotFoundException('Pricing not found');
        return new SuccessResponse(HttpStatus.OK, 'Pricing found', data);
    }

    async updatePrice(id: string, updatePriceDto: UpdatePriceDto) {
        if (!updatePriceDto.hasOwnProperty('price'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.pricingModel.findByIdAndUpdate(id, updatePriceDto);
        return new SuccessResponse(HttpStatus.OK, 'Pricing price successffuly updated');
    }

    async updateValiteUntil(id: string, updateValidateUntilDto: UpdateValidateUntilDto) {
        if (!updateValidateUntilDto.hasOwnProperty('validate_until'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.pricingModel.findByIdAndUpdate(id, updateValidateUntilDto);
        return new SuccessResponse(HttpStatus.OK, 'Pricing validate until successffuly updated');
    }
}
