import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { UserExpoPushTokenRepository } from './modules/expo_push_notification/repository';

import {
  UserExpoPushToken,
  UserExpoPushTokenSchema,
} from 'src/modules/users/modules/expo_push_notification/schemas';
import { User, UserSchema } from './schemas';
import { UsersController } from './user.controller';
import { UserRepository } from './user.repository';
import { UsersService } from './user.service';
import { UserFinder } from './utils/finders';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: User.name,
          collection: CONFIG.models.USERS,
          useFactory: () => UserSchema,
        },
        {
          name: UserExpoPushToken.name,
          collection: CONFIG.models.USER_EXPO_PUSH_TOKEN,
          useFactory: () => UserExpoPushTokenSchema,
        },
      ],
      CONFIG.db.name,
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserExpoPushTokenRepository, UserFinder],
})
export class UsersModule {}
