import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { CourtRepository } from '../court/court.repository';
import { Court, CourtSchema } from '../court/schemas';
import { PricingController } from './pricing.controller';
import { PricingRepository } from './pricing.repository';
import { PricingService } from './pricing.service';
import { Pricing, PricingSchema } from './schemas';
import { PricingValidator } from './utils/validators';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: Pricing.name,
          collection: CONFIG.models.PRICING,
          useFactory: () => PricingSchema,
        },
        {
          name: Court.name,
          collection: CONFIG.models.COURTS,
          useFactory: () => CourtSchema,
        },
      ],
      CONFIG.db.name,
    ),
  ],
  controllers: [PricingController],
  providers: [PricingService, PricingRepository, CourtRepository, PricingValidator],
})
export class PricingModule {}
