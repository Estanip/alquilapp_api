import { ApiProperty, PickType } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';
import { Player, PlayerDocument } from 'src/modules/users/modules/player/schemas';
import { CreateReservationDtoRequest } from './create-reservation.dto';

export class UpdateReservationDtoRequest extends PickType(CreateReservationDtoRequest, [
  'date',
  'court',
  'from',
  'to',
  'total_price',
]) {
  @ApiProperty({ example: Player })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  readonly players: PlayerDocument[];
}
