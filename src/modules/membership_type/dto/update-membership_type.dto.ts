import { CreateMembershipTypeDto } from './create-membership_type.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdateStatusMembershipTypeDto extends PartialType(
    PickType(CreateMembershipTypeDto, ['is_enabled']),
) {}
