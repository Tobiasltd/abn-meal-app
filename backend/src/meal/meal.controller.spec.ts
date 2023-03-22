import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Meal } from '../models/Meal';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { TheMealDBApiService } from './themealdb/themealdb-api.service';
import { ErrorHandler } from '../util/error-handlers/error-handler';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TheMealDBApiConfigService } from './themealdb/themealdb-api-config.service';

describe('MealController', () => {
  let mealController: MealController;
  let mealService: MealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useClass: TheMealDBApiConfigService,
          inject: [ConfigService],
        }),
      ],
      controllers: [MealController],
      providers: [MealService, TheMealDBApiService, ErrorHandler],
    }).compile();

    mealService = module.get<MealService>(MealService);
    mealController = module.get<MealController>(MealController);
  });

  describe('fetchSuggestions', () => {
    it('should return meal suggestions when successful', async () => {
      const category = 'Dessert';
      const mealSuggestions: Meal[] = [
        // Array of sample meal objects
      ];

      jest
        .spyOn(mealService, 'fetchSuggestions')
        .mockResolvedValue(mealSuggestions);

      const result = await mealController.fetchSuggestions(category);

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.message).toBe('Meal suggestions successfully retrieved');
      expect(result.data).toEqual(mealSuggestions);
    });

    it('should throw an error when fetchSuggestions fails', async () => {
      const category = 'InvalidCategory';
      const errorResponse = {
        response: 'Failed to get meal suggestions',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
      jest
        .spyOn(mealService, 'fetchSuggestions')
        .mockRejectedValue(errorResponse);

      try {
        await mealController.fetchSuggestions(category);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(errorResponse.status);
        expect(error.getResponse()).toEqual({
          statusCode: errorResponse.status,
          message: errorResponse.response,
        });
      }
    });
  });

  describe('fetchRandomMeal', () => {
    it('should return a random meal when successful', async () => {
      const randomMeal: Meal = {
        strMeal: 'Sample Meal',
        strMealThumb:
          'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        idMeal: '52959',
      };

      jest.spyOn(mealService, 'fetchRandomMeal').mockResolvedValue(randomMeal);

      const result = await mealController.fetchRandomMeal();

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.message).toBe('Random meal successfully retrieved');
      expect(result.data).toEqual(randomMeal);
    });

    it('should throw an error when fetchRandomMeal fails', async () => {
      const errorResponse = {
        response: 'Failed to get random meal',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
      jest
        .spyOn(mealService, 'fetchRandomMeal')
        .mockRejectedValue(errorResponse);

      try {
        await mealController.fetchRandomMeal();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(errorResponse.status);
        expect(error.getResponse()).toEqual({
          statusCode: errorResponse.status,
          message: errorResponse.response,
        });
      }
    });
  });

  describe('searchMeals', () => {
    it('should return meals when successful', async () => {
      const searchMealsDto = {
        query: 'sushi',
      };

      const foundMeals: Meal[] = [
        {
          strMeal: 'Sample Meal',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
          idMeal: '52959',
        },
        {
          strMeal: 'Sample Meal 2',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/58oia61564916526.jpg',
          idMeal: '52958',
        },
      ];

      jest.spyOn(mealService, 'searchMeals').mockResolvedValue(foundMeals);

      const result = await mealController.searchMeals(searchMealsDto);

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.message).toBe('Meals successfully retrieved');
      expect(result.data).toEqual(foundMeals);
    });

    it('should throw an error when searchMeals fails', async () => {
      const searchMealsDto = {
        query: 'sushi',
      };
      const errorResponse = {
        response: 'Failed to search meals',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
      jest.spyOn(mealService, 'searchMeals').mockRejectedValue(errorResponse);

      try {
        await mealController.searchMeals(searchMealsDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(errorResponse.status);
        expect(error.getResponse()).toEqual({
          statusCode: errorResponse.status,
          message: errorResponse.response,
        });
      }
    });
  });
});
