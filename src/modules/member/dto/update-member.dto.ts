import { PartialType, PickType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';

export class UpdatePhoneNumberMemberDto extends PartialType(
    PickType(CreateMemberDto, ['phone_number']),
) {}

export class UpdateEmailMemberDto extends PartialType(PickType(CreateMemberDto, ['email'])) {}

export class UpdateIdentificationNumberMemberDto extends PartialType(
    PickType(CreateMemberDto, ['identification_number']),
) {}

export class UpdateBirthDateMemberDto extends PartialType(
    PickType(CreateMemberDto, ['birth_date']),
) {}

export class UpdateNameMemberDto extends PartialType(
    PickType(CreateMemberDto, ['first_name', 'last_name']),
) {}

export class UpdateStatusMemberDto extends PartialType(PickType(CreateMemberDto, ['is_enabled'])) {}
