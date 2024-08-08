import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { MongooseRepository } from 'src/shared/database/mongo/mongose.repository';
import { UserVerificationCode, UserVerificationCodeDocumemt } from '../schemas';

export class UserVerificationCodeRepository extends MongooseRepository<UserVerificationCodeDocumemt> {
  constructor(
    @InjectModel(UserVerificationCode.name, CONFIG.db.name)
    private readonly userVerificationCodeModel: Model<UserVerificationCodeDocumemt>,
  ) {
    super(userVerificationCodeModel);
  }
}
