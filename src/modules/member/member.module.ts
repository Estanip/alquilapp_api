import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';
import { MemberSchema, memberSchema } from './schemas';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: MemberSchema.name,
                    collection: CONFIG.models.MEMBERS,
                    useFactory: () => memberSchema,
                },
            ],
            CONFIG.db.name,
        ),
    ],
    controllers: [MemberController],
    providers: [MemberService, MemberRepository],
})
export class MemberModule {}
