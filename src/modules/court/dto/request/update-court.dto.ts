import { PickType } from '@nestjs/swagger';
import { CreateCourtDto } from './create-court.dto';

export class UpdateAvailabilityDto extends PickType(CreateCourtDto, [
  'available_from',
  'available_until',
]) {}

export class UpdateNumberDto extends PickType(CreateCourtDto, ['court_number']) {}

export class UpdateSurfaceDto extends PickType(CreateCourtDto, ['surface_type']) {}

export class UpdateStatusDto extends PickType(CreateCourtDto, ['is_enabled']) {}
