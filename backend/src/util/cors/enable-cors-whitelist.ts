import {
  INestApplication,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';

/**
* This function enables CORS for the given whitelist of origins.
* It will block all other origins.
* It can simply be called from the main.ts file.
* @param app The NestJS application
* @param whitelist An array of origins.
  Example of whitelist array: ['http://localhost:3000', 'http://localhost:3001']
* @returns void
**/

export const enableCorsWhitelist = (
  app: INestApplication,
  whitelist: string[],
) => {
  app.enableCors({
    origin: function (origin, callback) {
      if (
        process.env.NODE_ENV === 'development' ||
        whitelist.indexOf(origin) !== -1
      ) {
        callback(null, true);
      } else {
        Logger.error(`blocked cors for: ${origin}`);
        callback(new UnauthorizedException('Not allowed by CORS'));
      }
    },
  });
};
