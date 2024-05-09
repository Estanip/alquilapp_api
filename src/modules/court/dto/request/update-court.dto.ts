import { PickType } from '@nestjs/swagger';
import { CreateCourtDto } from './create-court.dto';

export class UpdateCourtDtoRequest extends PickType(CreateCourtDto, [
  'available_from',
  'available_until',
  'surface_type',
  'is_enabled',
]) {}

export class UpdateAvailabilityDto extends PickType(CreateCourtDto, [
  'available_from',
  'available_until',
]) {}

export class UpdateNumberDto extends PickType(CreateCourtDto, ['court_number']) {}

export class UpdateSurfaceDto extends PickType(CreateCourtDto, ['surface_type']) {}

export class UpdateStatusDto extends PickType(CreateCourtDto, ['is_enabled']) {}
