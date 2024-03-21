import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { encryptPassword } from 'src/shared/utils/bcrypt.service';
import {
    INodemailerInfoResponse,
    sendEmailNotification,
} from 'src/shared/utils/notifications/nodemailer';
import { IMemberDocument } from '../member/interfaces/member.interfaces';
import { MemberRepository } from '../member/member.repository';
import { IUserDocument } from '../users/interfaces/user.interface';
import { UserSchema } from '../users/schemas/UserSchema';
import { UserRepository } from '../users/user.repository';
import { LoginDto } from './dto/request/login-auth.dto';
import { ChangePasswordDto } from './dto/request/password-recovery.dto';
import { RegisterDto } from './dto/request/register-auth.dto';
import { LoginResponseDto } from './dto/response/login.dto';
import { IUserCodeVerificationDocument } from './interfaces/auth.interfaces';
import { UserVerificationCodeRepository } from './user_verification_code.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly memberRepository: MemberRepository,
        private readonly userVerificationCodeRepository: UserVerificationCodeRepository,
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
                user: user_id,
            })) as IUserCodeVerificationDocument
        ).code as string;
        if (userCode === code) {
            const result = await this._enableUser(user_id);
            if (result) return new SuccessResponse(HttpStatus.OK, 'Successfully code verification');
            else throw new BadRequestException('Error');
        } else throw new UnauthorizedException('Error code verification');
    }

    async login(data: LoginDto): Promise<SuccessResponse | BadRequestException> {
        const { email, password } = data;
        const user = (await this._findUserByEmail(email)) as IUserDocument;
        await this._validatePassword(user, password);
        const token: string = await this._generateToken(user);
        return new SuccessResponse(
            HttpStatus.OK,
            'User successfully logged',
            LoginResponseDto.toResponse(user, token),
        );
    }

    async register(data: RegisterDto): Promise<SuccessResponse | BadRequestException> {
        const userExists = await this._findUserByEmailOrIdentificationNumber(
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
            await this._validateMembershipType(user);
            await this._saveAsMember(user);
            await this._setUserCodeVerification(user);
        } else new BadRequestException('Error when trying to create a User');
        return new SuccessResponse(HttpStatus.CREATED, 'User successfully created');
    }

    async resendVerificationCode(user_id: string, email: string) {
        const userCode = (
            (await this.userVerificationCodeRepository.findOne({
                user: user_id,
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

    async _enableUser(user_id: string): Promise<UserSchema> {
        return (await this.userRepository.findByIdAndUpdate(
            user_id,
            { is_enabled: true },
            true,
        )) as UserSchema;
    }

    async _findUserByEmail(email: string): Promise<IUserDocument> {
        return (await this.userRepository.findOne({ email }, true)) as IUserDocument;
    }

    async _findUserByEmailOrIdentificationNumber(
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

    async _generateToken(user: UserSchema): Promise<string> {
        return await this.jwtService.signAsync({ user_id: user._id.toString() });
    }

    async _saveAsMember(user: UserSchema): Promise<void> {
        try {
            const member = (await this.memberRepository.findOne(
                {
                    user_id: user._id.toString(),
                },
                false,
            )) as IMemberDocument;
            if (member)
                await this.memberRepository.findByIdAndUpdate(member._id.toString(), {
                    user_id: user._id.toString(),
                });
            else if (!member)
                await this.memberRepository.create({
                    user_id: user._id.toString(),
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
            await this.userRepository.deleteById(user._id.toString());
            throw new ConflictException(error);
        }
    }

    async _setUserCodeVerification(user: UserSchema): Promise<void> {
        try {
            const code = crypto.randomBytes(20).toString('hex');
            const userVerificationCode = (await this.userVerificationCodeRepository.create({
                user: user._id.toString(),
                code,
            })) as IUserCodeVerificationDocument;
            if (userVerificationCode) this._sendCodeNotification(user.email, code);
        } catch (error) {
            await this.userRepository.deleteById(user._id.toString());
            await this.memberRepository.deleteOne('user_id', user._id.toString());
            throw new ConflictException(error);
        }
    }

    async _sendCodeNotification(email: string, code: string) {
        await sendEmailNotification(email, 'Código de Verificación', `Codigo: ${code}`);
    }

    _validatePassword(user: Partial<IUserDocument>, password: string): void {
        const validatePassword: boolean = user.comparePasswords(password);
        if (!validatePassword) throw new ForbiddenException('Incorrect password');
    }

    async _validateMembershipType(user: Partial<IUserDocument>) {
        const member = (await this.memberRepository.findOne(
            {
                identification_number: user.identification_number,
            },
            false,
        )) as IMemberDocument;
        if (member)
            if (member.membership_type === user.membership_type)
                user.is_membership_validated = true;
    }
}
