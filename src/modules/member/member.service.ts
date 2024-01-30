import { HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateMemberDto } from './dto/create-member.dto';
import {
    UpdateBirthDateDto,
    UpdateEmailDto,
    UpdateNameDto,
    UpdatePhoneNumberDto,
    UpdateStatusDto,
} from './dto/update-member.dto';
import { IMemberDocument, TMemberCollection } from './interfaces/member.interfaces';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
    constructor(private readonly memberRepository: MemberRepository) {}

    async create(createMemberDto: CreateMemberDto) {
        await this.memberRepository.create(createMemberDto);
        return new SuccessResponse(HttpStatus.CREATED, 'Member successfully created');
    }

    async findAll() {
        const data: TMemberCollection = await this.memberRepository.findAll();
        return new SuccessResponse(HttpStatus.OK, 'List of members', data);
    }

    async findOne(id: string) {
        const data: IMemberDocument | unknown = await this.memberRepository.findById(id, true);
        return new SuccessResponse(HttpStatus.OK, 'Member found', data);
    }

    async remove(id: string) {
        await this.memberRepository.deleteById(id);
        return new SuccessResponse(HttpStatus.OK, 'Member successffuly removed');
    }

    async updateEmail(id: string, UpdateEmailDto: UpdateEmailDto) {
        if (!UpdateEmailDto.hasOwnProperty('email'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(id, UpdateEmailDto);
        return new SuccessResponse(HttpStatus.OK, 'Member email successffuly updated');
    }

    async updatePhoneNumber(id: string, UpdatePhoneNumberDto: UpdatePhoneNumberDto) {
        if (!UpdatePhoneNumberDto.hasOwnProperty('phone_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(id, UpdatePhoneNumberDto);
        return new SuccessResponse(HttpStatus.OK, 'Member phone number successffuly updated');
    }

    /*     async updateIdentificationNumber(
        id: string,
        UpdateIdentificationNumberDto: UpdateIdentificationNumberDto,
    ) {
        if (!UpdateIdentificationNumberDto.hasOwnProperty('identification_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(id, UpdateIdentificationNumberDto);
        return new SuccessResponse(
            HttpStatus.OK,
            'Member identification number successffuly updated',
        );
    } */

    async updateBirthDate(id: string, UpdateBirthDateDto: UpdateBirthDateDto) {
        if (!UpdateBirthDateDto.hasOwnProperty('birth_date'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(id, UpdateBirthDateDto);
        return new SuccessResponse(HttpStatus.OK, 'Member birth date successffuly updated');
    }

    async updateName(id: string, UpdateNameDto: UpdateNameDto) {
        if (
            !UpdateNameDto.hasOwnProperty('first_name') ||
            !UpdateNameDto.hasOwnProperty('last_name')
        )
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(id, UpdateNameDto);
        return new SuccessResponse(HttpStatus.OK, 'Member name successffuly updated');
    }

    async updateStatus(id: string, UpdateStatusDto: UpdateStatusDto) {
        if (!UpdateStatusDto.hasOwnProperty('is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.memberRepository.findByIdAndUpdate(id, UpdateStatusDto);
        return new SuccessResponse(HttpStatus.OK, 'Member is enabled successffuly updated');
    }
}
