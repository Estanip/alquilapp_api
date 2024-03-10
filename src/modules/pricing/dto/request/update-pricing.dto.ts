import { PickType } from '@nestjs/swagger';
import { CreatePricingDto } from './create-pricing.dto';

export class UpdateDto extends PickType(CreatePricingDto, ['price']) {}
export class UpdateValidateUntilDto extends PickType(CreatePricingDto, ['validate_until']) {}
