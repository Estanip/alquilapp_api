import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './shared/Config/configuration';
import { HttpExceptionFilter } from './shared/responses/ExceptionResponse';
import { LoggerService } from './shared/utils/logger/logger.service';
import { setSwagger } from './shared/utils/swagger.service';

async function bootstrap() {
  const logger = new LoggerService('Server');
  const app = await NestFactory.create(AppModule);
  const port: number | string = CONFIG.port || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: [CONFIG.app_bo_host],
    methods: ['OPTIONS', 'POST', 'PUT', 'GET', 'DELETE'],
    allowedHeaders: '*',
    exposedHeaders: '*',
  });
  setSwagger(app);
  await app.listen(port, '0.0.0.0');
  logger.log(`Server running on port ${port}`);
}
bootstrap();
