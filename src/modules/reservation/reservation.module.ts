import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { database_name, models } from 'src/shared/Config/configuration';
import { CourtRepository } from '../court/court.repository';
import { CourtSchema } from '../court/schemas/CourtSchema';
import { courtSchema } from '../court/schemas/court.schema';
import { PricingRepository } from '../pricing/pricing.repository';
import { PricingSchema } from '../pricing/schemas/PricingSchema';
import { pricingSchema } from '../pricing/schemas/pricing.schema';
import { UserSchema } from '../users/schemas/UserSchema';
import { userSchema } from '../users/schemas/user.schema';
import { UserRepository } from '../users/user.repository';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';
import { ReservationSchema } from './schemas/ReservationSchema';
import { reservationSchema } from './schemas/reservation.schema';
import { ReservationSetter } from './utils/setters';
import { ReservationValidator } from './utils/validators';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: ReservationSchema.name,
                    collection: models.RESERVATIONS,
                    useFactory: () => reservationSchema,
                },
                {
                    name: UserSchema.name,
                    collection: models.USERS,
                    useFactory: () => userSchema,
                },
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
    controllers: [ReservationController],
    providers: [
        ReservationService,
        ReservationRepository,
        ReservationValidator,
        ReservationSetter,
        CourtRepository,
        UserRepository,
        PricingRepository,
    ],
})
export class ReservationModule {}
