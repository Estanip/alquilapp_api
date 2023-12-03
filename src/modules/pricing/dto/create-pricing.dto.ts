import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CurrencyTypes } from '../entities/pricing.entity';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';

export class CreatePricingDto {
    @ApiProperty({ example: 'SOCIO' })
    @IsString()
    readonly membership_type: MembershipTypes;

    @ApiProperty({ example: 2 })
    @IsObjectId()
    readonly court: CourtNumbers;

    @ApiProperty({ example: 50 })
    @IsNumber()
    @Min(0)
    readonly price: number;

    @ApiProperty({ example: '2023-12-31' })
    readonly validate_until: Date;

    @ApiProperty({ example: '$' })
    @IsOptional()
    readonly currency: CurrencyTypes.PESOS_ARG;
}
