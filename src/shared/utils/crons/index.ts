import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Types } from 'mongoose';
import { ReservationRepository } from 'src/modules/reservation/reservation.repository';
import { PushNotificationService } from '../notifications/push';

@Injectable()
export class CronService {
    private user_id: Types.ObjectId;

    constructor(
        private readonly pushNotificationService: PushNotificationService,
        private readonly reservationRepository: ReservationRepository,
    ) {}

    setUser(userId: Types.ObjectId) {
        this.user_id = userId;
    }

    @Cron(CronExpression.EVERY_HOUR)
    async handleShiftReminder() {
        try {
            const reservation = await this.reservationRepository.findOne({
                owner_id: this.user_id,
                date: new Date().toISOString()?.substring(0, 10),
            });
            if (reservation) {
                const currentHour: number | string = Number(new Date().getHours().toString());
                const nextHour = (currentHour + 1).toString();
                const currentMinutes =
                    new Date().getMinutes().toString().length === 1
                        ? `0${new Date().getMinutes().toString()}`
                        : new Date().getMinutes().toString();
                const timeTocheck = `${nextHour}:${currentMinutes}`;
                if (timeTocheck === reservation.from) {
                    await this.pushNotificationService.getExpoPushToken(this.user_id);
                    if (this.pushNotificationService.expoPushToken) {
                        await this.pushNotificationService.send(
                            this.pushNotificationService.expoPushToken,
                            'Tu turno comenzará pronto!',
                        );
                    }
                }
            }
        } catch (error) {
            console.error('Error occurred during cron job:', error);
        }
    }
}
