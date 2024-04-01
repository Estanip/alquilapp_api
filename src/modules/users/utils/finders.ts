import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserFinder {
    constructor(private readonly userRepository: UserRepository) {}

    async _findById(id: string) {
        return await this.userRepository.findById(new Types.ObjectId(id), true);
    }
}
