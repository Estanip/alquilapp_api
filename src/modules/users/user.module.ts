import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { UserExpoPushTokenRepository } from './modules/expo_push_notification/repository';
import {
  UserExpoPushTokenSchema,
  userExpoPushTokenSchema,
} from './modules/expo_push_notification/schemas';
import { UserSchema, userSchema } from './schemas';
import { UsersController } from './user.controller';
import { UserRepository } from './user.repository';
import { UsersService } from './user.service';
import { UserFinder } from './utils/finders';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: UserSchema.name,
          collection: CONFIG.models.USERS,
          useFactory: () => userSchema,
        },
        {
          name: UserExpoPushTokenSchema.name,
          collection: CONFIG.models.USER_EXPO_PUSH_TOKEN,
          useFactory: () => userExpoPushTokenSchema,
        },
      ],
      CONFIG.db.name,
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserExpoPushTokenRepository, UserFinder],
})
export class UsersModule {}
