import { Injectable, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
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
            return new SuccessResponse(HttpStatus.CREATED, 'List of members', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findOne(id: string) {
        try {
            const data: IMemberDocument = await this.memberModel.findById(id);
            if (!data) throw new NotFoundException('Member not found');
            return new SuccessResponse(HttpStatus.CREATED, 'Member found', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async remove(id: string) {
        try {
            await this.memberModel.findByIdAndRemove(id);
            return new SuccessResponse(HttpStatus.CREATED, 'Member successffuly removed');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateEmail(id: string, updateEmailMemberDto: UpdateEmailMemberDto) {
        try {
            await this.memberModel.findByIdAndUpdate(id, updateEmailMemberDto);
            return new SuccessResponse(HttpStatus.CREATED, 'Member email successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updatePhoneNumber(id: string, updatePhoneNumberMemberDto: UpdatePhoneNumberMemberDto) {
        try {
            await this.memberModel.findByIdAndUpdate(id, updatePhoneNumberMemberDto);
            return new SuccessResponse(
                HttpStatus.CREATED,
                'Member phone number successffuly updated',
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateIdentificationNumber(
        id: string,
        updateIdentificationNumberMemberDto: UpdateIdentificationNumberMemberDto,
    ) {
        try {
            await this.memberModel.findByIdAndUpdate(id, updateIdentificationNumberMemberDto);
            return new SuccessResponse(
                HttpStatus.CREATED,
                'Member identification number successffuly updated',
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateBirthDate(id: string, updateBirthDateMemberDto: UpdateBirthDateMemberDto) {
        try {
            await this.memberModel.findByIdAndUpdate(id, updateBirthDateMemberDto);
            return new SuccessResponse(
                HttpStatus.CREATED,
                'Member birth date successffuly updated',
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateName(id: string, updateNameMemberDto: UpdateNameMemberDto) {
        try {
            await this.memberModel.findByIdAndUpdate(id, updateNameMemberDto);
            return new SuccessResponse(HttpStatus.CREATED, 'Member name successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateIsEnabled(id: string, updateStatusMemberDto: UpdateStatusMemberDto) {
        try {
            await this.memberModel.findByIdAndUpdate(id, updateStatusMemberDto);
            return new SuccessResponse(
                HttpStatus.CREATED,
                'Member is enabled successffuly updated',
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
