import { Module, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './modules/users/user.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { CourtModule } from './modules/court/court.module';
import { MemberModule } from './modules/member/member.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { MembershipTypeModule } from './modules/membership_type/membership_type.module';
import { MorganMiddleware } from './shared/middlewares/morgan.service';

@Module({
    imports: [
        AuthModule,
        HealthModule,
        DatabaseModule,
        UsersModule,
        CourtModule,
        MemberModule,
        ReservationModule,
        PricingModule,
        MembershipTypeModule,
    ],
    controllers: [],
    providers: [
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
