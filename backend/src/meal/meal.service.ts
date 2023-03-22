import { Injectable } from '@nestjs/common';
import { Meal } from '../models/Meal';
import { ErrorHandler } from '../util/error-handlers/error-handler';
import { SearchMealsDto } from './dto/search-meals.dto';
import { TheMealDBApiService } from './themealdb/themealdb-api.service';

@Injectable()
export class MealService {
  constructor(
    private theMealDBApiService: TheMealDBApiService,
    private errorHandler: ErrorHandler,
  ) {}

  /**
   * Fetches a random meal
   * The method returns a single random meal.
   * @returns A single meal.
   */
  async fetchRandomMeal(): Promise<Meal> {
    try {
      const meal = await this.theMealDBApiService.fetchRandomMeal();

      const filteredResults = meal.meals.filter(this.isMeal);

      return filteredResults[0];
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }

  /**
   * Fetches a meal by its ID.
   * The method returns a single meal with the given ID.
   * @param id The ID of the meal to fetch.
   * @returns A single meal with the given ID.
   */
  async searchById(id: string): Promise<Meal> {
    try {
      const meal = await this.theMealDBApiService.searchById(id);
      return meal.meals[0];
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }

  /**
   * Search for meals using the provided SearchMealsDto.
   * It allows searching by query, category, area, and ingredient.
   * The method returns an array of unique meals that match the criteria.
   * @param searchMealsDto An instance of SearchMealsDto containing search parameters.
   * @returns An array of unique meals.
   */
  async searchMeals(searchMealsDto: SearchMealsDto): Promise<Meal[]> {
    const { query, category, area, ingredient } = searchMealsDto;

    const searchPromises: Promise<any>[] = [];

    if (query) {
      searchPromises.push(this.theMealDBApiService.search(query));
    }

    if (category) {
      searchPromises.push(this.theMealDBApiService.filterByCategory(category));
    }

    if (area) {
      searchPromises.push(this.theMealDBApiService.filterByArea(area));
    }

    if (ingredient) {
      searchPromises.push(
        this.theMealDBApiService.filterByIngredient(ingredient),
      );
    }

    const results = await Promise.allSettled(searchPromises);

    const fulfilledResults = results.flatMap((result) => {
      if (result.status === 'fulfilled') {
        return result.value.meals;
      } else {
        this.errorHandler.handleError(result.reason);
        return [];
      }
    });

    const filteredResults = fulfilledResults.filter(this.isMeal);

    const amountOfSearchParameters =
      this.amountOfSearchParameters(searchMealsDto);

    if (amountOfSearchParameters > 1) {
      return this.getIntersection(filteredResults, amountOfSearchParameters);
    } else {
      return filteredResults;
    }
  }

  /**
   * Checks if the provided object is a Meal.
   * The method returns true if the object is a Meal, and false otherwise.
   * @param object The object to check.
   * @returns A boolean value indicating whether the object is a Meal.
   */
  isMeal(object: any): object is Meal {
    return (
      object &&
      typeof object.strMeal === 'string' &&
      typeof object.strMealThumb === 'string' &&
      typeof object.idMeal === 'string'
    );
  }

  /**
   * Determines the amount of non-empty search parameters in the provided SearchMealsDto.
   * @param searchMealsDto An instance of SearchMealsDto containing search parameters.
   * @returns The amount of non-empty search parameters.
   */
  amountOfSearchParameters(searchMealsDto: SearchMealsDto): number {
    const { query, category, area, ingredient } = searchMealsDto;
    const params = [query, category, area, ingredient];
    const nonEmptyParams = params.filter(
      (param) => param !== undefined && param !== '',
    );

    return nonEmptyParams.length;
  }

  /**
   * Filters out any meals that do not match all search criteria.
   * @param meals An array of meals to filter.
   * @param amountOfSearchParameters The amount of non-empty search parameters.
   * @returns An array of meals that match all search criteria.
   */
  getIntersection(meals: Meal[], amountOfSearchParameters: number): Meal[] {
    const mealCount = meals.reduce((countMap, meal) => {
      countMap[meal.idMeal] = (countMap[meal.idMeal] || 0) + 1;
      return countMap;
    }, {} as { [key: string]: number });

    return meals.filter(
      (meal, index, self) =>
        mealCount[meal.idMeal] === amountOfSearchParameters &&
        index === self.findIndex((m) => m.idMeal === meal.idMeal),
    );
  }

  /**
   * Fetches 4 meal suggestions within the given category.
   * @param category The category to fetch meal suggestions for
   * @returns An array containing 4 meals in the given category
   */
  async fetchSuggestions(category: string): Promise<Meal[]> {
    try {
      const mealsInCategory = await this.theMealDBApiService.filterByCategory(
        category,
      );

      const filteredResults = mealsInCategory.meals.filter(this.isMeal);

      const selection = filteredResults.slice(0, 4);
      return selection;
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }
}
