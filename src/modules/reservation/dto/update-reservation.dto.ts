import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateDateDto extends PartialType(PickType(CreateReservationDto, ['date'])) {}

export class UpdateFromToDto extends PartialType(PickType(CreateReservationDto, ['from', 'to'])) {}

export class UpdatePlayersDto extends PartialType(PickType(CreateReservationDto, ['players'])) {}

export class UpdateCourtDto extends PartialType(PickType(CreateReservationDto, ['court'])) {}
