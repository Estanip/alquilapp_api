import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { AbstractRepository } from 'src/shared/database/repository/abstract.repository';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { MemberSchema } from './schemas';

export class MemberRepository extends AbstractRepository<MemberSchema> {
    protected readonly logger = new LoggerService(MemberRepository.name);
    constructor(
        @InjectModel(MemberSchema.name, CONFIG.db.name) memberModel: Model<MemberSchema>,
        @InjectConnection(CONFIG.db.name) connection: Connection,
    ) {
        super(memberModel, connection);
    }
}
