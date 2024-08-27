import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { MongooseRepository } from 'src/shared/database/mongo/mongose.repository';
import { Court, CourtDocument } from './schemas';

export class CourtRepository extends MongooseRepository<CourtDocument> {
  constructor(
    @InjectModel(Court.name, CONFIG.db.name) courtModel: Model<CourtDocument>,
    @InjectConnection(CONFIG.db.name) connection: Connection,
  ) {
    super(courtModel);
    this._setInitialData(courtModel, connection);
  }

  private async _setInitialData(membershipModel: Model<CourtDocument>, connection: Connection) {
    const conn: Connection = await connection.openUri(CONFIG.db.uri, {
      dbName: CONFIG.db.name,
    });
    if (conn.readyState === 1) membershipModel.bulkWrite(CONFIG.db.initial_data.courts);
  }
}
