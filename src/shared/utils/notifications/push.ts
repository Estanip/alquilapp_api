import { Injectable } from '@nestjs/common';
import Expo from 'expo-server-sdk';
import { Types } from 'mongoose';
import { UserExpoPushTokenRepository } from 'src/modules/users/modules/expo_push_notification/repository';

@Injectable()
export class PushNotificationService {
    private expo_push_token: string | null;

    constructor(
        private readonly userExpoPushTokenRepository: UserExpoPushTokenRepository,
        private readonly expo: Expo = new Expo(),
    ) {}

    private async setExpoPushToken(user_id: Types.ObjectId) {
        const { token } = await this.userExpoPushTokenRepository.findOne({ user_id });
        this.expo_push_token = token;
    }

    async send(user_id: Types.ObjectId, message: string): Promise<void> {
        await this.setExpoPushToken(user_id);
        if (!this.expo_push_token) {
            console.log('Expo push token not found');
            return;
        }
        const notification = {
            to: this.expo_push_token,
            body: message,
        };
        await this.expo.sendPushNotificationsAsync([notification]);
    }
}
