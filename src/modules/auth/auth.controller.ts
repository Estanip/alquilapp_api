import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: SuccessResponse,
  })
  @ApiBadRequestResponse({
    description: 'Error when trying to create a User',
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

  @Get('/code-verification/:user_id/:code')
  checkCodeVerifiation(@Param('user_id') user_id: string, @Param('code') code: string) {
    return this.authService.checkCodeVerifiation(user_id, code);
  }

  @Post('/resend-verification-code/:user_id')
  resendVerificationCode(@Param('user_id') user_id: string, @Body('email') email: string) {
    return this.authService.resendVerificationCode(user_id, email);
  }
}
