import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Player } from '../entities/player.entity';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';

export class CreateReservationDto {
    @ApiProperty({ example: '1988-08-24' })
    readonly date: Date;

    @ApiProperty({ example: '18:00' })
    @IsString()
    @MaxLength(5)
    @MinLength(5)
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid time format',
    })
    readonly from: string;

    @ApiProperty({ example: '18:00' })
    @IsString()
    @MaxLength(5)
    @MinLength(5)
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid time format',
    })
    readonly to: string;

    @ApiProperty({ example: 2 })
    @IsObjectId()
    readonly court: CourtNumbers;

    @ApiProperty({ example: Player })
    readonly players: Player[];

    @ApiProperty({ example: 500 })
    @IsOptional()
    readonly total_price: number;
}
