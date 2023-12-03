import {
    Injectable,
    HttpStatus,
    BadRequestException,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
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
            return new SuccessResponse(HttpStatus.OK, 'List of reservations', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findOne(id: string) {
        try {
            const data: IReservationDocument = await this.reservationModel.findById(id);
            if (!data) throw new NotFoundException('Reservation not found');
            return new SuccessResponse(HttpStatus.OK, 'Reservation found', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateDate(id: string, updateDateReservationDto: UpdateDateReservationDto) {
        try {
            if (!updateDateReservationDto.hasOwnProperty('date'))
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.reservationModel.findByIdAndUpdate(id, updateDateReservationDto);
            return new SuccessResponse(HttpStatus.OK, 'Reservation date successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateFromTo(id: string, updateFromToReservationDto: UpdateFromToReservationDto) {
        try {
            if (
                !updateFromToReservationDto.hasOwnProperty('from') ||
                !updateFromToReservationDto.hasOwnProperty('to')
            )
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.reservationModel.findByIdAndUpdate(id, updateFromToReservationDto);
            return new SuccessResponse(HttpStatus.OK, 'Reservation from/to successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updatePlayers(id: string, updatePlayersReservationDto: UpdatePlayersReservationDto) {
        try {
            if (!updatePlayersReservationDto.hasOwnProperty('players'))
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.reservationModel.findByIdAndUpdate(id, updatePlayersReservationDto);
            return new SuccessResponse(HttpStatus.OK, 'Reservation players successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateCourt(id: string, updateCourtReservationDto: UpdateCourtReservationDto) {
        try {
            if (!updateCourtReservationDto.hasOwnProperty('court'))
                throw new PreconditionFailedException('Field/s must not be empty');
            await this.reservationModel.findByIdAndUpdate(id, updateCourtReservationDto);
            return new SuccessResponse(HttpStatus.OK, 'Reservation court successffuly updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async remove(id: string) {
        try {
            await this.reservationModel.findByIdAndDelete(id);
            return new SuccessResponse(HttpStatus.OK, 'Reservation successfully removed');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
