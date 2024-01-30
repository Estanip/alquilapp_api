import { HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateMembershipTypeDto } from './dto/create-membership_type.dto';
import { UpdateStatusDto } from './dto/update-membership_type.dto';
import {
    IMembershipTypeDocument,
    TMembershipTypeCollection,
} from './interfaces/membership_type.interfaces';
import { MembershipTypesRepository } from './membershipt_type.repository';

@Injectable()
export class MembershipTypeService {
    constructor(private readonly membershipTypeRepository: MembershipTypesRepository) {}

    async create(createMembershipTypeDto: CreateMembershipTypeDto) {
        await this.membershipTypeRepository.create(createMembershipTypeDto);
        return new SuccessResponse(HttpStatus.CREATED, 'MembershipType successfully created');
    }

    async findAll() {
        const data: TMembershipTypeCollection = await this.membershipTypeRepository.findAll();
        return new SuccessResponse(HttpStatus.OK, 'List of membershipTypes', data);
    }

    async findOne(id: string) {
        const data: IMembershipTypeDocument | unknown =
            await this.membershipTypeRepository.findById(id, true);
        return new SuccessResponse(HttpStatus.OK, 'MembershipType found', data);
    }

    async updateStatus(id: string, UpdateStatusDto: UpdateStatusDto) {
        if (!UpdateStatusDto.hasOwnProperty('is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.membershipTypeRepository.findByIdAndUpdate(id, UpdateStatusDto);
        return new SuccessResponse(
            HttpStatus.OK,
            'Membership Type is enabled successffuly updated',
        );
    }
}
