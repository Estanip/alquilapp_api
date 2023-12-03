import {
    Injectable,
    BadRequestException,
    HttpStatus,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { CreateMembershipTypeDto } from './dto/create-membership_type.dto';
import { MembershipTypeModel } from './models/membership_type.model';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import {
    IMembershipTypeDocument,
    TMembershipTypeCollection,
} from './interfaces/membership_type.interfaces';
import { UpdateStatusMembershipTypeDto } from './dto/update-membership_type.dto';

@Injectable()
export class MembershipTypeService {
    private membershipTypeModel: typeof MembershipTypeModel;
    constructor() {
        this.membershipTypeModel = MembershipTypeModel;
    }

    async create(createMembershipTypeDto: CreateMembershipTypeDto) {
        try {
            await new this.membershipTypeModel(createMembershipTypeDto).save();
            return new SuccessResponse(HttpStatus.CREATED, 'MembershipType successfully created');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findAll() {
        try {
            const data: TMembershipTypeCollection = await this.membershipTypeModel.find();
            return new SuccessResponse(HttpStatus.OK, 'List of membershipTypes', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findOne(id: string) {
        try {
            const data: IMembershipTypeDocument = await this.membershipTypeModel.findById(id);
            if (!data) throw new NotFoundException('MembershipType not found');
            return new SuccessResponse(HttpStatus.OK, 'MembershipType found', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateStatus(id: string, updateStatusMembershipTypeDto: UpdateStatusMembershipTypeDto) {
        try {
            if (!updateStatusMembershipTypeDto.hasOwnProperty('is_enabled'))
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.membershipTypeModel.findByIdAndUpdate(id, updateStatusMembershipTypeDto);
            return new SuccessResponse(
                HttpStatus.OK,
                'Membership Type is enabled successffuly updated',
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
