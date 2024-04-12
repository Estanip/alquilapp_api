import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { CourtSchema } from './schemas';

export class CourtRepository extends AbstractRepository<CourtSchema> {
    protected readonly logger = new LoggerService(CourtRepository.name);
    constructor(
        @InjectModel(CourtSchema.name, CONFIG.db.name) courtModel: Model<CourtSchema>,
        @InjectConnection(CONFIG.db.name) connection: Connection,
    ) {
        super(courtModel, connection);
        this._setInitialData(courtModel, connection);
    }

    private async _setInitialData(membershipModel: Model<CourtSchema>, connection: Connection) {
        const conn: Connection = await connection.openUri(CONFIG.db.uri, {
            dbName: CONFIG.db.name,
        });
        if (conn.readyState === 1) membershipModel.bulkWrite(CONFIG.db.initial_data.courts);
    }
}
