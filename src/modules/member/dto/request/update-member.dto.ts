import { PickType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';

export class UpdatePhoneNumberDto extends PickType(CreateMemberDto, ['phone_number']) {}

export class UpdateEmailDto extends PickType(CreateMemberDto, ['email']) {}

export class UpdateIdentificationNumberDto extends PickType(CreateMemberDto, [
  'identification_number',
]) {}

export class UpdateBirthDateDto extends PickType(CreateMemberDto, ['birth_date']) {}

export class UpdateNameDto extends PickType(CreateMemberDto, ['first_name', 'last_name']) {}

export class UpdateStatusDto extends PickType(CreateMemberDto, ['is_enabled']) {}
