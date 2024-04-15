import { Injectable } from '@nestjs/common';
import { IUserDocument } from 'src/modules/users/interfaces';
import { UserRepository } from 'src/modules/users/user.repository';

@Injectable()
export class AuthFinder {
  constructor(private readonly userRepository: UserRepository) {}
  async _findByEmail(email: string): Promise<IUserDocument> {
    return (await this.userRepository.findOne({ email }, true)) as IUserDocument;
  }

  async _findByEmailOrIdentificationNumber(
    email: string,
    identification_number: string,
  ): Promise<IUserDocument> {
    return (await this.userRepository.findOne(
      {
        $or: [{ email }, { identification_number }],
      },
      false,
    )) as IUserDocument;
  }
}
