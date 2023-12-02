import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';

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
}
