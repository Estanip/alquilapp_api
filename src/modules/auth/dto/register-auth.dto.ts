import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    IsBoolean,
    IsIn,
    IsNotEmpty,
    IsPhoneNumber,
    IsDateString,
} from 'class-validator';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';

export class RegisterDto {
    @ApiProperty({ example: 'test@test.com' })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        message: 'Invalid email format',
    })
    readonly email: string;

    @ApiProperty({ example: 'Test123456' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
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
    @IsPhoneNumber()
    @IsNotEmpty()
    @MinLength(10, {
        message: 'At least 10 characters',
    })
    @MaxLength(13, {
        message: 'Maximum 13 characters',
    })
    @IsString()
    readonly phone_number: string;

    @ApiProperty({ example: '1988-08-24' })
    @IsDateString()
    @Matches(/^\d\d\d\d-\d\d-\d\d$/i, {
        message: 'Invalid birth_date format aaaa-mm-dd',
    })
    readonly birth_date: Date;

    @ApiProperty({ example: 'SOCIO' })
    @IsNotEmpty()
    @IsString()
    @IsIn(['SOCIO', 'NO SOCIO', 'ABONADO'], {
        message: 'Not valid membership type',
    })
    readonly membership_type: MembershipTypes;

    @ApiProperty({ example: false })
    @IsBoolean()
    readonly is_enabled: boolean;
}
