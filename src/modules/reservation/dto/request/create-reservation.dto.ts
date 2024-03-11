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
import { CourtNumbers } from 'src/modules/court/interfaces/court.interfaces';
import { IPlayer } from '../../interfaces/player.interfaces';
import { PlayerSchema } from '../../schemas/PlayerSchema';

export class CreateReservationDtoRequest {
    @ApiProperty({ example: '1988-08-24' })
    readonly date: string;

    @ApiProperty({ example: '65b915f173f139e61fF1d5e18' })
    @IsString()
    readonly owner_id: string;

    @ApiProperty({ example: '18:00' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(5)
    @MinLength(5)
    @Matches(timeRegExp, {
        message: 'Invalid time format',
    })
    readonly from: string;
    readonly to?: string;

    @ApiProperty({ example: 2 })
    @IsPositive()
    @IsNumber({}, { message: 'Court must be a number between 1 & 5' })
    readonly court: CourtNumbers;

    @IsNumber()
    @IsOptional()
    total_price: number;

    @ApiProperty({ example: PlayerSchema })
    @IsArray()
    readonly players: IPlayer[];
}
