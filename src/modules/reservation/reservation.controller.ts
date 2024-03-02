import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateReservationDto } from './dto/request/create-reservation.dto';
import {
    UpdateCourtDto,
    UpdateDateDto,
    UpdateFromToDto,
    UpdatePlayersDto,
} from './dto/request/update-reservation.dto';
import { ReservationService } from './reservation.service';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Post()
    @ApiBody({ type: CreateReservationDto })
    @ApiOkResponse({
        description: 'Successful response reservation/*  */ created',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationService.create(createReservationDto);
    }

    @Get()
    @ApiOkResponse({
        description: 'Successful response get reservations',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    getAll(@Query('court') court: number, @Query('date') date: string) {
        if (court && date) return this.reservationService.getByDateAndCourt(court, date);
        else return this.reservationService.getAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Successful response get reservation by id',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id: string) {
        return this.reservationService.getOne(id);
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

    @Patch('date/:id')
    updateDate(@Param('id') id: string, @Body() UpdateDateDto: UpdateDateDto) {
        return this.reservationService.updateDate(id, UpdateDateDto);
    }

    @Patch('from_to/:id')
    updateFromTo(@Param('id') id: string, @Body() UpdateFromToDto: UpdateFromToDto) {
        return this.reservationService.updateFromTo(id, UpdateFromToDto);
    }

    @Patch('court/:id')
    updateCourt(@Param('id') id: string, @Body() updateCourtReservationDto: UpdateCourtDto) {
        return this.reservationService.updateCourt(id, updateCourtReservationDto);
    }

    @Patch('players/:id')
    updatePlayers(@Param('id') id: string, @Body() updatePlayersReservationDto: UpdatePlayersDto) {
        return this.reservationService.updatePlayers(id, updatePlayersReservationDto);
    }
}
