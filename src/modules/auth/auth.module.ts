import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { database_name, models } from 'src/shared/Config/configuration';
import { CronService } from 'src/shared/utils/crons';
import { PushNotificationService } from 'src/shared/utils/notifications/push';
import { MemberRepository } from '../member/member.repository';
import { MemberSchema, memberSchema } from '../member/schemas';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReservationSchema, reservationSchema } from '../reservation/schemas';
import { UserVerificationCodeRepository } from '../users/modules/verification_code/repository';
import {
    UserVerificationCodeSchema,
    userVerificationCodeSchema,
} from '../users/modules/verification_code/schemas';
import { UserSchema, userSchema } from '../users/schemas';
import { UserRepository } from '../users/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUtils } from './utils';
import { AuthCrons } from './utils/crons';
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
                {
                    name: ReservationSchema.name,
                    collection: models.RESERVATIONS,
                    useFactory: () => reservationSchema,
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
        ReservationRepository,
        UserVerificationCodeRepository,
        CronService,
        AuthCrons,
        PushNotificationService,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
