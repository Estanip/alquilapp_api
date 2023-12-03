import { Module } from '@nestjs/common';
import { MembershipTypeService } from './membership_type.service';
import { MembershipTypeController } from './membership_type.controller';

@Module({
    controllers: [MembershipTypeController],
    providers: [MembershipTypeService],
})
export class MembershipTypeModule {}
