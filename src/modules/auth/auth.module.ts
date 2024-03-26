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
import { UserVerificationCodeSchema } from './schemas/UserVerificationCode';
import { userVerificationCodeSchema } from './schemas/user_verification_code.schema';
import { UserVerificationCodeRepository } from './user_verification_code.repository';
import { AuthUtils } from './utils';
import { AuthFinder } from './utils/finders';
import { AuthSetter } from './utils/setters';
import { AuthValidator } from './utils/validators';

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
                {
                    name: UserVerificationCodeSchema.name,
                    collection: models.USER_VERIFICATION_CODE,
                    useFactory: () => userVerificationCodeSchema,
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
    providers: [
        AuthService,
        AuthValidator,
        AuthSetter,
        AuthFinder,
        AuthUtils,
        ConfigService,
        UserRepository,
        MemberRepository,
        UserVerificationCodeRepository,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
