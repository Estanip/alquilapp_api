import {
    BadRequestException,
    ConflictException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { encryptPassword } from 'src/shared/utils/bcrypt.service';
import {
    INodemailerInfoResponse,
    sendEmailNotification,
} from 'src/shared/utils/notifications/nodemailer';
import { IUserDocument } from '../users/interfaces';
import { IUserCodeVerificationDocument } from '../users/modules/verification_code/interfaces';
import { UserVerificationCodeRepository } from '../users/modules/verification_code/repository';
import { UserRepository } from '../users/user.repository';
import { LoginDto } from './dto/request/login-auth.dto';
import { ChangePasswordDto } from './dto/request/password-recovery.dto';
import { RegisterDto } from './dto/request/register-auth.dto';
import { LoginResponseDto } from './dto/response/login.dto';
import { AuthUtils } from './utils';
import { AuthCrons } from './utils/crons';
import { AuthFinder } from './utils/finders';
import { AuthSetter } from './utils/setters';
import { AuthValidator } from './utils/validators';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userVerificationCodeRepository: UserVerificationCodeRepository,
        private readonly authUtils: AuthUtils,
        private readonly authFinder: AuthFinder,
        private readonly authValidator: AuthValidator,
        private readonly authSetter: AuthSetter,
        private readonly authCrons: AuthCrons,
    ) {}

    async changePassword(data: ChangePasswordDto) {
        const { email, new_password } = data;
        const encryptedPassword = encryptPassword(new_password);
        const result = await this.userRepository.findOneAndUpdate(
            { email },
            { password: encryptedPassword },
        );
        if (result) return new SuccessResponse(HttpStatus.OK, 'Password successfully changed');
    }

    async checkCodeVerifiation(user_id: string, code: string) {
        const userCode = (
            (await this.userVerificationCodeRepository.findOne({
                user_id: new Types.ObjectId(user_id),
            })) as IUserCodeVerificationDocument
        ).code as string;
        if (userCode === code) {
            const result = await this.authSetter._setToEnable(user_id);
            if (result) return new SuccessResponse(HttpStatus.OK, 'Successfully code verification');
            else throw new BadRequestException('Error');
        } else throw new UnauthorizedException('Error code verification');
    }

    async login(data: LoginDto): Promise<SuccessResponse | BadRequestException> {
        const { email, password } = data;
        const user = (await this.authFinder._findByEmail(email)) as IUserDocument;
        await this.authValidator._validatePassword(user, password);
        const token: string = await this.authUtils._generateToken(user);
        this.authCrons.initShiftReminderCron(user?._id);
        return new SuccessResponse(
            HttpStatus.OK,
            'User successfully logged',
            LoginResponseDto.toResponse(user, token),
        );
    }

    async register(data: RegisterDto): Promise<SuccessResponse | BadRequestException> {
        const userExists = await this.authFinder._findByEmailOrIdentificationNumber(
            data.email,
            data.identification_number,
        );
        if (userExists) throw new NotFoundException('User exists');
        const user = (await this.userRepository.create({
            ...data,
            birth_date: data.birth_date.substring(0, 10),
            is_membership_validated: false,
        })) as IUserDocument;
        if (user) {
            await this.authValidator._validateMembershipType(user);
            await this.authUtils._saveAsMember(user);
            await this.authSetter._setVerificationCode(user);
        } else new BadRequestException('Error when trying to create a User');
        return new SuccessResponse(HttpStatus.CREATED, 'User successfully created');
    }

    async resendVerificationCode(user_id: string, email: string) {
        const userCode = (
            (await this.userVerificationCodeRepository.findOne({
                user_id: new Types.ObjectId(user_id),
            })) as IUserCodeVerificationDocument
        ).code as string;
        const result = (await sendEmailNotification(
            email,
            'Código de verificación',
            `Código: ${userCode}`,
        )) as undefined | INodemailerInfoResponse;

        if (!result) throw new ConflictException('Error when trying to resend email');
        return new SuccessResponse(HttpStatus.OK, 'Successfully resend verification code');
    }
}
