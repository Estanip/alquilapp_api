import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';
import { Member, MemberSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: Member.name,
          collection: CONFIG.models.MEMBERS,
          useFactory: () => MemberSchema,
        },
      ],
      CONFIG.db.name,
    ),
  ],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
