import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { CourtRepository } from '../court/court.repository';
import { CourtSchema, courtSchema } from '../court/schemas';
import { PricingController } from './pricing.controller';
import { PricingRepository } from './pricing.repository';
import { PricingService } from './pricing.service';
import { PricingSchema, pricingSchema } from './schemas';
import { PricingValidator } from './utils/validators';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: PricingSchema.name,
                    collection: CONFIG.models.PRICING,
                    useFactory: () => pricingSchema,
                },
                {
                    name: CourtSchema.name,
                    collection: CONFIG.models.COURTS,
                    useFactory: () => courtSchema,
                },
            ],
            CONFIG.db.name,
        ),
    ],
    controllers: [PricingController],
    providers: [PricingService, PricingRepository, CourtRepository, PricingValidator],
})
export class PricingModule {}
