import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { database_name, models } from 'src/shared/Config/configuration';
import { MembershipTypeController } from './membership_type.controller';
import { MembershipTypeService } from './membership_type.service';
import { MembershipTypesRepository } from './membershipt_type.repository';
import { MembershipTypesSchema, membershipTypesSchema } from './schemas';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: MembershipTypesSchema.name,
                    collection: models.MEMBERSHIP_TYPES,
                    useFactory: () => membershipTypesSchema,
                },
            ],
            database_name,
        ),
    ],
    controllers: [MembershipTypeController],
    providers: [MembershipTypeService, MembershipTypesRepository],
})
export class MembershipTypeModule {}
