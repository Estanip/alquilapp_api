import {
    Injectable,
    HttpStatus,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import {
    UpdateCourtDto,
    UpdateDateDto,
    UpdateFromToDto,
    UpdatePlayersDto,
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
        await new this.reservationModel(createReservationDto).save();
        return new SuccessResponse(HttpStatus.CREATED, 'Reservation successfully created');
    }

    async findAll() {
        const data: TReservationCollection = await this.reservationModel.find();
        return new SuccessResponse(HttpStatus.OK, 'List of reservations', data);
    }

    async findOne(id: string) {
        const data: IReservationDocument = await this.reservationModel.findById(id);
        if (!data) throw new NotFoundException('Reservation not found');
        return new SuccessResponse(HttpStatus.OK, 'Reservation found', data);
    }

    async updateDate(id: string, UpdateDateDto: UpdateDateDto) {
        if (!UpdateDateDto.hasOwnProperty('date'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.reservationModel.findByIdAndUpdate(id, UpdateDateDto);
        return new SuccessResponse(HttpStatus.OK, 'Reservation date successffuly updated');
    }

    async updateFromTo(id: string, UpdateFromToDto: UpdateFromToDto) {
        if (
            !UpdateFromToDto.hasOwnProperty('from') ||
            !UpdateFromToDto.hasOwnProperty('to')
        )
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.reservationModel.findByIdAndUpdate(id, UpdateFromToDto);
        return new SuccessResponse(HttpStatus.OK, 'Reservation from/to successffuly updated');
    }

    async updatePlayers(id: string, updatePlayersReservationDto: UpdatePlayersDto) {
        if (!updatePlayersReservationDto.hasOwnProperty('players'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.reservationModel.findByIdAndUpdate(id, updatePlayersReservationDto);
        return new SuccessResponse(HttpStatus.OK, 'Reservation players successffuly updated');
    }

    async updateCourt(id: string, updateCourtReservationDto: UpdateCourtDto) {
        if (!updateCourtReservationDto.hasOwnProperty('court'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.reservationModel.findByIdAndUpdate(id, updateCourtReservationDto);
        return new SuccessResponse(HttpStatus.OK, 'Reservation court successffuly updated');
    }

    async remove(id: string) {
        await this.reservationModel.findByIdAndDelete(id);
        return new SuccessResponse(HttpStatus.OK, 'Reservation successfully removed');
    }
}
