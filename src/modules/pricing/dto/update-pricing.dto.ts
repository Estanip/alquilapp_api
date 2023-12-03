import { CreatePricingDto } from './create-pricing.dto';
import { PickType, PartialType } from '@nestjs/swagger';

export class UpdatePriceDto extends PartialType(PickType(CreatePricingDto, ['price'])) {}
export class UpdateValidateUntilDto extends PartialType(
    PickType(CreatePricingDto, ['validate_until']),
) {}
