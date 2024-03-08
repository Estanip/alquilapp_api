import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/responses/ExceptionResponse';
import { LoggerService } from './shared/utils/logger/logger.service';
import { setSwagger } from './shared/utils/swagger.service';

async function bootstrap() {
    const logger = new LoggerService('Server');
    const app = await NestFactory.create(AppModule);
    const port: number | string = app.get(ConfigService).get('port') || 3000;
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    setSwagger(app);
    await app.listen(port);
    logger.log(`Server running on port ${port}`);
}
bootstrap();
