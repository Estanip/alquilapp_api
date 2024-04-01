import { HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateMemberDto } from './dto/request/create-member.dto';
import {
    UpdateBirthDateDto,
    UpdateEmailDto,
    UpdateNameDto,
    UpdatePhoneNumberDto,
    UpdateStatusDto,
} from './dto/request/update-member.dto';
import { MemberResponseDto } from './dto/response/index.dto';
import { IMemberDocument, TMemberCollection } from './interfaces';
import { MemberRepository } from './member.repository';
import { MemberSchema } from './schemas';

@Injectable()
export class MemberService {
    constructor(private readonly memberRepository: MemberRepository) {}

    async create(createMemberDto: CreateMemberDto) {
        const dataAsSchema: MemberSchema = {
            ...createMemberDto,
            user_id: new Types.ObjectId(createMemberDto.user_id),
        };
        await this.memberRepository.create(dataAsSchema);
        return new SuccessResponse(HttpStatus.CREATED, 'Member successfully created');
    }

    async findAll() {
        const data = (await this.memberRepository.findAll()) as TMemberCollection;
        return new SuccessResponse(
            HttpStatus.OK,
            'List of members',
            MemberResponseDto.getAll(data),
        );
    }

    async findOne(id: string) {
        const data = (await this.memberRepository.findById(
            new Types.ObjectId(id),
            true,
        )) as IMemberDocument;
        return new SuccessResponse(HttpStatus.OK, 'Member found', MemberResponseDto.getOne(data));
    }

    async remove(id: string) {
        await this.memberRepository.deleteById(new Types.ObjectId(id));
        return new SuccessResponse(HttpStatus.OK, 'Member successffuly removed');
    }

    async updateEmail(id: string, UpdateEmailDto: UpdateEmailDto) {
        if (!Object.prototype.hasOwnProperty.call(UpdateEmailDto, 'email'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(new Types.ObjectId(id), UpdateEmailDto);
        return new SuccessResponse(HttpStatus.OK, 'Member email successffuly updated');
    }

    async updatePhoneNumber(id: string, UpdatePhoneNumberDto: UpdatePhoneNumberDto) {
        if (!Object.prototype.hasOwnProperty.call(UpdatePhoneNumberDto, 'phone_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(new Types.ObjectId(id), UpdatePhoneNumberDto);
        return new SuccessResponse(HttpStatus.OK, 'Member phone number successffuly updated');
    }

    async updateBirthDate(id: string, UpdateBirthDateDto: UpdateBirthDateDto) {
        if (!Object.prototype.hasOwnProperty.call(UpdateBirthDateDto, 'birth_date'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(new Types.ObjectId(id), UpdateBirthDateDto);
        return new SuccessResponse(HttpStatus.OK, 'Member birth date successffuly updated');
    }

    async updateName(id: string, UpdateNameDto: UpdateNameDto) {
        if (
            !Object.prototype.hasOwnProperty.call(UpdateNameDto, 'first_name') ||
            !Object.prototype.hasOwnProperty.call(UpdateNameDto, 'last_name')
        )
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(new Types.ObjectId(id), UpdateNameDto);
        return new SuccessResponse(HttpStatus.OK, 'Member name successffuly updated');
    }

    async updateStatus(id: string, UpdateStatusDto: UpdateStatusDto) {
        if (!Object.prototype.hasOwnProperty.call(UpdateStatusDto, 'is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(new Types.ObjectId(id), UpdateStatusDto);
        return new SuccessResponse(HttpStatus.OK, 'Member is enabled successffuly updated');
    }
}
