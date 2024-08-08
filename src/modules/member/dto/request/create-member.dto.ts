import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmailRegExp, UserIdRegExp } from 'src/constants/regexp';
import { MembershipTypes } from '../../interfaces';

export class CreateMemberDto {
  @ApiProperty({ description: 'Member email', example: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  @Matches(EmailRegExp, {
    message: 'Invalid email format',
  })
  readonly email: string;

  @ApiProperty({ description: 'Member ID', example: '65b80c61be55328f71fdaebc' })
  @IsString()
  @IsOptional()
  @Matches(UserIdRegExp, {
    message: 'Invalid id format',
  })
  readonly user_id: string;

  @ApiProperty({ description: 'Member First Name', example: 'Carlos' })
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @ApiProperty({ description: 'Member Last Name', example: 'Perez' })
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @ApiProperty({ description: 'Member ID number', example: '11111111' })
  @IsNotEmpty()
  @MinLength(7, {
    message: 'At least 7 characters',
  })
  @MaxLength(8, {
    message: 'Maximum 8 characters',
  })
  @IsString()
  readonly identification_number: string;

  @ApiProperty({ description: 'Member phone number', example: '2912233444' })
  @IsNotEmpty()
  @MinLength(10, {
    message: 'At least 10 characters',
  })
  @IsString()
  readonly phone_number: string;

  @ApiProperty({ description: 'Member membership type', example: 'SOCIO', enum: MembershipTypes })
  @IsNotEmpty()
  @IsString()
  @IsEnum(MembershipTypes, {
    message: 'Not valid membership type',
  })
  readonly membership_type: MembershipTypes;

  @ApiProperty({ description: 'Member birthdate', example: '1988-08-24' })
  @IsNotEmpty()
  @IsDateString()
  readonly birth_date: string;

  @ApiProperty({ description: 'Member access validation', default: false })
  @IsBoolean()
  @IsOptional()
  readonly is_enabled: boolean;
}
