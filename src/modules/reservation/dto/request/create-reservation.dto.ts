import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { timeRegExp } from 'src/constants/regexp';
import { CourtNumbers } from 'src/modules/court/interfaces';

export type TPlayerRequest = {
  user_id: string;
  fee: number;
};

export class CreateReservationDtoRequest {
  @ApiProperty({ description: 'Reservation date', example: '1988-08-24' })
  @IsNotEmpty()
  @IsDateString()
  readonly date: string;

  @ApiProperty({
    description: 'User ID as reservation owner',
    example: '65b915f173f139e61fF1d5e18',
  })
  @IsNotEmpty()
  @IsString()
  readonly owner_id: string;

  @ApiProperty({ description: 'Reservation time', example: '18:00' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  @MinLength(5)
  @Matches(timeRegExp, {
    message: 'Invalid time format',
  })
  readonly from: string;
  readonly to?: string;

  @ApiProperty({ description: 'Court number', example: 2 })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber({}, { message: 'Court must be a number' })
  readonly court: CourtNumbers;

  @ApiProperty({ description: 'Players parts of the reservation' })
  @IsNotEmpty()
  @IsArray()
  readonly players: TPlayerRequest[];

  @ApiProperty({ description: 'Total price', example: 1000 })
  @IsOptional()
  @IsNumber()
  total_price: number;
}
