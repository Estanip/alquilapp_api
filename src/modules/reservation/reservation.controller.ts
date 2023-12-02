import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import {
    UpdateCourtReservationDto,
    UpdateDateReservationDto,
    UpdateFromToReservationDto,
    UpdatePlayersReservationDto,
} from './dto/update-reservation.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';

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
    findAll() {
        return this.reservationService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Successful response get reservation by id',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.reservationService.findOne(id);
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
    updateDate(
        @Param('id') id: string,
        @Body() updateDateReservationDto: UpdateDateReservationDto,
    ) {
        return this.reservationService.updateDate(id, updateDateReservationDto);
    }

    @Patch('from_to/:id')
    updateFromTo(
        @Param('id') id: string,
        @Body() updateFromToReservationDto: UpdateFromToReservationDto,
    ) {
        return this.reservationService.updateFromTo(id, updateFromToReservationDto);
    }

    @Patch('court/:id')
    updateCourt(
        @Param('id') id: string,
        @Body() updateCourtReservationDto: UpdateCourtReservationDto,
    ) {
        return this.reservationService.updateCourt(id, updateCourtReservationDto);
    }

    @Patch('players/:id')
    updatePlayers(
        @Param('id') id: string,
        @Body() updatePlayersReservationDto: UpdatePlayersReservationDto,
    ) {
        return this.reservationService.updatePlayers(id, updatePlayersReservationDto);
    }
}
