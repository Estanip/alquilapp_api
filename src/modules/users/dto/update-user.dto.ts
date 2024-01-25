import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateIsEnabledDto extends PartialType(PickType(User, ['is_enabled'])) {}
export class UpdateIsMembershipValidatedDto extends PartialType(
    PickType(User, ['is_membership_validated']),
) {}
