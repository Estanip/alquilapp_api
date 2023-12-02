import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('AlquilAppCancha')
        .setDescription('API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    return SwaggerModule.setup('api', app, document);
};
