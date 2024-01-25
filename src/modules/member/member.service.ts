import {
    Injectable,
    HttpStatus,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import {
    UpdateBirthDateDto,
    UpdateEmailDto,
    UpdateIdentificationNumberDto,
    UpdateStatusDto,
    UpdateNameDto,
    UpdatePhoneNumberDto,
} from './dto/update-member.dto';
import { MemberModel } from './models/member.model';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { IMemberDocument, TMemberCollection } from './interfaces/member.interfaces';

@Injectable()
export class MemberService {
    private readonly memberModel: typeof MemberModel;

    constructor() {
        this.memberModel = MemberModel;
    }

    async create(createMemberDto: CreateMemberDto) {
        await new this.memberModel(createMemberDto).save();
        return new SuccessResponse(HttpStatus.CREATED, 'Member successfully created');
    }

    async findAll() {
        const data: TMemberCollection = await this.memberModel.find();
        return new SuccessResponse(HttpStatus.OK, 'List of members', data);
    }

    async findOne(id: string) {
        const data: IMemberDocument = await this.memberModel.findById(id);
        if (!data) throw new NotFoundException('Member not found');
        return new SuccessResponse(HttpStatus.OK, 'Member found', data);
    }

    async remove(id: string) {
        await this.memberModel.findByIdAndDelete(id);
        return new SuccessResponse(HttpStatus.OK, 'Member successffuly removed');
    }

    async updateEmail(id: string, UpdateEmailDto: UpdateEmailDto) {
        if (!UpdateEmailDto.hasOwnProperty('email'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, UpdateEmailDto);
        return new SuccessResponse(HttpStatus.OK, 'Member email successffuly updated');
    }

    async updatePhoneNumber(id: string, UpdatePhoneNumberDto: UpdatePhoneNumberDto) {
        if (!UpdatePhoneNumberDto.hasOwnProperty('phone_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, UpdatePhoneNumberDto);
        return new SuccessResponse(HttpStatus.OK, 'Member phone number successffuly updated');
    }

    async updateIdentificationNumber(
        id: string,
        UpdateIdentificationNumberDto: UpdateIdentificationNumberDto,
    ) {
        if (!UpdateIdentificationNumberDto.hasOwnProperty('identification_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, UpdateIdentificationNumberDto);
        return new SuccessResponse(
            HttpStatus.OK,
            'Member identification number successffuly updated',
        );
    }

    async updateBirthDate(id: string, UpdateBirthDateDto: UpdateBirthDateDto) {
        if (!UpdateBirthDateDto.hasOwnProperty('birth_date'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, UpdateBirthDateDto);
        return new SuccessResponse(HttpStatus.OK, 'Member birth date successffuly updated');
    }

    async updateName(id: string, UpdateNameDto: UpdateNameDto) {
        if (
            !UpdateNameDto.hasOwnProperty('first_name') ||
            !UpdateNameDto.hasOwnProperty('last_name')
        )
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, UpdateNameDto);
        return new SuccessResponse(HttpStatus.OK, 'Member name successffuly updated');
    }

    async updateStatus(id: string, UpdateStatusDto: UpdateStatusDto) {
        if (!UpdateStatusDto.hasOwnProperty('is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, UpdateStatusDto);
        return new SuccessResponse(HttpStatus.OK, 'Member is enabled successffuly updated');
    }
}
