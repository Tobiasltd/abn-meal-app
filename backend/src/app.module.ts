import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealModule } from './meal/meal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        FRONTEND_URL_DEV: Joi.string().required(),
        FRONTEND_URL_PROD: Joi.string().required(),
        BACKEND_PORT: Joi.string().required(),
        MEAL_API_KEY: Joi.string().required(),
        MEAL_API_BASE_URL: Joi.string().required(),
      }),
    }),
    MealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
