import {
    HttpStatus,
    Injectable,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { IUserDocument, TUserCollection } from './interfaces/user.interface';
import { UserModel } from './models/user.model';
import { UpdateIsEnabledDto, UpdateIsMembershipValidatedDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private userModel: typeof UserModel = UserModel;

    async findAll() {
        const data: TUserCollection = await this.userModel.find();
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
        await this.userModel.findByIdAndUpdate(id, updateIsEnabledDto);
        return new SuccessResponse(HttpStatus.OK, 'User is enabled status updated');
    }

    async updateIsMembershipValidated(
        id: string,
        updateIsMembershipValidatedDto: UpdateIsMembershipValidatedDto,
    ) {
        if (!updateIsMembershipValidatedDto.hasOwnProperty('is_membership_validated'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.userModel.findByIdAndUpdate(id, updateIsMembershipValidatedDto);
        return new SuccessResponse(HttpStatus.OK, 'User is membership validated status updated');
    }

    _findById(id: string) {
        const user = this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('User not found');
        else return user;
    }
}
