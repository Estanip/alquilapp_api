import { PartialType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateDateDto extends PartialType(PickType(CreateReservationDto, ['date'])) {}

export class UpdateFromToDto extends PartialType(PickType(CreateReservationDto, ['from'])) {}

export class UpdatePlayersDto extends PartialType(PickType(CreateReservationDto, ['players'])) {}

export class UpdateCourtDto extends PartialType(PickType(CreateReservationDto, ['court'])) {}
