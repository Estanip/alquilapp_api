import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    IsBoolean,
    IsNotEmpty,
    IsPhoneNumber,
    IsDateString,
} from 'class-validator';

export class CreateMemberDto {
    @ApiProperty({ example: 'test@test.com' })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        message: 'Invalid email format',
    })
    readonly email: string;

    @ApiProperty({ example: 'Carlos' })
    @IsNotEmpty()
    @IsString()
    readonly first_name: string;

    @ApiProperty({ example: 'Perez' })
    @IsNotEmpty()
    @IsString()
    readonly last_name: string;

    @ApiProperty({ example: '11111111' })
    @MinLength(7, {
        message: 'At least 7 characters',
    })
    @MaxLength(8, {
        message: 'Maximum 8 characters',
    })
    @IsNotEmpty()
    @IsString()
    readonly identification_number: string;

    @ApiProperty({ example: '2914627488' })
    @IsPhoneNumber()
    @Matches(/^[A-Z0-9]{10}$/, {
        message: 'Invalid phone number format',
    })
    @IsNotEmpty()
    @IsString()
    readonly phone_number: string;

    @ApiProperty({ example: '1988-08-24' })
    @IsNotEmpty()
    @IsDateString()
    readonly birth_date: Date;

    @ApiProperty({ example: false })
    @IsBoolean()
    readonly is_enabled: boolean;
}
