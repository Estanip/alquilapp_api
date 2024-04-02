import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { database_name } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { UserExpoPushTokenSchema } from '../schemas';

export class UserExpoPushTokenRepository extends AbstractRepository<UserExpoPushTokenSchema> {
    protected readonly logger = new LoggerService(UserExpoPushTokenRepository.name);

    constructor(
        @InjectModel(UserExpoPushTokenSchema.name, database_name)
        userVerificationCodeModel: Model<UserExpoPushTokenSchema>,
        @InjectConnection(database_name) connection: Connection,
    ) {
        super(userVerificationCodeModel, connection);
    }
}
