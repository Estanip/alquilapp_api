import { HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { UpdateIsEnabledDto, UpdateIsMembershipValidatedDto } from './dto/update-user.dto';
import { IUserDocument, TUserCollection } from './interfaces/user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async findAll() {
        const data: TUserCollection = await this.userRepository.findAll();
        return new SuccessResponse(HttpStatus.OK, 'List of users', data);
    }

    async checkIsEnabled(id: string) {
        let status = false;
        const user: Partial<IUserDocument> = await this._findById(id);
        if (user.is_enabled) status = true;
        return new SuccessResponse(HttpStatus.OK, 'User is enabled status', { status });
    }

    async checkMembershipValidation(id: string) {
        let status = false;
        const user: Partial<IUserDocument> = await this._findById(id);
        if (user.is_membership_validated) status = true;
        return new SuccessResponse(HttpStatus.OK, 'User is membership validated status', {
            status,
        });
    }

    async updateIsEnabled(id: string, updateIsEnabledDto: UpdateIsEnabledDto) {
        if (!updateIsEnabledDto.hasOwnProperty('is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.userRepository.findByIdAndUpdate(id, updateIsEnabledDto);
        return new SuccessResponse(HttpStatus.OK, 'User is enabled status updated');
    }

    async updateIsMembershipValidated(
        id: string,
        updateIsMembershipValidatedDto: UpdateIsMembershipValidatedDto,
    ) {
        if (!updateIsMembershipValidatedDto.hasOwnProperty('is_membership_validated'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.userRepository.findByIdAndUpdate(id, updateIsMembershipValidatedDto);
        return new SuccessResponse(HttpStatus.OK, 'User is membership validated status updated');
    }

    async _findById(id: string) {
        return await this.userRepository.findById(id, true);
    }
}
