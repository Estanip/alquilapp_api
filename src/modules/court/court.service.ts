import { Injectable, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
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
        try {
            await new this.courtModel(createCourtDto).save();
            return new SuccessResponse(HttpStatus.CREATED, 'Court successfully created');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findAll() {
        try {
            const data: TCourtCollection = await this.courtModel.find();
            return new SuccessResponse(HttpStatus.CREATED, 'List of courts', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async findOne(id: string) {
        try {
            const data: ICourtDocument = await this.courtModel.findById(id);
            if (!data) throw new NotFoundException('Court not found');
            return new SuccessResponse(HttpStatus.CREATED, 'Court found', data);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateNumber(id: string, updateCourtNumber: UpdateCourtNumberDto) {
        try {
            await this.courtModel.findByIdAndUpdate(id, updateCourtNumber);
            return new SuccessResponse(HttpStatus.OK, 'Court Number successfully updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateAvailability(id: string, updateAvailabilityDto: UpdateAvailabilityDto) {
        try {
            await this.courtModel.findByIdAndUpdate(id, updateAvailabilityDto);
            return new SuccessResponse(HttpStatus.OK, 'Court Availability successfully updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateStatus(id: string, updateCourtStatusDto: UpdateCourtStatusDto) {
        try {
            await this.courtModel.findByIdAndUpdate(id, updateCourtStatusDto);
            return new SuccessResponse(HttpStatus.OK, 'Court Status successfully updated');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async remove(id: string) {
        try {
            await this.courtModel.findByIdAndRemove(id);
            return new SuccessResponse(HttpStatus.OK, 'Court successfully removed');
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
