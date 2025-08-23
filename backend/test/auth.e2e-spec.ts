import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('timestamp');
      });
  });

  it('/api/auth/signup (POST) - should validate email', () => {
    return request(app.getHttpServer())
      .post('/api/auth/signup')
      .send({
        email: 'invalid-email',
        password: 'password123',
      })
      .expect(400);
  });

  it('/api/auth/signup (POST) - should validate password length', () => {
    return request(app.getHttpServer())
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: '123',
      })
      .expect(400);
  });

  it('/api/auth/login (POST) - should validate required fields', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        // missing password
      })
      .expect(400);
  });

  // Note: Actual signup/login tests would require a test Supabase instance
  // For production, consider setting up a separate test database
});
