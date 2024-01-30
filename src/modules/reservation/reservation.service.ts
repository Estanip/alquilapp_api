import {
    ConflictException,
    HttpStatus,
    Injectable,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CourtRepository } from '../court/court.repository';
import { ICourtDocument } from '../court/interfaces/court.interfaces';
import { PricingRepository } from '../pricing/pricing.repository';
import { IUserAttributes, IUserDocument } from '../users/interfaces/user.interface';
import { UserRepository } from '../users/user.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import {
    UpdateCourtDto,
    UpdateDateDto,
    UpdateFromToDto,
    UpdatePlayersDto,
} from './dto/update-reservation.dto';
import {
    IReservation,
    IReservationDocument,
    TReservationCollection,
} from './interfaces/reservation.interfaces';
import { ReservationRepository } from './reservation.repository';
import { PlayerSchema } from './schemas/PlayerSchema';
import { Types } from 'mongoose';
import { ReservationSchema } from './schemas/ReservationSchema';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly userRepository: UserRepository,
        private readonly courtRepository: CourtRepository,
        private readonly pricingRepository: PricingRepository,
    ) {}

    async create(createReservationDto: CreateReservationDto) {
        await this._validateAvailability(createReservationDto);
        await this._validatePlayers(
            createReservationDto.players,
            createReservationDto.date,
            createReservationDto.from,
        );
        await this._validateCourt(createReservationDto.court, createReservationDto.from);
        createReservationDto = await this._setPrice(createReservationDto);
        await this.reservationRepository.create(createReservationDto);
        return new SuccessResponse(HttpStatus.CREATED, 'Reservation successfully created');
    }

    async findAll() {
        const data: TReservationCollection = await this.reservationRepository.findAllWithPopulate(
            'players.user',
            'first_name last_name membership_type',
        );
        return new SuccessResponse(HttpStatus.OK, 'List of reservations', data);
    }

    async findOne(id: string) {
        const data: IReservationDocument | unknown = await this.reservationRepository.findById(
            id,
            true,
        );
        return new SuccessResponse(HttpStatus.OK, 'Reservation found', data);
    }

    async updateDate(id: string, UpdateDateDto: UpdateDateDto) {
        if (!UpdateDateDto.hasOwnProperty('date'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.reservationRepository.findByIdAndUpdate(id, UpdateDateDto);
        return new SuccessResponse(HttpStatus.OK, 'Reservation date successffuly updated');
    }

    async updateFromTo(id: string, UpdateFromToDto: UpdateFromToDto) {
        if (!UpdateFromToDto.hasOwnProperty('from') || !UpdateFromToDto.hasOwnProperty('to'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.reservationRepository.findByIdAndUpdate(id, UpdateFromToDto);
        return new SuccessResponse(HttpStatus.OK, 'Reservation from/to successffuly updated');
    }

    async updatePlayers(id: string, updatePlayersReservationDto: UpdatePlayersDto) {
        if (!updatePlayersReservationDto.hasOwnProperty('players'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.reservationRepository.findByIdAndUpdate(id, updatePlayersReservationDto);
        return new SuccessResponse(HttpStatus.OK, 'Reservation players successffuly updated');
    }

    async updateCourt(id: string, updateCourtReservationDto: UpdateCourtDto) {
        if (!updateCourtReservationDto.hasOwnProperty('court'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.reservationRepository.findByIdAndUpdate(id, updateCourtReservationDto);
        return new SuccessResponse(HttpStatus.OK, 'Reservation court successffuly updated');
    }

    async remove(id: string) {
        await this.reservationRepository.deleteById(id);
        return new SuccessResponse(HttpStatus.OK, 'Reservation successfully removed');
    }

    async _validateAvailability(data: CreateReservationDto) {
        const reservation: IReservationDocument | unknown =
            await this.reservationRepository.findOne(
                {
                    date: data.date,
                    to: data.to,
                    from: data.from,
                    court: data.court,
                },
                false,
            );
        if (reservation) throw new ConflictException('The court shift is taken');
    }

    async _validatePlayers(players: PlayerSchema[], date: Date, from: string) {
        const playersIds = players.map((player: PlayerSchema) => player.user.toString());
        if (playersIds.some((id: string, index: number) => playersIds.indexOf(id) != index))
            throw new ConflictException('Repeated players');

        const users: IUserDocument[] = [];
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

        if (users.some((user: IUserAttributes) => !user.is_membership_validated))
            throw new NotFoundException('User membership has not yet been validated');

        const reservations: Partial<ReservationSchema[]> =
            await this.reservationRepository.aggregate([
                {
                    $project: {
                        players: 1,
                        from: 1,
                        to: 1,
                        formattedDate: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$date',
                            },
                        },
                    },
                },
                {
                    $match: {
                        formattedDate: date,
                        'players.user': { $in: playersIds },
                    },
                },
            ]);

        if (reservations) {
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
        const court: ICourtDocument | any = await this.courtRepository.findOne(
            { court_number },
            true,
        );
        if (court)
            if (from.substring(0, 2) < court.available_from.substring(0, 2))
                throw new ConflictException('From is too early');
    }

    async _setPrice(data: CreateReservationDto) {
        for (const player of data.players) {
            const user_membership = (
                (await this.userRepository.findById(player.user.toString(), true)) as any
            )?.membership_type;
            const price = (
                (await this.pricingRepository.findOne({
                    court: data.court,
                    membership_type: user_membership,
                })) as any
            )?.price;
            if (price === null || price === undefined)
                throw new NotFoundException('Error when try to get price associated');
            else player.fee = price;
        }
        const total_price = data.players.reduce((acc: number, cur: PlayerSchema) => {
            return acc + cur.fee;
        }, 0);

        data['total_price'] = total_price;
        return data;
    }
}
