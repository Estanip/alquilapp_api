import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateDateReservationDto extends PartialType(
    PickType(CreateReservationDto, ['date']),
) {}

export class UpdateFromToReservationDto extends PartialType(
    PickType(CreateReservationDto, ['from', 'to']),
) {}

export class UpdatePlayersReservationDto extends PartialType(
    PickType(CreateReservationDto, ['players']),
) {}

export class UpdateCourtReservationDto extends PartialType(
    PickType(CreateReservationDto, ['court']),
) {}
