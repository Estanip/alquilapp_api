import {
    Injectable,
    HttpStatus,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import {
    UpdateAvailabilityDto,
    UpdateCourtNumberDto,
    UpdateCourtStatusDto,
} from './dto/update-court.dto';
import { CourtModel } from './models/court.model';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { TCourtCollection, ICourtDocument } from './interfaces/court.interfaces';

@Injectable()
export class CourtService {
    private courtModel: typeof CourtModel;

    constructor() {
        this.courtModel = CourtModel;
    }

    async create(createCourtDto: CreateCourtDto) {
        await new this.courtModel(createCourtDto).save();
        return new SuccessResponse(HttpStatus.CREATED, 'Court successfully created');
    }

    async findAll() {
        const data: TCourtCollection = await this.courtModel.find();
        return new SuccessResponse(HttpStatus.OK, 'List of courts', data);
    }

    async findOne(id: string) {
        const data: ICourtDocument = await this.courtModel.findById(id);
        if (!data) throw new NotFoundException('Court not found');
        return new SuccessResponse(HttpStatus.OK, 'Court found', data);
    }

    async updateNumber(id: string, updateCourtNumber: UpdateCourtNumberDto) {
        if (!updateCourtNumber.hasOwnProperty('court_number'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.courtModel.findByIdAndUpdate(id, updateCourtNumber);
        return new SuccessResponse(HttpStatus.OK, 'Court Number successfully updated');
    }

    async updateAvailability(id: string, updateAvailabilityDto: UpdateAvailabilityDto) {
        if (
            !updateAvailabilityDto.hasOwnProperty('available_from') ||
            !updateAvailabilityDto.hasOwnProperty('available_until')
        )
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.courtModel.findByIdAndUpdate(id, updateAvailabilityDto);
        return new SuccessResponse(HttpStatus.OK, 'Court Availability successfully updated');
    }

    async updateStatus(id: string, updateCourtStatusDto: UpdateCourtStatusDto) {
        if (!updateCourtStatusDto.hasOwnProperty('is_enabled'))
            throw new PreconditionFailedException('Field/s must not be empty');
        await this.courtModel.findByIdAndUpdate(id, updateCourtStatusDto);
        return new SuccessResponse(HttpStatus.OK, 'Court Status successfully updated');
    }

    async remove(id: string) {
        await this.courtModel.findByIdAndDelete(id);
        return new SuccessResponse(HttpStatus.OK, 'Court successfully removed');
    }
}
