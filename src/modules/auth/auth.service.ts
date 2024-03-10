import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { encryptPassword } from 'src/shared/utils/bcrypt.service';
import { IMemberDocument } from '../member/interfaces/member.interfaces';
import { MemberRepository } from '../member/member.repository';
import { IUserDocument } from '../users/interfaces/user.interface';
import { UserRepository } from '../users/user.repository';
import { LoginDto } from './dto/request/login-auth.dto';
import { ChangePasswordDto } from './dto/request/password-recovery.dto';
import { RegisterDto } from './dto/request/register-auth.dto';
import { LoginResponseDto } from './dto/response/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly memberRepository: MemberRepository,
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
            is_membership_validated: false,
        })) as IUserDocument;
        if (user) {
            await this._validateMembershipType(user);
            await this._saveAsMember(user);
        } else new BadRequestException('Error when trying to create a User');
        return new SuccessResponse(HttpStatus.CREATED, 'User successfully created');
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

    async _generateToken(user: IUserDocument): Promise<string> {
        return await this.jwtService.signAsync({ user_id: user.id });
    }

    async _saveAsMember(user: IUserDocument): Promise<void> {
        try {
            const member = (await this.memberRepository.findOne(
                {
                    user_id: user.id,
                },
                false,
            )) as IMemberDocument;
            if (member)
                await this.memberRepository.findByIdAndUpdate(member._id.toString(), {
                    user_id: user.id,
                });
            else if (!member)
                await this.memberRepository.create({
                    user_id: user.id,
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
            await this.userRepository.deleteById(user.id);
            throw new ConflictException(error);
        }
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
