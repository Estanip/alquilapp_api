import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { database_name, models } from 'src/shared/Config/configuration';
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
                    collection: models.USERS,
                    useFactory: () => userSchema,
                },
            ],
            database_name,
        ),
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository, UserFinder],
})
export class UsersModule {}
