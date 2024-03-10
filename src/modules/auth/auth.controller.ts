import { Body, Controller, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/shared/middlewares/public_routes.config';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login-auth.dto';
import { ChangePasswordDto } from './dto/request/password-recovery.dto';
import { RegisterDto } from './dto/request/register-auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @ApiBody({ type: RegisterDto })
    @ApiOkResponse({
        description: 'Successful response to user registration',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @IsPublic()
    @ApiBody({ type: LoginDto })
    @ApiOkResponse({
        description: 'Successful response to user login',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @IsPublic()
    @ApiBody({ type: ChangePasswordDto })
    @Put('/change-password')
    resetPassword(@Body() passwordReset: ChangePasswordDto) {
        return this.authService.changePassword(passwordReset);
    }
}
