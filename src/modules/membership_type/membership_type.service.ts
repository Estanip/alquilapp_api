import {
    Injectable,
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
        await new this.membershipTypeModel(createMembershipTypeDto).save();
        return new SuccessResponse(HttpStatus.CREATED, 'MembershipType successfully created');
    }

    async findAll() {
        const data: TMembershipTypeCollection = await this.membershipTypeModel.find();
        return new SuccessResponse(HttpStatus.OK, 'List of membershipTypes', data);
    }

    async findOne(id: string) {
        const data: IMembershipTypeDocument = await this.membershipTypeModel.findById(id);
        if (!data) throw new NotFoundException('MembershipType not found');
        return new SuccessResponse(HttpStatus.OK, 'MembershipType found', data);
    }

    async updateStatus(id: string, updateStatusMembershipTypeDto: UpdateStatusMembershipTypeDto) {
        if (!updateStatusMembershipTypeDto.hasOwnProperty('is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.membershipTypeModel.findByIdAndUpdate(id, updateStatusMembershipTypeDto);
        return new SuccessResponse(
            HttpStatus.OK,
            'Membership Type is enabled successffuly updated',
        );
    }
}
