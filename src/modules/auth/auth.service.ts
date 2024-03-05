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
import { IMemberDocument } from '../member/interfaces/member.interfaces';
import { MemberRepository } from '../member/member.repository';
import { IUserDocument } from '../users/interfaces/user.interface';
import { UserRepository } from '../users/user.repository';
import { LoginDto } from './dto/request/login-auth.dto';
import { RegisterDto } from './dto/request/register-auth.dto';
import { LoginResponseDto } from './dto/response/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly memberRepository: MemberRepository,
    ) {}

    async register(registerDto: RegisterDto): Promise<SuccessResponse | BadRequestException> {
        const userExists = await this._findUserByEmailOrIdentificationNumber(
            registerDto.email,
            registerDto.identification_number,
        );
        if (userExists) throw new NotFoundException('User exists');
        const user: IUserDocument = (await this.userRepository.create({
            ...registerDto,
            is_membership_validated: false,
        })) as IUserDocument;
        if (user) {
            await this._validateMembershipType(user);
            await this._saveAsMember(user);
        } else new BadRequestException('Error when trying to create a User');
        return new SuccessResponse(HttpStatus.CREATED, 'User successfully created');
    }

    async login(loginDto: LoginDto): Promise<SuccessResponse | BadRequestException> {
        const { email, password } = loginDto;
        const user: IUserDocument = await this._findUserByEmail(email);
        await this._validatePassword(user, password);
        const token: string = await this._generateToken(user);
        return new SuccessResponse(
            HttpStatus.OK,
            'User successfully logged',
            LoginResponseDto.toResponse(user, token),
        );
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
            const member: IMemberDocument = (await this.memberRepository.findOne(
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
        const member: IMemberDocument = (await this.memberRepository.findOne(
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
