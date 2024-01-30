import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { database_name, models } from 'src/shared/Config/configuration';
import { UserSchema } from './schemas/UserSchema';
import { userSchema } from './schemas/user.schema';
import { UsersController } from './user.controller';
import { UserRepository } from './user.repository';
import { UsersService } from './user.service';

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
    providers: [UsersService, UserRepository],
})
export class UsersModule {}
