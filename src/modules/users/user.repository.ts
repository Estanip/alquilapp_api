import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { database_name } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { UserSchema } from './schemas/UserSchema';

@Injectable()
export class UserRepository extends AbstractRepository<UserSchema> {
    protected readonly logger = new LoggerService(UserRepository.name);
    constructor(
        @InjectModel(UserSchema.name, database_name) userModel: Model<UserSchema>,
        @InjectConnection(database_name) connection: Connection,
    ) {
        super(userModel, connection);
    }
}
