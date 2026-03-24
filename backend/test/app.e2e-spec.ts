import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('EPIC-01 foundation flow', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns health status', async () => {
    await request(app.getHttpServer())
      .get('/api/platform/health')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('logs in and returns tenant-scoped sites', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        customerId: 'tenant-acme',
        email: 'admin@acmeparking.test',
        password: 'ChangeMe123!',
      })
      .expect(201);

    await request(app.getHttpServer())
      .get('/api/sites')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .set('x-customer-id', 'tenant-acme')
      .expect(200)
      .expect(({ body }) => {
        expect(body.items).toHaveLength(1);
        expect(body.items[0].customerId).toBe('tenant-acme');
      });
  });

  it('rejects a missing tenant header', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        customerId: 'tenant-acme',
        email: 'admin@acmeparking.test',
        password: 'ChangeMe123!',
      })
      .expect(201);

    await request(app.getHttpServer())
      .get('/api/sites')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .expect(401);
  });

  it('rejects a tenant mismatch between header and token', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        customerId: 'tenant-acme',
        email: 'admin@acmeparking.test',
        password: 'ChangeMe123!',
      })
      .expect(201);

    await request(app.getHttpServer())
      .get('/api/sites')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .set('x-customer-id', 'tenant-skyline')
      .expect(401);
  });
});
