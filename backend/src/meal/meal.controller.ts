import {
  Controller,
  Get,
  HttpStatus,
  Query,
  HttpException,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Meal } from 'src/models/Meal';
import { SearchMealsDto } from './dto/search-meals.dto';
import { MealService } from './meal.service';

@ApiTags('meals')
@Controller('meals')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  /**
   * Fetches 5 meal suggestions within the given category.
   */
  @Get('suggestions')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Meal suggestions successfully retrieved',
  })
  @ApiQuery({ name: 'category', type: String, required: true })
  async fetchSuggestions(@Query('category') category: string): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: Meal[] | undefined;
  }> {
    try {
      const suggestions = await this.mealService.fetchSuggestions(category);

      return {
        statusCode: HttpStatus.OK,
        message: 'Meal suggestions successfully retrieved',
        data: suggestions,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status,
          message: error.response,
        },
        error.status,
      );
    }
  }

  /**
   * Fetches a random meal.
   */
  @Get('random')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Random meal successfully retrieved',
  })
  async fetchRandomMeal(): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: Meal | undefined;
  }> {
    try {
      const randomMeal = await this.mealService.fetchRandomMeal();

      return {
        statusCode: HttpStatus.OK,
        message: 'Random meal successfully retrieved',
        data: randomMeal,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status,
          message: error.response,
        },
        error.status,
      );
    }
  }

  /**
   * Search for meals using the provided SearchMealsDto.
   * It allows searching by query, category, area, and ingredient.
   * The endpoint returns an array of unique meals that match the criteria.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Meals successfully retrieved',
  })
  @ApiQuery({ type: SearchMealsDto, required: false })
  async searchMeals(@Query() searchMealsDto: SearchMealsDto): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: Meal[] | undefined;
  }> {
    try {
      const meals = await this.mealService.searchMeals(searchMealsDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Meals successfully retrieved',
        data: meals,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status,
          message: error.response,
        },
        error.status,
      );
    }
  }

  /**
   * Fetches a meal by its ID.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Meal successfully retrieved',
  })
  async searchById(@Param('id') id: string): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: Meal | undefined;
  }> {
    try {
      const meal = await this.mealService.searchById(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Meal successfully retrieved',
        data: meal,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status,
          message: error.response,
        },
        error.status,
      );
    }
  }
}
