import { Injectable, NotFoundException } from '@nestjs/common';
import { SHIFT_DURATION } from 'src/constants/reservations.constants';
import { IPricingDocument } from 'src/modules/pricing/interfaces';
import { PricingRepository } from 'src/modules/pricing/pricing.repository';
import { IUserDocument } from 'src/modules/users/interfaces';
import { IPlayer } from 'src/modules/users/modules/player/interfaces';
import { UserRepository } from 'src/modules/users/user.repository';
import { ReservationSchema } from '../schemas';

@Injectable()
export class ReservationSetter {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly pricingRepository: PricingRepository,
    ) {}
    async _setPrice(data: ReservationSchema | Partial<ReservationSchema>) {
        for (const player of data.players) {
            const user_membership = (
                (await this.userRepository.findById(player.user_id, true)) as IUserDocument
            )?.membership_type;
            const price = (
                (await this.pricingRepository.findOne({
                    court: data.court,
                    membership_type: user_membership,
                })) as IPricingDocument
            )?.price;
            if (price === null || price === undefined)
                throw new NotFoundException('Error when try to get price associated');
            else player.fee = price;
        }
        const total_price = data.players.reduce((acc: number, cur: IPlayer) => {
            return acc + cur.fee;
        }, 0);

        data['total_price'] = total_price;
        return data;
    }

    async _setTo(data: ReservationSchema | Partial<ReservationSchema>) {
        if (!data?.to)
            return {
                ...data,
                to: `${Number(data?.from.substring(0, 2)) + SHIFT_DURATION.ONE_HOUR}:00`,
            };
        return data;
    }
}
