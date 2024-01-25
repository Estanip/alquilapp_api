import {
    HttpStatus,
    Injectable,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdateDto, UpdateValidateUntilDto } from './dto/update-pricing.dto';
import { IPricingDocument, TPricingCollection } from './interfaces/pricing.interfaces';
import { PricingModel } from './models/pricing.model';

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

    async updatePrice(id: string, UpdateDto: UpdateDto) {
        if (!UpdateDto.hasOwnProperty('price'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.pricingModel.findByIdAndUpdate(id, UpdateDto);
        return new SuccessResponse(HttpStatus.OK, 'Pricing price successffuly updated');
    }

    async updateValiteUntil(id: string, updateValidateUntilDto: UpdateValidateUntilDto) {
        if (!updateValidateUntilDto.hasOwnProperty('validate_until'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.pricingModel.findByIdAndUpdate(id, updateValidateUntilDto);
        return new SuccessResponse(HttpStatus.OK, 'Pricing validate until successffuly updated');
    }
}
