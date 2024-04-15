import { ConflictException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { Types } from 'mongoose';
import { MemberRepository } from 'src/modules/member/member.repository';
import { IUserCodeVerificationDocument } from 'src/modules/users/modules/verification_code/interfaces';
import { UserVerificationCodeRepository } from 'src/modules/users/modules/verification_code/repository';
import { UserSchema } from 'src/modules/users/schemas';
import { UserRepository } from 'src/modules/users/user.repository';
import { AuthUtils } from '.';

@Injectable()
export class AuthSetter {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly memberRepository: MemberRepository,
    private readonly userVerificationCodeRepository: UserVerificationCodeRepository,
    private readonly authUtils: AuthUtils,
  ) {}

  async _setToEnable(user_id: string): Promise<UserSchema> {
    return (await this.userRepository.findByIdAndUpdate(
      new Types.ObjectId(user_id),
      { is_enabled: true },
      true,
    )) as UserSchema;
  }

  async _setVerificationCode(user: UserSchema): Promise<void> {
    try {
      const code = crypto.randomBytes(20).toString('hex');
      const userVerificationCode = (await this.userVerificationCodeRepository.create({
        user_id: user._id,
        code,
      })) as IUserCodeVerificationDocument;
      if (userVerificationCode) this.authUtils._sendCodeNotification(user.email, code);
    } catch (error) {
      await this.userRepository.deleteById(user._id);
      await this.memberRepository.deleteOne('user_id', user._id);
      throw new ConflictException(error);
    }
  }
}
