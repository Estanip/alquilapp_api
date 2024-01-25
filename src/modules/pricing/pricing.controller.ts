import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Patch } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UpdateDto, UpdateValidateUntilDto } from './dto/update-pricing.dto';
/* import { UpdatePricingDto } from './dto/update-pricing.dto'; */

@Controller('pricing')
export class PricingController {
    constructor(private readonly pricingService: PricingService) {}

    @Post()
    @ApiBody({ type: CreatePricingDto })
    @ApiOkResponse({
        description: 'Successful response pricing created',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createPricingDto: CreatePricingDto) {
        return this.pricingService.create(createPricingDto);
    }

    @Get()
    @ApiOkResponse({
        description: 'Successful response get pricings',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.pricingService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Successful response get pricing by id',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.pricingService.findOne(id);
    }

    @Patch('/price/:id')
    @ApiBody({ type: UpdateDto })
    @ApiOkResponse({
        description: 'Successful response to price update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updatePrice(@Param('id') id: string, @Body() UpdateDto: UpdateDto) {
        return this.pricingService.updatePrice(id, UpdateDto);
    }

    @Patch('/validate_until/:id')
    @ApiBody({ type: UpdateValidateUntilDto })
    @ApiOkResponse({
        description: 'Successful response to price update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateValidateUntil(
        @Param('id') id: string,
        @Body() updateValidateUntilDto: UpdateValidateUntilDto,
    ) {
        return this.pricingService.updateValiteUntil(id, updateValidateUntilDto);
    }
}
