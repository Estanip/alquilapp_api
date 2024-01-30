import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';
import { UpdateIsEnabledDto, UpdateIsMembershipValidatedDto } from './dto/update-user.dto';
import { UsersService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Successful response to get users',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id/is_enabled')
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Successful response to check is_enabled',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    checkIsEnabled(@Param('id') id: string) {
        return this.usersService.checkIsEnabled(id);
    }

    @Get(':id/is_membership_validated')
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Successful response to check is_enabled',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    checkIsMembershipValidated(@Param('id') id: string) {
        return this.usersService.checkMembershipValidation(id);
    }

    @Patch(':id/is_enabled')
    updateIsEnabled(@Param('id') id: string, @Body() updateIsEnabledDto: UpdateIsEnabledDto) {
        return this.usersService.updateIsEnabled(id, updateIsEnabledDto);
    }

    @Patch(':id/is_membership_validated')
    updateIsMembershipValidated(
        @Param('id') id: string,
        @Body() updateIsMembershipValidatedDto: UpdateIsMembershipValidatedDto,
    ) {
        return this.usersService.updateIsMembershipValidated(id, updateIsMembershipValidatedDto);
    }
}
