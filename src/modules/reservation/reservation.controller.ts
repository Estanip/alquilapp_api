import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateReservationDtoRequest } from './dto/request/create-reservation.dto';
import { UpdateReservationDtoRequest } from './dto/request/update-reservation.dto';
import { ReservationService } from './reservation.service';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiBody({ type: CreateReservationDtoRequest })
  @ApiOkResponse({
    description: 'Successful response reservation/*  */ created',
    type: SuccessResponse,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateReservationDtoRequest) {
    return this.reservationService.create(data);
  }

  @Get()
  @ApiOkResponse({
    description: 'Successful response get reservations',
    type: SuccessResponse,
  })
  @HttpCode(HttpStatus.OK)
  getAll(@Query('court') court?: number, @Query('date') date?: string) {
    if (court && date) return this.reservationService.getByDateAndCourt(court, date);
    else return this.reservationService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successful response get reservation by id',
    type: SuccessResponse,
  })
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string) {
    return this.reservationService.getById(id);
  }

  @Get('owner/:id')
  @ApiOkResponse({
    description: 'Successful response get reservation by owner id',
    type: SuccessResponse,
  })
  @HttpCode(HttpStatus.OK)
  getByOwner(@Param('id') id: string) {
    return this.reservationService.getByOwnerId(id);
  }

  @Get('date/owner/:id')
  @ApiOkResponse({
    description: 'Successful response get reservation by owner id',
    type: SuccessResponse,
  })
  @HttpCode(HttpStatus.OK)
  getByOwnerAndDate(@Param('id') id: string) {
    return this.reservationService.getByOwnerIdAndDate(id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Successful response member removed',
    type: SuccessResponse,
  })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() data: UpdateReservationDtoRequest) {
    return this.reservationService.updateOne(id, data);
  }
}
