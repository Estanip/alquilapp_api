import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { CreateMemberDto } from './dto/create-member.dto';
import {
    UpdateBirthDateDto,
    UpdateEmailDto,
    UpdateNameDto,
    UpdatePhoneNumberDto,
    UpdateStatusDto,
} from './dto/update-member.dto';
import { MemberService } from './member.service';

@ApiTags('Member')
@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post()
    @ApiBody({ type: CreateMemberDto })
    @ApiOkResponse({
        description: 'Successful response member created',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createMemberDto: CreateMemberDto) {
        return this.memberService.create(createMemberDto);
    }

    @Get()
    @ApiOkResponse({
        description: 'Successful response get members',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.memberService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Successful response get member by id',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.memberService.findOne(id);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Successful response member removed',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string) {
        return this.memberService.remove(id);
    }

    @Patch('/email/:id')
    @ApiBody({ type: UpdateEmailDto })
    @ApiOkResponse({
        description: 'Successful response to member email update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateEmail(@Param('id') id: string, @Body() UpdateEmailDto: UpdateEmailDto) {
        return this.memberService.updateEmail(id, UpdateEmailDto);
    }

    @Patch('/phone_number/:id')
    @ApiBody({ type: UpdatePhoneNumberDto })
    @ApiOkResponse({
        description: 'Successful response to phone number update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updatePhoneNumber(@Param('id') id: string, @Body() UpdatePhoneNumberDto: UpdatePhoneNumberDto) {
        return this.memberService.updatePhoneNumber(id, UpdatePhoneNumberDto);
    }

    /*     @Patch('/identification_number/:id')
    @ApiBody({ type: UpdateIdentificationNumberDto })
    @ApiOkResponse({
        description: 'Successful response to identification number update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateIdentificationNumber(
        @Param('id') id: string,
        @Body() UpdateIdentificationNumberDto: UpdateIdentificationNumberDto,
    ) {
        return this.memberService.updateIdentificationNumber(
            id,
            UpdateIdentificationNumberDto,
        );
    } */

    @Patch('/birth_date/:id')
    @ApiBody({ type: UpdateBirthDateDto })
    @ApiOkResponse({
        description: 'Successful response to birthdate update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateBirthDate(@Param('id') id: string, @Body() UpdateBirthDateDto: UpdateBirthDateDto) {
        return this.memberService.updateBirthDate(id, UpdateBirthDateDto);
    }

    @Patch('/name/:id')
    @ApiBody({ type: UpdateNameDto })
    @ApiOkResponse({
        description: 'Successful response to name update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateName(@Param('id') id: string, @Body() UpdateNameDto: UpdateNameDto) {
        return this.memberService.updateName(id, UpdateNameDto);
    }

    @Patch('/status/:id')
    @ApiBody({ type: UpdateStatusDto })
    @ApiOkResponse({
        description: 'Successful response to is enabled update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateStatus(@Param('id') id: string, @Body() UpdateStatusDto: UpdateStatusDto) {
        return this.memberService.updateStatus(id, UpdateStatusDto);
    }
}
