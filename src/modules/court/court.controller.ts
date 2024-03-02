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
import { CourtService } from './court.service';
import { CreateCourtDto } from './dto/request/create-court.dto';
import {
    UpdateAvailabilityDto,
    UpdateNumberDto,
    UpdateStatusDto,
} from './dto/request/update-court.dto';

@ApiTags('Court')
@Controller('court')
export class CourtController {
    constructor(private readonly courtService: CourtService) {}

    @Post()
    @ApiBody({ type: CreateCourtDto })
    @ApiOkResponse({
        description: 'Successful response court created',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createCourtDto: CreateCourtDto) {
        return this.courtService.create(createCourtDto);
    }

    @Get()
    @ApiOkResponse({
        description: 'Successful response to get courts',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    getAll() {
        return this.courtService.getAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Successful response to get court by id',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    getById(@Param('id') id: string) {
        return this.courtService.getById(id);
    }

    @Patch('/availability/:id')
    @ApiBody({ type: UpdateAvailabilityDto })
    @ApiOkResponse({
        description: 'Successful response to court availability update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateAvailability(
        @Param('id') id: string,
        @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    ) {
        return this.courtService.updateAvailability(id, updateAvailabilityDto);
    }

    @Patch('/court_number/:id')
    @ApiBody({ type: UpdateAvailabilityDto })
    @ApiOkResponse({
        description: 'Successful response to court number update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateNumber(@Param('id') id: string, @Body() UpdateNumberDto: UpdateNumberDto) {
        return this.courtService.updateNumber(id, UpdateNumberDto);
    }

    @Patch('/status/:id')
    @ApiBody({ type: UpdateStatusDto })
    @ApiOkResponse({
        description: 'Successful response to court status update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateStatus(@Param('id') id: string, @Body() UpdateStatusDto: UpdateStatusDto) {
        return this.courtService.updateStatus(id, UpdateStatusDto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Successful response court removed',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string) {
        return this.courtService.remove(id);
    }
}
