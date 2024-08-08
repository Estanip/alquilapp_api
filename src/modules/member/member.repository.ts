import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { MongooseRepository } from 'src/shared/database/mongo/mongose.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { Member, MemberDocument } from './schemas';

export class MemberRepository extends MongooseRepository<MemberDocument> {
  protected readonly logger = new LoggerService(MemberRepository.name);
  constructor(
    @InjectModel(Member.name, CONFIG.db.name) private readonly memberModel: Model<MemberDocument>,
  ) {
    super(memberModel);
  }
}
