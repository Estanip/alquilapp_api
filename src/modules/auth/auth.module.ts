import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import Expo from 'expo-server-sdk';
import { CONFIG } from 'src/shared/Config/configuration';
import { CronService } from 'src/shared/utils/crons';
import { PushNotificationService } from 'src/shared/utils/notifications/push';
import { MemberRepository } from '../member/member.repository';
import { MemberSchema, memberSchema } from '../member/schemas';
import { ReservationRepository } from '../reservation/reservation.repository';
import { ReservationSchema, reservationSchema } from '../reservation/schemas';
import { UserExpoPushTokenRepository } from '../users/modules/expo_push_notification/repository';
import {
  UserExpoPushTokenSchema,
  userExpoPushTokenSchema,
} from '../users/modules/expo_push_notification/schemas';
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
          collection: CONFIG.models.MEMBERS,
          useFactory: () => memberSchema,
        },
        {
          name: UserSchema.name,
          collection: CONFIG.models.USERS,
          useFactory: () => userSchema,
        },
        {
          name: UserVerificationCodeSchema.name,
          collection: CONFIG.models.USER_VERIFICATION_CODE,
          useFactory: () => userVerificationCodeSchema,
        },
        {
          name: ReservationSchema.name,
          collection: CONFIG.models.RESERVATIONS,
          useFactory: () => reservationSchema,
        },
        {
          name: UserExpoPushTokenSchema.name,
          collection: CONFIG.models.USER_EXPO_PUSH_TOKEN,
          useFactory: () => userExpoPushTokenSchema,
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
