import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import {
    UpdateBirthDateMemberDto,
    UpdateEmailMemberDto,
    UpdateIdentificationNumberMemberDto,
    UpdateStatusMemberDto,
    UpdateNameMemberDto,
    UpdatePhoneNumberMemberDto,
} from './dto/update-member.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';

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
    @ApiBody({ type: UpdateEmailMemberDto })
    @ApiOkResponse({
        description: 'Successful response to member email update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateEmail(@Param('id') id: string, @Body() updateEmailMemberDto: UpdateEmailMemberDto) {
        return this.memberService.updateEmail(id, updateEmailMemberDto);
    }

    @Patch('/phone_number/:id')
    @ApiBody({ type: UpdatePhoneNumberMemberDto })
    @ApiOkResponse({
        description: 'Successful response to phone number update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updatePhoneNumber(
        @Param('id') id: string,
        @Body() updatePhoneNumberMemberDto: UpdatePhoneNumberMemberDto,
    ) {
        return this.memberService.updatePhoneNumber(id, updatePhoneNumberMemberDto);
    }

    @Patch('/identification_number/:id')
    @ApiBody({ type: UpdateIdentificationNumberMemberDto })
    @ApiOkResponse({
        description: 'Successful response to identification number update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateIdentificationNumber(
        @Param('id') id: string,
        @Body() updateIdentificationNumberMemberDto: UpdateIdentificationNumberMemberDto,
    ) {
        return this.memberService.updateIdentificationNumber(
            id,
            updateIdentificationNumberMemberDto,
        );
    }

    @Patch('/birth_date/:id')
    @ApiBody({ type: UpdateBirthDateMemberDto })
    @ApiOkResponse({
        description: 'Successful response to birthdate update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateBirthDate(
        @Param('id') id: string,
        @Body() updateBirthDateMemberDto: UpdateBirthDateMemberDto,
    ) {
        return this.memberService.updateBirthDate(id, updateBirthDateMemberDto);
    }

    @Patch('/name/:id')
    @ApiBody({ type: UpdateNameMemberDto })
    @ApiOkResponse({
        description: 'Successful response to name update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateName(@Param('id') id: string, @Body() updateNameMemberDto: UpdateNameMemberDto) {
        return this.memberService.updateName(id, updateNameMemberDto);
    }

    @Patch('/status/:id')
    @ApiBody({ type: UpdateStatusMemberDto })
    @ApiOkResponse({
        description: 'Successful response to is enabled update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateIsEnabled(@Param('id') id: string, @Body() updateStatusMemberDto: UpdateStatusMemberDto) {
        return this.memberService.updateIsEnabled(id, updateStatusMemberDto);
    }
}
