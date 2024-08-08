import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { MongooseRepository } from 'src/shared/database/mongo/mongose.repository';
import { Reservation, ReservationDocument } from './schemas';

export class ReservationRepository extends MongooseRepository<ReservationDocument> {
  constructor(
    @InjectModel(Reservation.name, CONFIG.db.name)
    private readonly reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
