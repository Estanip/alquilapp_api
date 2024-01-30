import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { database_name } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { ReservationSchema } from './schemas/ReservationSchema';

export class ReservationRepository extends AbstractRepository<ReservationSchema> {
    protected readonly logger = new LoggerService(ReservationRepository.name);

    constructor(
        @InjectModel(ReservationSchema.name, database_name)
        reservationModel: Model<ReservationSchema>,
        @InjectConnection(database_name) connection: Connection,
    ) {
        super(reservationModel, connection);
    }
}
