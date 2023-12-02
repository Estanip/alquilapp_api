import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength, IsBoolean } from 'class-validator';

export class CreateMemberDto {
    @ApiProperty({ example: 'test@test.com' })
    @IsEmail()
    @IsString()
    @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        message: 'Invalid email format',
    })
    readonly email: string;

    @ApiProperty({ example: 'Carlos' })
    @IsString()
    readonly first_name: string;

    @ApiProperty({ example: 'Perez' })
    @IsString()
    readonly last_name: string;

    @ApiProperty({ example: '11111111' })
    @MinLength(7, {
        message: 'At least 7 characters',
    })
    @MaxLength(8, {
        message: 'Maximum 8 characters',
    })
    @IsString()
    readonly identification_number: string;

    @ApiProperty({ example: '2914627488' })
    @Matches(/^[A-Z0-9]{10}$/, {
        message: 'Invalid phone number format',
    })
    @IsString()
    readonly phone_number: string;

    @ApiProperty({ example: '1988-08-24' })
    readonly birth_date: Date;

    @ApiProperty({ example: false })
    @IsBoolean()
    readonly is_enabled: boolean;
}
