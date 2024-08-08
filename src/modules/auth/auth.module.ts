import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import Expo from 'expo-server-sdk';
import { CONFIG } from 'src/shared/Config/configuration';
import { CronService } from 'src/shared/utils/crons';
import { PushNotificationService } from 'src/shared/utils/notifications/push';
import { MemberRepository } from '../member/member.repository';
import { Member, MemberSchema } from '../member/schemas';
import { ReservationRepository } from '../reservation/reservation.repository';
import { Reservation, ReservationSchema } from '../reservation/schemas';
import { UserExpoPushTokenRepository } from '../users/modules/expo_push_notification/repository';
import {
  UserExpoPushToken,
  UserExpoPushTokenSchema,
} from '../users/modules/expo_push_notification/schemas';
import { UserVerificationCodeRepository } from '../users/modules/verification_code/repository';
import {
  UserVerificationCode,
  UserVerificationCodeSchema,
} from '../users/modules/verification_code/schemas';
import { User, UserSchema } from '../users/schemas';
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
          name: Member.name,
          collection: CONFIG.models.MEMBERS,
          useFactory: () => MemberSchema,
        },
        {
          name: User.name,
          collection: CONFIG.models.USERS,
          useFactory: () => UserSchema,
        },
        {
          name: UserVerificationCode.name,
          collection: CONFIG.models.USER_VERIFICATION_CODE,
          useFactory: () => UserVerificationCodeSchema,
        },
        {
          name: Reservation.name,
          collection: CONFIG.models.RESERVATIONS,
          useFactory: () => ReservationSchema,
        },
        {
          name: UserExpoPushToken.name,
          collection: CONFIG.models.USER_EXPO_PUSH_TOKEN,
          useFactory: () => UserExpoPushTokenSchema,
        },
      ],
      CONFIG.db.name,
    ),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: CONFIG.jwt.secret,
        signOptions: {
          expiresIn: CONFIG.jwt.expires,
        },
      }),
      global: true,
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthValidator,
    AuthSetter,
    AuthFinder,
    AuthUtils,
    UserRepository,
    MemberRepository,
    ReservationRepository,
    UserVerificationCodeRepository,
    CronService,
    AuthCrons,
    PushNotificationService,
    UserExpoPushTokenRepository,
    Expo,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
