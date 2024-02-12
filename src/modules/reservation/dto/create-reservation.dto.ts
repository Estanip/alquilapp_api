import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { timeRegExp } from 'src/constants/regexp';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { PlayerSchema } from '../schemas/PlayerSchema';

export class CreateReservationDto {
    @ApiProperty({ example: '1988-08-24' })
    readonly date: Date;

    @ApiProperty({ example: '18:00' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(5)
    @MinLength(5)
    @Matches(timeRegExp, {
        message: 'Invalid time format',
    })
    readonly from: string;

    @ApiProperty({ example: '18:00' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(5)
    @MinLength(5)
    @Matches(timeRegExp, {
        message: 'Invalid time format',
    })
    readonly to: string;

    @ApiProperty({ example: 2 })
    @IsPositive()
    @IsNumber({}, { message: 'Court must be a number between 1 & 5' })
    readonly court: CourtNumbers;

    @ApiProperty({ example: 100 })
    @IsPositive()
    @IsOptional()
    @IsNumber({}, { message: 'Court must be a number' })
    total_price: number;

    @ApiProperty({ example: PlayerSchema })
    @IsArray()
    readonly players: PlayerSchema[];
}
