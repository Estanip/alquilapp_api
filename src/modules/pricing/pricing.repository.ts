import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { MongooseRepository } from 'src/shared/database/mongo/mongose.repository';
import { Pricing, PricingDocument } from './schemas';

export class PricingRepository extends MongooseRepository<PricingDocument> {
  constructor(
    @InjectModel(Pricing.name, CONFIG.db.name)
    private readonly pricingModel: Model<PricingDocument>,
  ) {
    super(pricingModel);
  }
}
