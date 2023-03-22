import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { AxiosError } from 'axios';

@Injectable()
export class ErrorHandler {
  private readonly logger = new Logger(ErrorHandler.name);

  /**
   * Handles the error.
   * This method will call the appropriate method to handle the error based on its type. Expand this method to add more error handling.
   * @param error The error to handle
   * @returns The handled error as a HttpException
   */
  handleError(error: AxiosError): HttpException {
    switch (error.response.status) {
      case 401:
        return this.handleUnauthorizedError(error);
      case 400:
        return this.handleBadRequestError(error);
      case 404:
        return this.handleNotFoundError(error);
      case 500:
        return this.handleInternalServerError(error);
      default:
        return this.handleHttpException(error);
    }
  }

  /**
   * Handles non specified HttpException errors.
   *
   * @param error The HttpException error to handle
   * @returns The handled error as a HttpException
   */
  handleHttpException(error: AxiosError) {
    this.logger.error(
      `${error.response.status} - ${error.response.statusText}`,
    );
    return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /**
   * Handles the error when the API key is invalid.
   *
   * @param error The error to handle
   * @returns The handled error as a HttpException with status code 401
   */
  handleUnauthorizedError(error: AxiosError) {
    this.logger.error(`401 - Unauthorized - ${error.stack}`);
    return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  /**
   * Handles the error when a bad request was made.
   *
   * @param error The error to handle
   * @returns The handled error as a HttpException with status code 400
   */
  handleBadRequestError(error: AxiosError) {
    this.logger.error(`400 - Bad Request - ${error.stack}`);
    return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }

  /**
   * Handles the error when a resource was not found.
   *
   * @param error The error to handle
   * @returns The handled error as a HttpException with status code 404
   */
  handleNotFoundError(error: AxiosError) {
    this.logger.error(`404 - Not Found - ${error.stack}`);
    return new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  /**
   * Handles any internal server error.
   *
   * @param error The error to handle
   * @returns The handled error as a HttpException with status code 500
   */
  handleInternalServerError(error: AxiosError) {
    this.logger.error(`500 - Internal Server Error - ${error.stack}`);
    return new HttpException(
      'An internal server error occurred',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
