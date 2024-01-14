import {
    BadRequestException,
    ForbiddenException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register-auth.dto';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { LoginDto } from './dto/login-auth.dto';
import { IUserAttributes, IUserDocument } from '../users/interfaces/user.interface';
import { ILoginResponse } from './interfaces/auth.interfaces';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../users/models/user.model';

@Injectable()
export class AuthService {
    private userModel: typeof UserModel;

    constructor(private jwtService: JwtService) {
        this.userModel = UserModel;
    }

    async register(registerDto: RegisterDto): Promise<SuccessResponse | BadRequestException> {
        await new this.userModel(registerDto).save();
        return new SuccessResponse(HttpStatus.CREATED, 'User successfully created');
    }

    async login(loginDto: LoginDto): Promise<SuccessResponse | BadRequestException> {
        const { email, password } = loginDto;
        const user: IUserDocument = await this._findUser(email);
        if (!user) throw new NotFoundException('User does not exists');
        await this._validatePassword(user, password);
        const token: string = await this._generateToken(user);
        const result = {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            identification_number: user.identification_number,
            token,
        } as ILoginResponse;
        return new SuccessResponse(HttpStatus.OK, 'User successfully logged', result);
    }

    _findUser(email: string): Promise<IUserDocument> {
        const user = this.userModel.findOne({ email }).exec();
        if (!user) throw new NotFoundException('User not found');
        else return user;
    }

    _validatePassword(user: IUserAttributes, password: string): void {
        const validatePassword: boolean = user.comparePasswords(password);
        if (!validatePassword) throw new ForbiddenException('Incorrect password');
    }

    async _generateToken(user: Partial<IUserDocument>): Promise<string> {
        return await this.jwtService.signAsync({ user_id: user.id });
    }
}
