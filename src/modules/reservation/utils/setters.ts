import { Injectable, NotFoundException } from '@nestjs/common';
import { SHIFT_DURATION } from 'src/constants/reservations.constants';
import { PricingRepository } from 'src/modules/pricing/pricing.repository';
import { PricingDocument } from 'src/modules/pricing/schemas';
import { IReservation } from 'src/modules/reservation/interfaces';
import { Player } from 'src/modules/users/modules/player/schemas';
import { UserDocument } from 'src/modules/users/schemas';
import { UserRepository } from 'src/modules/users/user.repository';

@Injectable()
export class ReservationSetter {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pricingRepository: PricingRepository,
  ) {}
  async _setPrice(data: IReservation) {
    for (const player of data.players) {
      const user_membership = (
        (await this.userRepository.findById(player.user, true)) as UserDocument
      )?.membership_type;
      const price = (
        (await this.pricingRepository.findOne({
          court: data.court,
          membership_type: user_membership,
        })) as PricingDocument
      )?.price;
      if (price === null || price === undefined)
        throw new NotFoundException('Error when try to get price associated');
      else player.fee = price;
    }
    const total_price = data.players.reduce((acc: number, cur: Player) => {
      return acc + cur.fee;
    }, 0);

    data['total_price'] = total_price;
    return data;
  }

  async _setTo(data: IReservation) {
    if (!data?.to)
      return {
        ...data,
        to: `${Number(data?.from.substring(0, 2)) + SHIFT_DURATION.ONE_HOUR}:00`,
      };
    return data;
  }
}
