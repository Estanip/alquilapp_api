import 'dotenv/config';
const { SERVER_PORT } = process.env;

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/responses/ExceptionResponse';
import { setSwagger } from './shared/utils/swagger.service';
import { LoggerService } from './shared/utils/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    setSwagger(app);
    const logger = new LoggerService('Server');

    await app.listen(SERVER_PORT);
    logger.log(`Server running on port ${SERVER_PORT}`);
}
bootstrap();
