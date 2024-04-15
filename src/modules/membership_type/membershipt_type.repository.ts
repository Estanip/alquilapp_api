import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { MembershipTypesSchema } from './schemas';

export class MembershipTypesRepository extends AbstractRepository<MembershipTypesSchema> {
  protected readonly logger = new LoggerService(MembershipTypesRepository.name);

  constructor(
    @InjectModel(MembershipTypesSchema.name, CONFIG.db.name)
    membershipModel: Model<MembershipTypesSchema>,
    @InjectConnection(CONFIG.db.name) connection: Connection,
  ) {
    super(membershipModel, connection);
    this._setInitialData(membershipModel, connection);
  }

  private async _setInitialData(
    membershipModel: Model<MembershipTypesSchema>,
    connection: Connection,
  ) {
    const conn: Connection = await connection.openUri(CONFIG.db.uri, {
      dbName: CONFIG.db.name,
    });
    if (conn.readyState === 1) membershipModel.bulkWrite(CONFIG.db.initial_data.membership);
  }
}
