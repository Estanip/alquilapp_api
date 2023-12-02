import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Types } from 'mongoose';
import { Player } from '../entities/player.entity';

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

    @ApiProperty({ example: new Types.ObjectId() })
    @IsObjectId()
    readonly court: string;

    @ApiProperty({ example: Player })
    readonly players: Player[];

    @ApiProperty({ example: new Types.ObjectId() })
    @IsObjectId()
    readonly total_price: number;
}
