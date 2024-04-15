import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { ReservationSchema } from './schemas';

export class ReservationRepository extends AbstractRepository<ReservationSchema> {
  protected readonly logger = new LoggerService(ReservationRepository.name);

  constructor(
    @InjectModel(ReservationSchema.name, CONFIG.db.name)
    reservationModel: Model<ReservationSchema>,
    @InjectConnection(CONFIG.db.name) connection: Connection,
  ) {
    super(reservationModel, connection);
  }
}
