import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { timeRegExp } from 'src/constants/regexp';
import { SurfaceTypes } from '../../interfaces';

export class CreateCourtDto {
  @ApiProperty({ example: '18:30' })
  @IsNotEmpty()
  @IsString()
  @Matches(timeRegExp, {
    message: 'Invalid hour format',
  })
  readonly available_from: string;

  @ApiProperty({ example: '19:00' })
  @IsNotEmpty()
  @IsString()
  @Matches(timeRegExp, {
    message: 'Invalid hour format',
  })
  readonly available_until: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @Min(1)
  @Max(20)
  readonly court_number: number;

  @ApiProperty({ example: 'Clay' })
  @IsNotEmpty()
  @IsString()
  readonly surface_type: SurfaceTypes;

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly is_enabled: boolean;
}
