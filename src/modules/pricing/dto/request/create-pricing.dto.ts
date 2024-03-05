import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';
import { CurrencyTypes } from '../../interfaces/pricing.interfaces';

export class CreatePricingDto {
    @ApiProperty({ example: 'SOCIO' })
    @IsNotEmpty()
    @IsString()
    readonly membership_type: MembershipTypes;

    @ApiProperty({ example: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Min(0)
    @Max(5)
    @IsNumber({}, { message: 'Court must be a number' })
    readonly court: CourtNumbers;

    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly price: number;

    @ApiProperty({ example: '2023-12-31' })
    @IsNotEmpty()
    @IsDateString()
    readonly validate_until: Date;

    @ApiProperty({ example: '$' })
    @IsOptional()
    readonly currency: CurrencyTypes.PESOS_ARG;
}
