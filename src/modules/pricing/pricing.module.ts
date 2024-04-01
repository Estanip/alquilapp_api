import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { database_name, models } from 'src/shared/Config/configuration';
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
                    collection: models.PRICING,
                    useFactory: () => pricingSchema,
                },
                {
                    name: CourtSchema.name,
                    collection: models.COURTS,
                    useFactory: () => courtSchema,
                },
            ],
            database_name,
        ),
    ],
    controllers: [PricingController],
    providers: [PricingService, PricingRepository, CourtRepository, PricingValidator],
})
export class PricingModule {}
