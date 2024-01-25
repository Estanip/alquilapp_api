import { PartialType, PickType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';

export class UpdatePhoneNumberDto extends PartialType(
    PickType(CreateMemberDto, ['phone_number']),
) {}

export class UpdateEmailDto extends PartialType(PickType(CreateMemberDto, ['email'])) {}

export class UpdateIdentificationNumberDto extends PartialType(
    PickType(CreateMemberDto, ['identification_number']),
) {}

export class UpdateBirthDateDto extends PartialType(PickType(CreateMemberDto, ['birth_date'])) {}

export class UpdateNameDto extends PartialType(
    PickType(CreateMemberDto, ['first_name', 'last_name']),
) {}

export class UpdateStatusDto extends PartialType(PickType(CreateMemberDto, ['is_enabled'])) {}
