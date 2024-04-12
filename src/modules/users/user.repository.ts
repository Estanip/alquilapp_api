import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { UserSchema } from './schemas';

@Injectable()
export class UserRepository extends AbstractRepository<UserSchema> {
    protected readonly logger = new LoggerService(UserRepository.name);
    constructor(
        @InjectModel(UserSchema.name, CONFIG.db.name) userModel: Model<UserSchema>,
        @InjectConnection(CONFIG.db.name) connection: Connection,
    ) {
        super(userModel, connection);
    }
}
