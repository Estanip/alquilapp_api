import { Injectable } from '@nestjs/common';
import Expo from 'expo-server-sdk';
import { Types } from 'mongoose';
import { UserExpoPushTokenRepository } from 'src/modules/users/modules/expo_push_notification/repository';

@Injectable()
export class PushNotificationService {
    private expo_push_token: string;

    constructor(
        private readonly userExpoPushTokenRepository: UserExpoPushTokenRepository,
        private readonly expo: Expo = new Expo(),
    ) {}

    async getExpoPushToken(user_id: Types.ObjectId) {
        this.setExpoPushToken((await this.userExpoPushTokenRepository.findOne({ user_id })).token);
    }

    setExpoPushToken(expoPushToken: string | null) {
        this.expo_push_token = expoPushToken;
    }

    get expoPushToken(): string | null {
        return this.expo_push_token;
    }

    async send(token: string, message: string): Promise<void> {
        const notification = {
            to: token,
            body: message,
        };
        await this.expo.sendPushNotificationsAsync([notification]);
    }
}
