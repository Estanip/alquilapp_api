import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateCourtDto } from './dto/create-court.dto';
import {
    UpdateAvailabilityDto,
    UpdateCourtNumberDto,
    UpdateCourtStatusDto,
} from './dto/update-court.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/responses/SuccessResponse';

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
    findAll() {
        return this.courtService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Successful response to get court by id',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.courtService.findOne(id);
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
    updateNumber(@Param('id') id: string, @Body() updateCourtNumberDto: UpdateCourtNumberDto) {
        return this.courtService.updateNumber(id, updateCourtNumberDto);
    }

    @Patch('/status/:id')
    @ApiBody({ type: UpdateCourtStatusDto })
    @ApiOkResponse({
        description: 'Successful response to court status update',
        type: SuccessResponse,
    })
    @HttpCode(HttpStatus.OK)
    updateStatus(@Param('id') id: string, @Body() updateCourtStatusDto: UpdateCourtStatusDto) {
        return this.courtService.updateStatus(id, updateCourtStatusDto);
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
