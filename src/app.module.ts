import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './modules/users/user.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { CourtModule } from './modules/court/court.module';
import { MemberModule } from './modules/member/member.module';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
    imports: [
        AuthModule,
        HealthModule,
        DatabaseModule,
        UsersModule,
        CourtModule,
        MemberModule,
        ReservationModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
