import { ApiProperty, PickType } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';
import { IPlayer } from 'src/modules/users/modules/player/interfaces';
import { PlayerSchema } from 'src/modules/users/modules/player/schemas';
import { CreateReservationDtoRequest } from './create-reservation.dto';

export class UpdateReservationDtoRequest extends PickType(CreateReservationDtoRequest, [
    'date',
    'court',
    'from',
    'to',
    'total_price',
]) {
    @ApiProperty({ example: PlayerSchema })
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(4)
    readonly players: IPlayer[];
}
