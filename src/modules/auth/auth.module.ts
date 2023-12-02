import 'dotenv/config';
const { JWT_EXPIRE, JWT_SECRET } = process.env;

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: JWT_EXPIRE },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
