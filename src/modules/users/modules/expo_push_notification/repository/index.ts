import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserExpoPushToken,
  UserExpoPushTokenDocument,
} from 'src/modules/users/modules/expo_push_notification/schemas';
import { CONFIG } from 'src/shared/Config/configuration';
import { MongooseRepository } from 'src/shared/database/mongo/mongose.repository';

export class UserExpoPushTokenRepository extends MongooseRepository<UserExpoPushTokenDocument> {
  constructor(
    @InjectModel(UserExpoPushToken.name, CONFIG.db.name)
    private readonly userVerificationCodeModel: Model<UserExpoPushTokenDocument>,
  ) {
    super(userVerificationCodeModel);
  }
}
