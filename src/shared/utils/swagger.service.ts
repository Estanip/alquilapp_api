import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('AlquilAppCancha RESTFul API')
    .setDescription('AlquilAppCancha endpoints')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('api-docs', app, document);
};
