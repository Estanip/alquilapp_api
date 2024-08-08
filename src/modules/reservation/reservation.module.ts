import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { CourtRepository } from '../court/court.repository';
import { Court, CourtSchema } from '../court/schemas';
import { PricingRepository } from '../pricing/pricing.repository';
import { Pricing, PricingSchema } from '../pricing/schemas';
import { User, UserSchema } from '../users/schemas';
import { UserRepository } from '../users/user.repository';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationSchema } from './schemas';
import { ReservationSetter } from './utils/setters';
import { ReservationValidator } from './utils/validators';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: Reservation.name,
          collection: CONFIG.models.RESERVATIONS,
          useFactory: () => ReservationSchema,
        },
        {
          name: User.name,
          collection: CONFIG.models.USERS,
          useFactory: () => UserSchema,
        },
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
