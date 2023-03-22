import { ErrorHandler } from './error-handler';
import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';

describe('ErrorHandler', () => {
  let errorHandler: ErrorHandler;

  beforeEach(() => {
    errorHandler = new ErrorHandler();
  });

  describe('handleError', () => {
    it('should return a HttpException for status code 401', () => {
      const error = {
        response: {
          status: 401,
          statusText: 'Unauthorized',
        },
      } as AxiosError;

      const result = errorHandler.handleError(error);

      expect(result).toBeInstanceOf(HttpException);
      expect(result.getStatus()).toBe(401);
      expect(result.getResponse()).toBe('Unauthorized');
    });

    it('should return a HttpException for status code 400', () => {
      const error = {
        response: {
          status: 400,
          statusText: 'Bad Request',
        },
      } as AxiosError;

      const result = errorHandler.handleError(error);

      expect(result).toBeInstanceOf(HttpException);
      expect(result.getStatus()).toBe(400);
      expect(result.getResponse()).toBe('Bad Request');
    });

    it('should return a HttpException for status code 404', () => {
      const error = {
        response: {
          status: 404,
          statusText: 'Not Found',
        },
      } as AxiosError;

      const result = errorHandler.handleError(error);

      expect(result).toBeInstanceOf(HttpException);
      expect(result.getStatus()).toBe(404);
      expect(result.getResponse()).toBe('Not Found');
    });

    it('should return a HttpException for status code 500', () => {
      const error = {
        response: {
          status: 500,
          statusText: 'Internal Server Error',
        },
      } as AxiosError;

      const result = errorHandler.handleError(error);

      expect(result).toBeInstanceOf(HttpException);
      expect(result.getStatus()).toBe(500);
      expect(result.getResponse()).toBe('An internal server error occurred');
    });

    it('should return a HttpException for a non-specified error', () => {
      const error = {
        response: {
          status: 999,
          statusText: 'Unknown Error',
        },
      } as AxiosError;

      const result = errorHandler.handleError(error);

      expect(result).toBeInstanceOf(HttpException);
      expect(result.getStatus()).toBe(500);
      expect(result.getResponse()).toBe(error.message);
    });
  });
});
