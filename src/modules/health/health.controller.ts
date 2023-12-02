import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    HttpHealthIndicator,
    MongooseHealthIndicator,
} from '@nestjs/terminus';
import { IsPublic } from 'src/shared/middlewares/public_routes.config';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        @Inject(MongooseHealthIndicator)
        private readonly mongooseHealth: MongooseHealthIndicator,
        private http: HttpHealthIndicator,
    ) {}

    @IsPublic()
    @Get()
    @HealthCheck()
    async check(): Promise<HealthCheckResult> {
        return this.health.check([
            () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
            //() => this.mongooseHealth.pingCheck('mongoose'),
        ]);
    }
}
