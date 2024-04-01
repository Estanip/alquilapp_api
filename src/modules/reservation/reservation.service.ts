import { HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateReservationDtoRequest } from './dto/request/create-reservation.dto';
import { UpdateReservationDtoRequest } from './dto/request/update-reservation.dto';
import { AvailavilitiesResponseDto } from './dto/response/availability.dto';
import { ByOwnerAndDateResponseDto, ByOwnerResponseDto } from './dto/response/by_owner.dto';
import { ReservationsResponseDto } from './dto/response/index.dto';
import { IReservationDocument } from './interfaces';
import { ReservationRepository } from './reservation.repository';
import { IReservationSchemaWithPlayerPopulate, ReservationSchema } from './schemas';
import { ReservationValidator } from './utils/validators';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly reservationValidator: ReservationValidator,
    ) {}

    async create(data: CreateReservationDtoRequest) {
        let dataAsSchema = {
            ...data,
            owner_id: new Types.ObjectId(data.owner_id),
            players: data.players.map((player) => {
                return {
                    user_id: new Types.ObjectId(player.user_id),
                };
            }),
        } as ReservationSchema;
        dataAsSchema = (await this.reservationValidator._validateAndSet(
            dataAsSchema,
        )) as ReservationSchema;
        dataAsSchema = { ...dataAsSchema, date: data.date.substring(0, 10) };
        await this.reservationRepository.create(dataAsSchema);
        return new SuccessResponse(HttpStatus.CREATED, 'Reservation successfully created');
    }

    async getAll() {
        const data = (await this.reservationRepository.findAllWithPopulate(
            'players.user_id',
            'first_name last_name membership_type',
        )) as IReservationSchemaWithPlayerPopulate[];

        return new SuccessResponse(
            HttpStatus.OK,
            'List of reservations',
            ReservationsResponseDto.getAll(data),
        );
    }

    async getByDateAndCourt(court: number, date: string) {
        const formatedDate = `${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(0, 2)}`;
        const data = await this.reservationRepository.findAll({
            court,
            date: formatedDate,
        });
        return new SuccessResponse(
            HttpStatus.OK,
            'Reservations found',
            AvailavilitiesResponseDto.toResponse(data),
        );
    }

    async getByOwnerId(id: string) {
        const data = (await this.reservationRepository.findAllWithPopulate(
            'players.user_id',
            'first_name last_name membership_type',
            {
                owner_id: new Types.ObjectId(id),
            },
            'date',
        )) as IReservationSchemaWithPlayerPopulate[];
        return new SuccessResponse(
            HttpStatus.OK,
            'Reservations found',
            ByOwnerResponseDto.toResponse(data),
        );
    }

    async getByOwnerIdAndDate(id: string) {
        const data = (await this.reservationRepository.findOne({
            owner_id: new Types.ObjectId(id),
            date: new Date().toISOString()?.substring(0, 10),
        })) as IReservationDocument;
        return new SuccessResponse(
            HttpStatus.OK,
            'Reservations found',
            ByOwnerAndDateResponseDto.toResponse(data),
        );
    }

    async getById(id: string) {
        const data = (await this.reservationRepository.findOneWithPopulate(
            'players.user_id',
            'first_name last_name membership_type',
            {
                _id: new Types.ObjectId(id),
            },
            'date',
        )) as IReservationSchemaWithPlayerPopulate;
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
        await this.reservationRepository.findByIdAndUpdate(new Types.ObjectId(id), data);
        return new SuccessResponse(HttpStatus.OK, 'Reservation successffuly updated');
    }

    async remove(id: string) {
        await this.reservationRepository.deleteById(new Types.ObjectId(id));
        return new SuccessResponse(HttpStatus.OK, 'Reservation successfully removed');
    }
}
