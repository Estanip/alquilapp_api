import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/modules/users/schemas';
import { UserRepository } from 'src/modules/users/user.repository';

@Injectable()
export class AuthFinder {
  constructor(private readonly userRepository: UserRepository) {}
  async _findByEmail(email: string): Promise<UserDocument> {
    return (await this.userRepository.findOne({ email }, true)) as UserDocument;
  }

  async _findByEmailOrIdentificationNumber(
    email: string,
    identification_number: string,
  ): Promise<UserDocument> {
    return (await this.userRepository.findOne(
      {
        $or: [{ email }, { identification_number }],
      },
      false,
    )) as UserDocument;
  }
}
