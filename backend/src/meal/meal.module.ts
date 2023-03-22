import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { ErrorHandler } from 'src/util/error-handlers/error-handler';
import { TheMealDBApiService } from './themealdb/themealdb-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TheMealDBApiConfigService } from './themealdb/themealdb-api-config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: TheMealDBApiConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [MealService, TheMealDBApiService, ErrorHandler],
  controllers: [MealController],
})
export class MealModule {}
