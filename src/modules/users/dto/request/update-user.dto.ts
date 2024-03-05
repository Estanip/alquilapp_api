import { PartialType, PickType } from '@nestjs/swagger';
import { RegisterDto } from 'src/modules/auth/dto/request/register-auth.dto';

export class UpdateIsEnabledDto extends PartialType(PickType(RegisterDto, ['is_enabled'])) {}
export class UpdateIsMembershipValidatedDto extends PartialType(
    PickType(RegisterDto, ['is_membership_validated']),
) {}
