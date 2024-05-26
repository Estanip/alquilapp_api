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
import { dateRegExp, emailRegExp, passwordRegExp } from 'src/constants/regexp';
import { MembershipTypes } from 'src/modules/member/interfaces';

export class RegisterDto {
  @ApiProperty({ description: 'User email', example: 'test@test.com' })
  @IsNotEmpty()
  @IsEmail()
  @Matches(emailRegExp, {
    message: 'Invalid email format',
  })
  readonly email: string;

  @ApiProperty({ description: 'User password', example: 'Test123456' })
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegExp, {
    message: 'Invalid password format',
  })
  @MinLength(8, {
    message: 'At least 8 characters',
  })
  @MaxLength(50, { message: 'Max 50 characters' })
  readonly password: string;

  @ApiProperty({ description: 'User First Name', example: 'Carlos' })
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @ApiProperty({ description: 'User Last Name', example: 'Perez' })
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @ApiProperty({ description: 'User ID number', example: '11111111' })
  @IsNotEmpty()
  @MinLength(7, {
    message: 'At least 7 characters',
  })
  @MaxLength(8, {
    message: 'Maximum 8 characters',
  })
  @IsString()
  readonly identification_number: string;

  @ApiProperty({ description: 'User Phone Number', example: '2912233444' })
  @IsNotEmpty()
  @MinLength(10, {
    message: 'At least 10 characters',
  })
  @IsString()
  readonly phone_number: string;

  @ApiProperty({ description: 'User Birthdate', example: '1988-08-24' })
  @IsDateString()
  @Matches(dateRegExp, {
    message: 'Invalid birth_date format aaaa-mm-dd',
  })
  readonly birth_date: string;

  @ApiProperty({
    description: 'User Membership Type',
    example: 'SOCIO',
    enum: MembershipTypes,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(MembershipTypes, {
    message: 'Not valid membership type',
  })
  readonly membership_type: MembershipTypes;

  @ApiProperty({ description: 'User access validation', default: false })
  @IsBoolean()
  @IsOptional()
  readonly is_enabled: boolean;

  @ApiProperty({ description: 'User membership validation', default: false })
  @IsBoolean()
  @IsOptional()
  readonly is_membership_validated: boolean;
}
