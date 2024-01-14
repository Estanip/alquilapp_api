import {
    Injectable,
    HttpStatus,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import {
    UpdateBirthDateMemberDto,
    UpdateEmailMemberDto,
    UpdateIdentificationNumberMemberDto,
    UpdateStatusMemberDto,
    UpdateNameMemberDto,
    UpdatePhoneNumberMemberDto,
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

    async updateEmail(id: string, updateEmailMemberDto: UpdateEmailMemberDto) {
        if (!updateEmailMemberDto.hasOwnProperty('email'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, updateEmailMemberDto);
        return new SuccessResponse(HttpStatus.OK, 'Member email successffuly updated');
    }

    async updatePhoneNumber(id: string, updatePhoneNumberMemberDto: UpdatePhoneNumberMemberDto) {
        if (!updatePhoneNumberMemberDto.hasOwnProperty('phone_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, updatePhoneNumberMemberDto);
        return new SuccessResponse(HttpStatus.OK, 'Member phone number successffuly updated');
    }

    async updateIdentificationNumber(
        id: string,
        updateIdentificationNumberMemberDto: UpdateIdentificationNumberMemberDto,
    ) {
        if (!updateIdentificationNumberMemberDto.hasOwnProperty('identification_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, updateIdentificationNumberMemberDto);
        return new SuccessResponse(
            HttpStatus.OK,
            'Member identification number successffuly updated',
        );
    }

    async updateBirthDate(id: string, updateBirthDateMemberDto: UpdateBirthDateMemberDto) {
        if (!updateBirthDateMemberDto.hasOwnProperty('birth_date'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, updateBirthDateMemberDto);
        return new SuccessResponse(HttpStatus.OK, 'Member birth date successffuly updated');
    }

    async updateName(id: string, updateNameMemberDto: UpdateNameMemberDto) {
        if (
            !updateNameMemberDto.hasOwnProperty('first_name') ||
            !updateNameMemberDto.hasOwnProperty('last_name')
        )
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, updateNameMemberDto);
        return new SuccessResponse(HttpStatus.OK, 'Member name successffuly updated');
    }

    async updateStatus(id: string, updateStatusMemberDto: UpdateStatusMemberDto) {
        if (!updateStatusMemberDto.hasOwnProperty('is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberModel.findByIdAndUpdate(id, updateStatusMemberDto);
        return new SuccessResponse(HttpStatus.OK, 'Member is enabled successffuly updated');
    }
}
