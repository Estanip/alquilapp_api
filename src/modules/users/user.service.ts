import { HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserDocument } from 'src/modules/users/schemas';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { UpdateIsEnabledDto, UpdateIsMembershipValidatedDto } from './dto/request/update-user.dto';
import { TUserCollection } from './interfaces';
import { UserExpoPushTokenRepository } from './modules/expo_push_notification/repository';
import { PlayersResponseDto } from './modules/player/dto/response';
import { UserRepository } from './user.repository';
import { UserFinder } from './utils/finders';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userExpoPushTokenRepository: UserExpoPushTokenRepository,
    private readonly userUtils: UserFinder,
  ) {}

  async getAll() {
    const data = (await this.userRepository.findAll()) as TUserCollection;
    return new SuccessResponse(HttpStatus.OK, 'List of users', data);
  }

  async getEnabledPlayers() {
    const data = (await this.userRepository.findAll({
      is_enabled: true,
      //is_membership_validated: true,
    })) as TUserCollection;
    return new SuccessResponse(HttpStatus.OK, 'List of users', PlayersResponseDto.getAll(data));
  }

  async checkIsEnabled(id: string) {
    let status = false;
    const user = (await this.userUtils._findById(id)) as UserDocument;
    if (user.is_enabled) status = true;
    return new SuccessResponse(HttpStatus.OK, 'User is enabled status', { status });
  }

  async checkMembershipValidation(id: string) {
    let status = false;
    const user = (await this.userUtils._findById(id)) as UserDocument;
    if (user.is_membership_validated) status = true;
    return new SuccessResponse(HttpStatus.OK, 'User is membership validated status', {
      status,
    });
  }

  async setExpoPushToken(id: string, expoPushToken: string) {
    await this.userExpoPushTokenRepository.create({
      user_id: new Types.ObjectId(id),
      token: expoPushToken,
    });
    return new SuccessResponse(HttpStatus.OK, 'Expo push token successfully saved');
  }

  async updateIsEnabled(id: string, updateIsEnabledDto: UpdateIsEnabledDto) {
    if (!Object.prototype.hasOwnProperty.call(updateIsEnabledDto, 'is_enabled'))
      throw new PreconditionFailedException('Field/s must not be empty');
    await this.userRepository.findByIdAndUpdate(new Types.ObjectId(id), updateIsEnabledDto);
    return new SuccessResponse(HttpStatus.OK, 'User is enabled status updated');
  }

  async updateIsMembershipValidated(
    id: string,
    updateIsMembershipValidatedDto: UpdateIsMembershipValidatedDto,
  ) {
    if (
      !Object.prototype.hasOwnProperty.call(
        updateIsMembershipValidatedDto,
        'is_membership_validated',
      )
    )
      throw new PreconditionFailedException('Field/s must not be empty');
    await this.userRepository.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateIsMembershipValidatedDto,
    );
    return new SuccessResponse(HttpStatus.OK, 'User is membership validated status updated');
  }
}
