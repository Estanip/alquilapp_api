import { HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { MembershipTypesDocument } from 'src/modules/membership_type/schemas';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateMembershipTypeDto } from './dto/request/create-membership_type.dto';
import { UpdateStatusDto } from './dto/request/update-membership_type.dto';
import { MembershipTypeResponseDto } from './dto/response/index.dto';
import { TMembershipTypeCollection } from './interfaces';
import { MembershipTypesRepository } from './membershipt_type.repository';

@Injectable()
export class MembershipTypeService {
  constructor(private readonly membershipTypeRepository: MembershipTypesRepository) {}

  async create(createMembershipTypeDto: CreateMembershipTypeDto) {
    await this.membershipTypeRepository.create(createMembershipTypeDto);
    return new SuccessResponse(HttpStatus.CREATED, 'MembershipType successfully created');
  }

  async findAll() {
    const data = (await this.membershipTypeRepository.findAll()) as TMembershipTypeCollection;
    return new SuccessResponse(
      HttpStatus.OK,
      'List of membershipTypes',
      MembershipTypeResponseDto.getAll(data),
    );
  }

  async findOne(id: string) {
    const data = (await this.membershipTypeRepository.findById(
      new Types.ObjectId(id),
      true,
    )) as MembershipTypesDocument;
    return new SuccessResponse(
      HttpStatus.OK,
      'MembershipType found',
      MembershipTypeResponseDto.getOne(data),
    );
  }

  async updateStatus(id: string, UpdateStatusDto: UpdateStatusDto) {
    if (!Object.prototype.hasOwnProperty.call(UpdateStatusDto, 'is_enabled'))
      throw new PreconditionFailedException('Field/s must not be empty');
    await this.membershipTypeRepository.findByIdAndUpdate(new Types.ObjectId(id), UpdateStatusDto);
    return new SuccessResponse(HttpStatus.OK, 'Membership Type is enabled successffuly updated');
  }
}
