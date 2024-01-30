import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { database_name, models } from 'src/shared/Config/configuration';
import { MemberRepository } from '../member/member.repository';
import { MemberSchema } from '../member/schemas/MemberSchema';
import { memberSchema } from '../member/schemas/member.schema';
import { UserSchema } from '../users/schemas/UserSchema';
import { userSchema } from '../users/schemas/user.schema';
import { UserRepository } from '../users/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: MemberSchema.name,
                    collection: models.MEMBERS,
                    useFactory: () => memberSchema,
                },
                {
                    name: UserSchema.name,
                    collection: models.USERS,
                    useFactory: () => userSchema,
                },
            ],
            database_name,
        ),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: {
                    expiresIn: configService.get<string>('jwt.expires'),
                },
            }),
            inject: [ConfigService],
            global: true,
        }),
    ],
    providers: [AuthService, ConfigService, UserRepository, MemberRepository],
    controllers: [AuthController],
})
export class AuthModule {}
