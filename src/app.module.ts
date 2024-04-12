import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { CourtModule } from './modules/court/court.module';
import { HealthModule } from './modules/health/health.module';
import { MemberModule } from './modules/member/member.module';
import { MembershipTypeModule } from './modules/membership_type/membership_type.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { UsersModule } from './modules/users/user.module';
import { DatabaseModule } from './shared/database/database.module';
import { MorganMiddleware } from './shared/middlewares/morgan.service';
import { LoggerService } from './shared/utils/logger/logger.service';
import { MongoService } from './shared/database/Config/Mongo/mongo.service';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        UsersModule,
        HealthModule,
        CourtModule,
        MemberModule,
        ReservationModule,
        PricingModule,
        MembershipTypeModule,
    ],
    controllers: [],
    providers: [
        LoggerService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MorganMiddleware).forRoutes('*');
    }
}
