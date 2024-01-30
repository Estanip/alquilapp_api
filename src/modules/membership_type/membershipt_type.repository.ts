import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { database_name, database_uri, membership_run_data } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { MembershipTypesSchema } from './schemas/MembershipTypes';

export class MembershipTypesRepository extends AbstractRepository<MembershipTypesSchema> {
    protected readonly logger = new LoggerService(MembershipTypesRepository.name);

    constructor(
        @InjectModel(MembershipTypesSchema.name, database_name)
        membershipModel: Model<MembershipTypesSchema>,
        @InjectConnection(database_name) connection: Connection,
    ) {
        super(membershipModel, connection);
        this._setInitialData(membershipModel, connection);
    }

    private async _setInitialData(
        membershipModel: Model<MembershipTypesSchema>,
        connection: Connection,
    ) {
        const conn: Connection = await connection.openUri(database_uri, { dbName: database_name });
        if (conn.readyState === 1) membershipModel.bulkWrite(membership_run_data);
    }
}
