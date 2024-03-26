import { ConflictException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { MemberRepository } from 'src/modules/member/member.repository';
import { UserSchema } from 'src/modules/users/schemas/UserSchema';
import { UserRepository } from 'src/modules/users/user.repository';
import { AuthUtils } from '.';
import { IUserCodeVerificationDocument } from '../interfaces/auth.interfaces';
import { UserVerificationCodeRepository } from '../user_verification_code.repository';

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
            user_id,
            { is_enabled: true },
            true,
        )) as UserSchema;
    }

    async _setVerificationCode(user: UserSchema): Promise<void> {
        try {
            const code = crypto.randomBytes(20).toString('hex');
            const userVerificationCode = (await this.userVerificationCodeRepository.create({
                user: user._id.toString(),
                code,
            })) as IUserCodeVerificationDocument;
            if (userVerificationCode) this.authUtils._sendCodeNotification(user.email, code);
        } catch (error) {
            await this.userRepository.deleteById(user._id.toString());
            await this.memberRepository.deleteOne('user_id', user._id.toString());
            throw new ConflictException(error);
        }
    }
}
