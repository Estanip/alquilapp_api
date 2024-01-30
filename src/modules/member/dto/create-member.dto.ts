import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';

export class CreateMemberDto {
    @ApiProperty({ example: 'test@test.com' })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        message: 'Invalid email format',
    })
    readonly email: string;

    @ApiProperty({ example: '65b80c61be55328f71fdaebc' })
    @IsString()
    @IsOptional()
    @Matches(/^[a-f\d]{24}$/i, {
        message: 'Invalid id format',
    })
    readonly user_id: string;

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

    @ApiProperty({ example: '+2912233444' })
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

    @ApiProperty({ example: 'SOCIO' })
    @IsNotEmpty()
    @IsString()
    @IsIn(['SOCIO', 'NO SOCIO', 'ABONADO'], {
        message: 'Not valid membership type',
    })
    readonly membership_type: MembershipTypes;

    @ApiProperty({ example: '1988-08-24' })
    @IsNotEmpty()
    @IsDateString()
    readonly birth_date: Date;

    @ApiProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    readonly is_enabled: boolean;
}
