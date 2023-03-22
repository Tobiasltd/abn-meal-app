/**
 * This file defines the service responsible for fetching data from TheMealDB API.
 * It uses the `HttpService` provided by Nest.js to send HTTP requests to the API endpoints.
 *
 * The `TheMealDBApiService` class provides methods for fetching meals by different criteria,
 * such as a random meal, a search query, an ID, a category, an area, or an ingredient.
 * Each method sends an HTTP request to the corresponding endpoint and returns the response data.
 *
 * The service also includes a private method `fetchData` that builds the endpoint URL
 * based on the provided endpoint and query parameters, sends an HTTP GET request to the URL,
 * and returns the response data.
 *
 * The service is exported as a singleton instance and can be injected into other classes or modules
 * that need to interact with TheMealDB API.
 */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TheMealDBApiService {
  constructor(private httpService: HttpService) {}

  /**
   * Fetches a random meal from TheMealDB API.
   * Returns the response data as a Promise.
   */
  async fetchRandomMeal() {
    return this.fetchData('random.php', {});
  }

  /**
   * Searches for meals by the given query string.
   * Returns the response data as a Promise.
   */
  async search(query: string) {
    return this.fetchData('search.php', { s: query });
  }

  /**
   * Fetches a meal by the given ID.
   * Returns the response data as a Promise.
   */
  async searchById(id: string) {
    return this.fetchData('lookup.php', { i: id });
  }

  /**
   * Filters meals by the given category.
   * Returns the response data as a Promise.
   */
  async filterByCategory(category: string) {
    return this.fetchData('filter.php', { c: category });
  }

  /**
   * Filters meals by the given area.
   * Returns the response data as a Promise.
   */
  async filterByArea(area: string) {
    return this.fetchData('filter.php', { a: area });
  }

  /**
   * Filters meals by the given ingredient.
   * Returns the response data as a Promise.
   */
  async filterByIngredient(ingredient: string) {
    return this.fetchData('filter.php', { i: ingredient });
  }

  /**
   * Builds the endpoint URL based on the provided endpoint and query parameters,
   * sends an HTTP GET request to the URL using `HttpService`, and returns the response data.
   * Returns the response data as a Promise.
   */
  private async fetchData(endpoint: string, params: Record<string, string>) {
    const url = new URL(endpoint, this.httpService.axiosRef.defaults.baseURL);
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value),
    );

    const response = await lastValueFrom(this.httpService.get(url.toString()));

    return response.data;
  }
}
