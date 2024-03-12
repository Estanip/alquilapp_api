import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { dateRegExp, emailRegExp, passwordRegExp } from 'src/constants/regexp';
import { MembershipTypes } from 'src/modules/member/interfaces/member.interfaces';

export class RegisterDto {
    @ApiProperty({ example: 'test@test.com' })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @Matches(emailRegExp, {
        message: 'Invalid email format',
    })
    readonly email: string;

    @ApiProperty({ example: 'Test123456' })
    @IsNotEmpty()
    @IsString()
    @Matches(passwordRegExp, {
        message: 'Invalid password format',
    })
    @MinLength(8, {
        message: 'At least 8 characters',
    })
    readonly password: string;

    @ApiProperty({ example: 'Carlos' })
    @IsNotEmpty()
    @IsString()
    readonly first_name: string;

    @ApiProperty({ example: 'Perez' })
    @IsNotEmpty()
    @IsString()
    readonly last_name: string;

    @ApiProperty({ example: '11111111' })
    @IsNotEmpty()
    @MinLength(7, {
        message: 'At least 7 characters',
    })
    @MaxLength(8, {
        message: 'Maximum 8 characters',
    })
    @IsString()
    readonly identification_number: string;

    @ApiProperty({ example: '2912233444' })
    @IsNotEmpty()
    @MinLength(10, {
        message: 'At least 10 characters',
    })
    @IsString()
    readonly phone_number: string;

    @ApiProperty({ example: '1988-08-24' })
    @IsDateString()
    @Matches(dateRegExp, {
        message: 'Invalid birth_date format aaaa-mm-dd',
    })
    readonly birth_date: string;

    @ApiProperty({ example: 'SOCIO' })
    @IsNotEmpty()
    @IsString()
    @IsIn(['SOCIO', 'NO SOCIO', 'ABONADO'], {
        message: 'Not valid membership type',
    })
    readonly membership_type: MembershipTypes;

    @ApiProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    readonly is_enabled: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    readonly is_membership_validated: boolean;
}
