import { HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CourtRepository } from './court.repository';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateAvailabilityDto, UpdateNumberDto, UpdateStatusDto } from './dto/update-court.dto';
import { ICourtDocument, TCourtCollection } from './interfaces/court.interfaces';

@Injectable()
export class CourtService {
    constructor(private readonly courtRepository: CourtRepository) {}

    async create(createCourtDto: CreateCourtDto) {
        await this.courtRepository.create(createCourtDto);
        return new SuccessResponse(HttpStatus.CREATED, 'Court successfully created');
    }

    async findAll() {
        const data: TCourtCollection = await this.courtRepository.findAll();
        return new SuccessResponse(HttpStatus.OK, 'List of courts', data);
    }

    async findOne(id: string) {
        const data: ICourtDocument | unknown = await this.courtRepository.findById(id, true);
        return new SuccessResponse(HttpStatus.OK, 'Court found', data);
    }

    async updateNumber(id: string, updateCourtNumber: UpdateNumberDto) {
        if (!updateCourtNumber.hasOwnProperty('court_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.courtRepository.findByIdAndUpdate(id, updateCourtNumber);
        return new SuccessResponse(HttpStatus.OK, 'Court Number successfully updated');
    }

    async updateAvailability(id: string, updateAvailabilityDto: UpdateAvailabilityDto) {
        if (
            !updateAvailabilityDto.hasOwnProperty('available_from') ||
            !updateAvailabilityDto.hasOwnProperty('available_until')
        )
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.courtRepository.findByIdAndUpdate(id, updateAvailabilityDto);
        return new SuccessResponse(HttpStatus.OK, 'Court Availability successfully updated');
    }

    async updateStatus(id: string, UpdateStatusDto: UpdateStatusDto) {
        if (!UpdateStatusDto.hasOwnProperty('is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.courtRepository.findByIdAndUpdate(id, UpdateStatusDto);
        return new SuccessResponse(HttpStatus.OK, 'Court Status successfully updated');
    }

    async remove(id: string) {
        await this.courtRepository.deleteById(id);
        return new SuccessResponse(HttpStatus.OK, 'Court successfully removed');
    }
}
