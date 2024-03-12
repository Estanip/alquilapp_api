import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';
import { CourtNumbers } from 'src/modules/court/interfaces/court.interfaces';
import { MembershipTypes } from 'src/modules/member/interfaces/member.interfaces';
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
    @IsString()
    readonly validate_until: string;

    @ApiProperty({ example: '$' })
    @IsOptional()
    readonly currency: CurrencyTypes.PESOS_ARG;
}
