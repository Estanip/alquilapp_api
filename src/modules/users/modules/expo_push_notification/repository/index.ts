import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { UserExpoPushTokenSchema } from '../schemas';

export class UserExpoPushTokenRepository extends AbstractRepository<UserExpoPushTokenSchema> {
  protected readonly logger = new LoggerService(UserExpoPushTokenRepository.name);

  constructor(
    @InjectModel(UserExpoPushTokenSchema.name, CONFIG.db.name)
    userVerificationCodeModel: Model<UserExpoPushTokenSchema>,
    @InjectConnection(CONFIG.db.name) connection: Connection,
  ) {
    super(userVerificationCodeModel, connection);
  }
}
