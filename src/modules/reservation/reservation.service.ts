import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SHIFT_DURATION } from 'src/constants/reservations.constants';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CourtRepository } from '../court/court.repository';
import { ICourtDocument } from '../court/interfaces/court.interfaces';
import { IPricingDocument } from '../pricing/interfaces/pricing.interfaces';
import { PricingRepository } from '../pricing/pricing.repository';
import {
    IUserAttributes,
    IUserDocument,
    TUserCollection,
} from '../users/interfaces/user.interface';
import { UserRepository } from '../users/user.repository';
import { CreateReservationDtoRequest } from './dto/request/create-reservation.dto';
import { UpdateReservationDtoRequest } from './dto/request/update-reservation.dto';
import { AvailavilitiesResponseDto } from './dto/response/availability.dto';
import { ByOwnerResponseDto } from './dto/response/by_owner.dto';
import { ReservationsResponseDto } from './dto/response/index.dto';
import { IPlayer } from './interfaces/player.interfaces';
import { IReservationDocument, TReservationCollection } from './interfaces/reservation.interfaces';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly userRepository: UserRepository,
        private readonly courtRepository: CourtRepository,
        private readonly pricingRepository: PricingRepository,
    ) {}

    async create(data: CreateReservationDtoRequest) {
        data = (await this._validateAndSet(data)) as CreateReservationDtoRequest;
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
        data = (await this._validateAndSet(data, editing)) as UpdateReservationDtoRequest;
        data = { ...data, date: data.date.substring(0, 10) };
        await this.reservationRepository.findByIdAndUpdate(id, data);
        return new SuccessResponse(HttpStatus.OK, 'Reservation successffuly updated');
    }

    async remove(id: string) {
        await this.reservationRepository.deleteById(id);
        return new SuccessResponse(HttpStatus.OK, 'Reservation successfully removed');
    }

    async _setPrice(data: CreateReservationDtoRequest | UpdateReservationDtoRequest) {
        for (const player of data.players) {
            const user_membership = (
                (await this.userRepository.findById(player.user.toString(), true)) as IUserDocument
            )?.membership_type;
            const price = (
                (await this.pricingRepository.findOne({
                    court: data.court,
                    membership_type: user_membership,
                })) as IPricingDocument
            )?.price;
            if (price === null || price === undefined)
                throw new NotFoundException('Error when try to get price associated');
            else player.fee = price;
        }
        const total_price = data.players.reduce((acc: number, cur: IPlayer) => {
            return acc + cur.fee;
        }, 0);

        data['total_price'] = total_price;
        return data;
    }

    async _setTo(data: CreateReservationDtoRequest | UpdateReservationDtoRequest) {
        if (!data?.to)
            return {
                ...data,
                to: `${Number(data?.from.substring(0, 2)) + SHIFT_DURATION.ONE_HOUR}:00`,
            };
        return data;
    }

    async _validateAndSet(
        data: CreateReservationDtoRequest | UpdateReservationDtoRequest,
        editing: boolean = false,
    ) {
        await this._validateAvailability(data, editing);
        await this._validatePlayers(data.players, data.date, data.from);
        await this._validateCourt(data.court, data.from);
        data = await this._setPrice(data);
        data = await this._setTo(data);

        return data;
    }

    async _validateAvailability(
        data: CreateReservationDtoRequest | UpdateReservationDtoRequest,
        editing: boolean = false,
    ) {
        const { date, from, court } = data;
        const formatedDate = date.substring(0, 10);
        const reservation = (await this.reservationRepository.findOne(
            {
                date: formatedDate,
                from,
                court,
            },
            false,
        )) as IReservationDocument;
        if (
            reservation &&
            !(
                editing &&
                formatedDate === reservation.date &&
                reservation.from === from &&
                reservation.court &&
                court
            )
        )
            throw new ConflictException('The court shift is taken');
    }

    async _validatePlayers(players: IPlayer[], date: string, from: string) {
        const playersIds = players.map((player: IPlayer) => player.user);
        if (playersIds.some((id: string, index: number) => playersIds.indexOf(id) != index))
            throw new ConflictException('Repeated players');

        const users: TUserCollection = [];
        for (const player of players) {
            users.push(
                (await this.userRepository.findById(
                    player.user.toString(),
                    false,
                )) as IUserDocument,
            );
        }
        if (users.some((user: IUserAttributes) => user === null))
            throw new NotFoundException('User does not exists');
        if (users.some((user: IUserAttributes) => !user.is_enabled))
            throw new NotFoundException('User has not yet been validated');
        // if (users.some((user: IUserAttributes) => !user.is_membership_validated))
        // throw new NotFoundException('User membership has not yet been validated');

        const reservations = (await this.reservationRepository.aggregate([
            {
                $project: {
                    players: 1,
                    from: 1,
                    date: 1,
                },
            },
            {
                $match: {
                    formattedDate: date.substring(0, 10),
                    'players.user': { $in: playersIds },
                },
            },
        ])) as TReservationCollection;

        if (reservations.length) {
            reservations.map((reservation) => {
                if (
                    Number(reservation.from.substring(0, 2)) - 1 == Number(from.substring(0, 2)) ||
                    Number(reservation.from.substring(0, 2)) + 1 == Number(from.substring(0, 2))
                )
                    throw new ConflictException('Players cannot take consecutives reservations');
            });
        }
    }

    async _validateCourt(court_number: number, from: string) {
        const court = (await this.courtRepository.findOne(
            { court_number },
            true,
        )) as ICourtDocument;
        if (court)
            if (from.substring(0, 2) < court.available_from.substring(0, 2))
                throw new ConflictException('From is too early');
    }
}
