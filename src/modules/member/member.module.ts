import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { database_name, models } from 'src/shared/Config/configuration';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';
import { MemberSchema } from './schemas/MemberSchema';
import { memberSchema } from './schemas/member.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: MemberSchema.name,
                    collection: models.MEMBERS,
                    useFactory: () => memberSchema,
                },
            ],
            database_name,
        ),
    ],
    controllers: [MemberController],
    providers: [MemberService, MemberRepository],
})
export class MemberModule {}
