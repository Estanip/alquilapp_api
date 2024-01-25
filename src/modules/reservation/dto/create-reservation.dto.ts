import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { Player } from '../entities/player.entity';

export class CreateReservationDto {
    @ApiProperty({ example: '1988-08-24' })
    readonly date: Date;

    @ApiProperty({ example: '18:00' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(5)
    @MinLength(5)
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid time format',
    })
    readonly from: string;

    @ApiProperty({ example: '18:00' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(5)
    @MinLength(5)
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid time format',
    })
    readonly to: string;

    @ApiProperty({ example: 2 })
    @IsPositive()
    @IsNumber({}, { message: 'Court must be a number between 1 & 5' })
    readonly court: CourtNumbers;

    @ApiProperty({ example: Player })
    @IsArray()
    readonly players: Player[];
}
