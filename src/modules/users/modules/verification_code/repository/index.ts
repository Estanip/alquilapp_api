import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { database_name } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { UserVerificationCodeSchema } from '../schemas';

export class UserVerificationCodeRepository extends AbstractRepository<UserVerificationCodeSchema> {
    protected readonly logger = new LoggerService(UserVerificationCodeRepository.name);

    constructor(
        @InjectModel(UserVerificationCodeSchema.name, database_name)
        userVerificationCodeModel: Model<UserVerificationCodeSchema>,
        @InjectConnection(database_name) connection: Connection,
    ) {
        super(userVerificationCodeModel, connection);
    }
}
