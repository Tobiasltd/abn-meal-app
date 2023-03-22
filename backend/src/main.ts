import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MealModule } from './meal/meal.module';
import { enableCorsWhitelist } from './util/cors/enable-cors-whitelist';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['warn', 'error', 'log', 'debug', 'verbose'],
    });

    const config = new DocumentBuilder()
      .setTitle('ABN Meal App Backend')
      .setDescription('This is the backend for the ABN Meal app assignment.')
      .setVersion('0.1')
      .build();

    const documentSwagger = SwaggerModule.createDocument(app, config, {
      include: [MealModule],
    });

    SwaggerModule.setup('api', app, documentSwagger);

    const configService = app.get(ConfigService);

    const frontendUrlDev = configService.get('FRONTEND_URL_DEV');
    const frontendUrlProd = configService.get('FRONTEND_URL_PROD');

    const whitelist = [frontendUrlDev, frontendUrlProd];

    enableCorsWhitelist(app, whitelist);

    const backendPort = configService.get('BACKEND_PORT') ?? 5555;

    await app.listen(backendPort);
    Logger.log(`🚀 Backend is running on port: ${backendPort}`);
  } catch (err) {
    Logger.error(`Failed to initialize, due to ${err}, backend exiting...`);
    process.exit(1);
  }
}

bootstrap();
