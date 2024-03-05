import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateMembershipTypeDto } from './dto/request/create-membership_type.dto';
import { UpdateStatusDto } from './dto/request/update-membership_type.dto';
import { MembershipTypeService } from './membership_type.service';

@Controller('membership-type')
export class MembershipTypeController {
    constructor(private readonly membershipTypeService: MembershipTypeService) {}

    @Post()
    @ApiBody({ type: CreateMembershipTypeDto })
    @ApiOkResponse({
        description: 'Successful response membershipType created',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createMembershipTypeDto: CreateMembershipTypeDto) {
        return this.membershipTypeService.create(createMembershipTypeDto);
    }

    @Get()
    @ApiOkResponse({
        description: 'Successful response get membershipTypes',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.membershipTypeService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Successful response get membershipType by id',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.membershipTypeService.findOne(id);
    }

    @Patch('/status/:id')
    @ApiBody({ type: UpdateStatusDto })
    @ApiOkResponse({
        description: 'Successful response to is enabled update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateStatus(@Param('id') id: string, @Body() UpdateStatusDto: UpdateStatusDto) {
        return this.membershipTypeService.updateStatus(id, UpdateStatusDto);
    }
}
