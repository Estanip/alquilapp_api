import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-auth.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { LoginDto } from './dto/login-auth.dto';
import { IsPublic } from 'src/shared/middlewares/public_routes.config';

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
}
