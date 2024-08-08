import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/users/schemas';
import { CONFIG } from 'src/shared/Config/configuration';
import { MongooseRepository } from 'src/shared/database/mongo/mongose.repository';

@Injectable()
export class UserRepository extends MongooseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name, CONFIG.db.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
