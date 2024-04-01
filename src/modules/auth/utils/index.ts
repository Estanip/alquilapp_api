import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IMemberDocument } from 'src/modules/member/interfaces';
import { MemberRepository } from 'src/modules/member/member.repository';
import { UserSchema } from 'src/modules/users/schemas';
import { UserRepository } from 'src/modules/users/user.repository';
import { sendEmailNotification } from 'src/shared/utils/notifications/nodemailer';

@Injectable()
export class AuthUtils {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly memberRepository: MemberRepository,
        private readonly jwtService: JwtService,
    ) {}

    async _generateToken(user: UserSchema): Promise<string> {
        return await this.jwtService.signAsync({ user_id: user._id.toString() });
    }

    async _saveAsMember(user: UserSchema): Promise<void> {
        try {
            const member = (await this.memberRepository.findOne(
                {
                    user_id: user._id,
                },
                false,
            )) as IMemberDocument;
            if (member)
                await this.memberRepository.findByIdAndUpdate(member._id, {
                    user_id: user._id,
                });
            else if (!member)
                await this.memberRepository.create({
                    user_id: user._id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    identification_number: user.identification_number,
                    phone_number: user.phone_number,
                    birth_date: user.birth_date,
                    membership_type: user.membership_type,
                    is_enabled: false,
                });
        } catch (error) {
            await this.userRepository.deleteById(user._id);
            throw new ConflictException(error);
        }
    }

    async _sendCodeNotification(email: string, code: string) {
        await sendEmailNotification(email, 'Código de Verificación', `Codigo: ${code}`);
    }
}
