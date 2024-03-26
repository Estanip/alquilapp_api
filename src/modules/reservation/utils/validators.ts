import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CourtRepository } from 'src/modules/court/court.repository';
import { ICourtDocument } from 'src/modules/court/interfaces/court.interfaces';
import {
    IUserAttributes,
    IUserDocument,
    TUserCollection,
} from 'src/modules/users/interfaces/user.interface';
import { UserRepository } from 'src/modules/users/user.repository';
import { CreateReservationDtoRequest } from '../dto/request/create-reservation.dto';
import { UpdateReservationDtoRequest } from '../dto/request/update-reservation.dto';
import { IPlayer } from '../interfaces/player.interfaces';
import { IReservationDocument, TReservationCollection } from '../interfaces/reservation.interfaces';
import { ReservationRepository } from '../reservation.repository';
import { ReservationSetter } from './setters';

@Injectable()
export class ReservationValidator {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly userRepository: UserRepository,
        private readonly courtRepository: CourtRepository,
        private readonly resertavtionSetters: ReservationSetter,
    ) {}

    async _validateAndSet(
        data: CreateReservationDtoRequest | UpdateReservationDtoRequest,
        editing: boolean = false,
    ) {
        await this._validateAvailability(data, editing);
        await this._validatePlayers(data.players, data.date, data.from);
        await this._validateCourt(data.court, data.from);
        data = await this.resertavtionSetters._setPrice(data);
        data = await this.resertavtionSetters._setTo(data);

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
