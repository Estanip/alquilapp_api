import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CourtNumbers } from 'src/modules/court/interfaces';
import { MembershipTypes } from 'src/modules/member/interfaces';
import { CurrencyTypes } from '../../interfaces';

export class CreatePricingDto {
  @ApiProperty({
    description: 'Pricing associated with a specific membership type',
    example: 'SOCIO',
    enum: MembershipTypes,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(MembershipTypes)
  readonly membership_type: MembershipTypes;

  @ApiProperty({ description: 'Pricing associated with a specific court', example: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @Max(20)
  @IsNumber({}, { message: 'Court must be a number' })
  readonly court: CourtNumbers;

  @ApiProperty({ description: 'Price for an specific court & membership', example: 50 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @ApiProperty({ description: 'Price expiration date', example: '2023-12-31' })
  @IsNotEmpty()
  @IsString()
  readonly validate_until: string;

  @ApiProperty({
    description: 'Price currency type',
    example: '$',
    default: CurrencyTypes.PESOS_ARG,
    enum: CurrencyTypes,
  })
  @IsOptional()
  @IsEnum(CurrencyTypes)
  readonly currency: CurrencyTypes.PESOS_ARG;
}
