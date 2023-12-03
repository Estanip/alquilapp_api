import {
    Injectable,
    HttpStatus,
    BadRequestException,
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
        try {
            await new this.memberModel(createMemberDto).save();
            return new SuccessResponse(HttpStatus.CREATED, 'Member successfully created');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findAll() {
        try {
            const data: TMemberCollection = await this.memberModel.find();
            return new SuccessResponse(HttpStatus.OK, 'List of members', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findOne(id: string) {
        try {
            const data: IMemberDocument = await this.memberModel.findById(id);
            if (!data) throw new NotFoundException('Member not found');
            return new SuccessResponse(HttpStatus.OK, 'Member found', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async remove(id: string) {
        try {
            await this.memberModel.findByIdAndDelete(id);
            return new SuccessResponse(HttpStatus.OK, 'Member successffuly removed');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateEmail(id: string, updateEmailMemberDto: UpdateEmailMemberDto) {
        try {
            if (!updateEmailMemberDto.hasOwnProperty('email'))
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.memberModel.findByIdAndUpdate(id, updateEmailMemberDto);
            return new SuccessResponse(HttpStatus.OK, 'Member email successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updatePhoneNumber(id: string, updatePhoneNumberMemberDto: UpdatePhoneNumberMemberDto) {
        try {
            if (!updatePhoneNumberMemberDto.hasOwnProperty('phone_number'))
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.memberModel.findByIdAndUpdate(id, updatePhoneNumberMemberDto);
            return new SuccessResponse(HttpStatus.OK, 'Member phone number successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateIdentificationNumber(
        id: string,
        updateIdentificationNumberMemberDto: UpdateIdentificationNumberMemberDto,
    ) {
        try {
            if (!updateIdentificationNumberMemberDto.hasOwnProperty('identification_number'))
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.memberModel.findByIdAndUpdate(id, updateIdentificationNumberMemberDto);
            return new SuccessResponse(
                HttpStatus.OK,
                'Member identification number successffuly updated',
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateBirthDate(id: string, updateBirthDateMemberDto: UpdateBirthDateMemberDto) {
        try {
            if (!updateBirthDateMemberDto.hasOwnProperty('birth_date'))
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.memberModel.findByIdAndUpdate(id, updateBirthDateMemberDto);
            return new SuccessResponse(HttpStatus.OK, 'Member birth date successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateName(id: string, updateNameMemberDto: UpdateNameMemberDto) {
        try {
            if (
                !updateNameMemberDto.hasOwnProperty('first_name') ||
                !updateNameMemberDto.hasOwnProperty('last_name')
            )
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.memberModel.findByIdAndUpdate(id, updateNameMemberDto);
            return new SuccessResponse(HttpStatus.OK, 'Member name successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateStatus(id: string, updateStatusMemberDto: UpdateStatusMemberDto) {
        try {
            if (!updateStatusMemberDto.hasOwnProperty('is_enabled'))
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.memberModel.findByIdAndUpdate(id, updateStatusMemberDto);
            return new SuccessResponse(HttpStatus.OK, 'Member is enabled successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
