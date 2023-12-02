import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsBoolean, Min, Max, IsNumber } from 'class-validator';

export class CreateCourtDto {
    @ApiProperty({ example: '18:30' })
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid hour format',
    })
    readonly available_from: string;

    @ApiProperty({ example: '19:00' })
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid hour format',
    })
    readonly available_until: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @Min(1)
    @Max(5)
    readonly court_number: number;

    @ApiProperty({ example: 'Clay' })
    @IsString()
    readonly surface_type: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    readonly is_enabled: boolean;
}
