import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { enableCorsWhitelist } from './enable-cors-whitelist';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';

describe('enableCorsWhitelist', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    app = testingModule.createNestApplication();
    enableCorsWhitelist(app, ['http://localhost:3000']);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should allow requests from the whitelist', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
      .set('Origin', 'http://localhost:3000')
      .expect(200);

    expect(response.header['access-control-allow-origin']).toBe(
      'http://localhost:3000',
    );
  });

  it('should block requests from non-whitelist origins', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
      .set('Origin', 'http://not-whitelisted.com')
      .expect(401);

    expect(response.header['access-control-allow-origin']).toBeUndefined();
    expect(response.status).toBe(401);
  });
});
