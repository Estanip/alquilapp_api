import { HttpStatus, Injectable } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateReservationDtoRequest } from './dto/request/create-reservation.dto';
import { UpdateReservationDtoRequest } from './dto/request/update-reservation.dto';
import { AvailavilitiesResponseDto } from './dto/response/availability.dto';
import { ByOwnerResponseDto } from './dto/response/by_owner.dto';
import { ReservationsResponseDto } from './dto/response/index.dto';
import { IReservationDocument, TReservationCollection } from './interfaces/reservation.interfaces';
import { ReservationRepository } from './reservation.repository';
import { ReservationValidator } from './utils/validators';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly reservationValidator: ReservationValidator,
    ) {}

    async create(data: CreateReservationDtoRequest) {
        data = (await this.reservationValidator._validateAndSet(
            data,
        )) as CreateReservationDtoRequest;
        data = { ...data, date: data.date.substring(0, 10) };
        await this.reservationRepository.create(data);
        return new SuccessResponse(HttpStatus.CREATED, 'Reservation successfully created');
    }

    async getAll() {
        const data = (await this.reservationRepository.findAllWithPopulate(
            'players.user',
            'first_name last_name membership_type',
        )) as TReservationCollection;
        return new SuccessResponse(
            HttpStatus.OK,
            'List of reservations',
            ReservationsResponseDto.getAll(data),
        );
    }

    async getByDateAndCourt(court: number, date: string) {
        const formatedDate = `${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(0, 2)}`;
        const data = (await this.reservationRepository.findAll({
            court,
            date: formatedDate,
        })) as TReservationCollection;

        return new SuccessResponse(
            HttpStatus.OK,
            'Reservations found',
            AvailavilitiesResponseDto.toResponse(data),
        );
    }

    async getByOwnerId(id: string) {
        const data = (await this.reservationRepository.findAllWithPopulate(
            'players.user',
            'first_name last_name membership_type',
            {
                owner_id: id,
            },
            'date',
        )) as TReservationCollection;
        return new SuccessResponse(
            HttpStatus.OK,
            'Reservations found',
            ByOwnerResponseDto.toResponse(data),
        );
    }

    async getById(id: string) {
        const data = (await this.reservationRepository.findById(id, true)) as IReservationDocument;
        return new SuccessResponse(
            HttpStatus.OK,
            'Reservation found',
            ReservationsResponseDto.getOne(data),
        );
    }

    async updateOne(id: string, data: UpdateReservationDtoRequest, editing: boolean = true) {
        data = (await this.reservationValidator._validateAndSet(
            data,
            editing,
        )) as UpdateReservationDtoRequest;
        data = { ...data, date: data.date.substring(0, 10) };
        await this.reservationRepository.findByIdAndUpdate(id, data);
        return new SuccessResponse(HttpStatus.OK, 'Reservation successffuly updated');
    }

    async remove(id: string) {
        await this.reservationRepository.deleteById(id);
        return new SuccessResponse(HttpStatus.OK, 'Reservation successfully removed');
    }
}
