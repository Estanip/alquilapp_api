import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';
import { IPlayer } from '../../interfaces/player.interfaces';
import { PlayerSchema } from '../../schemas/PlayerSchema';
import { CreateReservationDtoRequest } from './create-reservation.dto';

export class UpdateReservationDtoRequest extends PartialType(
    PickType(CreateReservationDtoRequest, ['date', 'court', 'from']),
) {
    @ApiProperty({ example: PlayerSchema })
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(4)
    readonly players: IPlayer[];
}
