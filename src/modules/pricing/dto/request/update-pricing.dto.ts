import { PartialType, PickType } from '@nestjs/swagger';
import { CreatePricingDto } from './create-pricing.dto';

export class UpdateDto extends PartialType(PickType(CreatePricingDto, ['price'])) {}
export class UpdateValidateUntilDto extends PartialType(
    PickType(CreatePricingDto, ['validate_until']),
) {}
