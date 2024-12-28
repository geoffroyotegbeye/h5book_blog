import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as dotenv from 'dotenv';
import {ValidationPipe} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }))

    const config = new DocumentBuilder()
        .setTitle('H5Book Blog API')
        .setDescription('API pour la gestion de H5Book Blog')
        .setVersion('1.0')
        .addTag('authentication', 'Authentification et sécurité')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
