import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { MongooseRepository } from 'src/shared/database/mongo/mongose.repository';
import { MembershipTypes, MembershipTypesDocument } from './schemas';

export class MembershipTypesRepository extends MongooseRepository<MembershipTypesDocument> {
  constructor(
    @InjectModel(MembershipTypes.name, CONFIG.db.name)
    private readonly membershipModel: Model<MembershipTypesDocument>,
    @InjectConnection(CONFIG.db.name) connection: Connection,
  ) {
    super(membershipModel);
    this._setInitialData(membershipModel, connection);
  }

  private async _setInitialData(
    membershipModel: Model<MembershipTypesDocument>,
    connection: Connection,
  ) {
    const conn: Connection = await connection.openUri(CONFIG.db.uri, {
      dbName: CONFIG.db.name,
    });
    if (conn.readyState === 1) membershipModel.bulkWrite(CONFIG.db.initial_data.membership);
  }
}
