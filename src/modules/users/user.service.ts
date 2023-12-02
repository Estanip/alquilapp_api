import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { TUserCollection } from './interfaces/user.interface';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersService {
    private userModel: typeof UserModel = UserModel;

    async findAll() {
        try {
            const data: TUserCollection = await this.userModel.find();
            return new SuccessResponse(HttpStatus.OK, 'List of users', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
