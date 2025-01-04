// backend\src\main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Utilisation des pipes globaux pour valider et transformer les données entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non définies dans DTO
      transform: true, // Transforme les types automatiquement
      forbidNonWhitelisted: true, // Erreur si une propriété non définie est envoyée
    }),
  );

  // Configuration de CORS pour autoriser les requêtes depuis le frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Adresse du frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    credentials: true, // Nécessaire pour l'envoi des cookies
  });

  // Configuration Swagger pour la documentation API
  const config = new DocumentBuilder()
    .setTitle('H5Book Blog API')
    .setDescription('API pour la gestion de H5Book Blog')
    .setVersion('1.0')
    .addBearerAuth() // Ajout d'authentification Bearer
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Définition du port depuis .env ou par défaut sur 4000
  const PORT = process.env.PORT || 4000;
  
  await app.listen(PORT, () => {
    const logger = new Logger('Bootstrap');
    logger.log(`Serveur démarré sur : http://localhost:${PORT}`);
    logger.log(`Swagger disponible sur : http://localhost:${PORT}/api`);
  });
}

bootstrap();

