import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { database_name } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { PricingSchema } from './schemas/PricingSchema';

export class PricingRepository extends AbstractRepository<PricingSchema> {
    protected readonly logger = new LoggerService(PricingSchema.name);

    constructor(
        @InjectModel(PricingSchema.name, database_name) pricingModel: Model<PricingSchema>,
        @InjectConnection(database_name) connection: Connection,
    ) {
        super(pricingModel, connection);
    }
}
