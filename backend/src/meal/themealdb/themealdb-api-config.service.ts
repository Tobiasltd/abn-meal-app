/**
 * This file defines the configuration service for TheMealDB API.
 * It implements the `HttpModuleOptionsFactory` interface to provide HTTP options
 * for the `HttpModule` used to send requests to TheMealDB API.
 *
 * The configuration service retrieves the base URL and API key for TheMealDB API
 * from the environment variables using the `ConfigService` provided by Nest.js.
 *
 * It exports the `TheMealDBApiConfigService` class that can be injected into other
 * classes or modules that require HTTP options for TheMealDB API.
 */
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TheMealDBApiConfigService implements HttpModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  /**
   * Implements the `createHttpOptions` method of the `HttpModuleOptionsFactory` interface.
   * It creates and returns an object with HTTP options for the `HttpModule`.
   *
   * The base URL and API key for TheMealDB API are retrieved from the environment variables
   * using the `ConfigService` provided by Nest.js.
   *
   * The HTTP options object includes the base URL and the `Content-Type` header set to `application/json`.
   */
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: `${this.configService.get(
        'MEAL_API_BASE_URL',
      )}/${this.configService.get('MEAL_API_KEY')}/`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
