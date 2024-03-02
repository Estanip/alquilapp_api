import { HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CourtRepository } from './court.repository';
import { CreateCourtDto } from './dto/request/create-court.dto';
import {
    UpdateAvailabilityDto,
    UpdateNumberDto,
    UpdateStatusDto,
} from './dto/request/update-court.dto';
import { CourtResponseDto } from './dto/response/index.dto';
import { CourtSchema } from './schemas/CourtSchema';

@Injectable()
export class CourtService {
    constructor(private readonly courtRepository: CourtRepository) {}

    async create(createCourtDto: CreateCourtDto) {
        await this.courtRepository.create(createCourtDto);
        return new SuccessResponse(HttpStatus.CREATED, 'Court successfully created');
    }

    async getAll() {
        const data: CourtSchema[] = await this.courtRepository.findAll();
        return new SuccessResponse(
            HttpStatus.OK,
            'List of courts',
            CourtResponseDto.toGetAllResponse(data),
        );
    }

    async getById(id: string) {
        const data: CourtSchema = await this.courtRepository.findById(id, true);
        return new SuccessResponse(
            HttpStatus.OK,
            'Court found',
            CourtResponseDto.toGetOneResponse(data),
        );
    }

    async updateNumber(id: string, updateCourtNumber: UpdateNumberDto) {
        if (!Object.prototype.hasOwnProperty.call(updateCourtNumber, 'court_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.courtRepository.findByIdAndUpdate(id, updateCourtNumber);
        return new SuccessResponse(HttpStatus.OK, 'Court Number successfully updated');
    }

    async updateAvailability(id: string, updateAvailabilityDto: UpdateAvailabilityDto) {
        if (
            !Object.prototype.hasOwnProperty.call(updateAvailabilityDto, 'available_from') ||
            !Object.prototype.hasOwnProperty.call(updateAvailabilityDto, 'available_until')
        )
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.courtRepository.findByIdAndUpdate(id, updateAvailabilityDto);
        return new SuccessResponse(HttpStatus.OK, 'Court Availability successfully updated');
    }

    async updateStatus(id: string, UpdateStatusDto: UpdateStatusDto) {
        if (!Object.prototype.hasOwnProperty.call(UpdateStatusDto, 'is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.courtRepository.findByIdAndUpdate(id, UpdateStatusDto);
        return new SuccessResponse(HttpStatus.OK, 'Court Status successfully updated');
    }

    async remove(id: string) {
        await this.courtRepository.deleteById(id);
        return new SuccessResponse(HttpStatus.OK, 'Court successfully removed');
    }
}
