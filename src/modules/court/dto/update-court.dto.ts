import { PartialType, PickType } from '@nestjs/swagger';
import { CreateCourtDto } from './create-court.dto';

export class UpdateAvailabilityDto extends PartialType(
    PickType(CreateCourtDto, ['available_from', 'available_until']),
) {}

export class UpdateCourtNumberDto extends PartialType(PickType(CreateCourtDto, ['court_number'])) {}

export class UpdateCourtSurfaceDto extends PartialType(
    PickType(CreateCourtDto, ['surface_type']),
) {}

export class UpdateCourtStatusDto extends PartialType(PickType(CreateCourtDto, ['is_enabled'])) {}
