import { Injectable, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import {
    UpdateCourtReservationDto,
    UpdateDateReservationDto,
    UpdateFromToReservationDto,
    UpdatePlayersReservationDto,
} from './dto/update-reservation.dto';
import { ReservationModel } from './models/reservation.model';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { IReservationDocument, TReservationCollection } from './interfaces/reservation.interfaces';

@Injectable()
export class ReservationService {
    private reservationModel: typeof ReservationModel;

    constructor() {
        this.reservationModel = ReservationModel;
    }

    async create(createReservationDto: CreateReservationDto) {
        try {
            await new this.reservationModel(createReservationDto).save();
            return new SuccessResponse(HttpStatus.CREATED, 'Reservation successfully created');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findAll() {
        try {
            const data: TReservationCollection = await this.reservationModel.find();
            return new SuccessResponse(HttpStatus.CREATED, 'List of reservations', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findOne(id: string) {
        try {
            const data: IReservationDocument = await this.reservationModel.findById(id);
            if (!data) throw new NotFoundException('Reservation not found');
            return new SuccessResponse(HttpStatus.CREATED, 'Reservation found', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateDate(id: string, updateDateReservationDto: UpdateDateReservationDto) {
        try {
            await this.reservationModel.findByIdAndUpdate(id, updateDateReservationDto);
            return new SuccessResponse(HttpStatus.CREATED, 'Reservation date successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateFromTo(id: string, updateFromToReservationDto: UpdateFromToReservationDto) {
        try {
            await this.reservationModel.findByIdAndUpdate(id, updateFromToReservationDto);
            return new SuccessResponse(
                HttpStatus.CREATED,
                'Reservation from/to successffuly updated',
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updatePlayers(id: string, updatePlayersReservationDto: UpdatePlayersReservationDto) {
        try {
            await this.reservationModel.findByIdAndUpdate(id, updatePlayersReservationDto);
            return new SuccessResponse(
                HttpStatus.CREATED,
                'Reservation players successffuly updated',
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateCourt(id: string, updateCourtReservationDto: UpdateCourtReservationDto) {
        try {
            await this.reservationModel.findByIdAndUpdate(id, updateCourtReservationDto);
            return new SuccessResponse(
                HttpStatus.CREATED,
                'Reservation court successffuly updated',
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async remove(id: string) {
        try {
            await this.reservationModel.findByIdAndRemove(id);
            return new SuccessResponse(HttpStatus.CREATED, 'Reservation successfully removed');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
