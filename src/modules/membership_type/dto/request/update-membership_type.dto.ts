import { PickType } from '@nestjs/swagger';
import { CreateMembershipTypeDto } from './create-membership_type.dto';

export class UpdateStatusDto extends PickType(CreateMembershipTypeDto, ['is_enabled']) {}
