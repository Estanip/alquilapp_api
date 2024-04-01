import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { courts_run_data, database_name, database_uri } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { CourtSchema } from './schemas';

export class CourtRepository extends AbstractRepository<CourtSchema> {
    protected readonly logger = new LoggerService(CourtRepository.name);
    constructor(
        @InjectModel(CourtSchema.name, database_name) courtModel: Model<CourtSchema>,
        @InjectConnection(database_name) connection: Connection,
    ) {
        super(courtModel, connection);
        this._setInitialData(courtModel, connection);
    }

    private async _setInitialData(membershipModel: Model<CourtSchema>, connection: Connection) {
        const conn: Connection = await connection.openUri(database_uri, { dbName: database_name });
        if (conn.readyState === 1) membershipModel.bulkWrite(courts_run_data);
    }
}
