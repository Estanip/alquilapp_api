import 'dotenv/config';
const { SERVER_PORT } = process.env;

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './shared/responses/ExceptionResponse';
import Morgan from './shared/utils/morgan.service';

import { setSwagger } from './shared/utils/swagger.service';
import Logger from './shared/utils/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.use(Morgan);

    setSwagger(app);

    await app.listen(SERVER_PORT);
    Logger.info(`Server running on port ${SERVER_PORT}`);
}
bootstrap();
