/**
 * Auth E2E Tests
 * End-to-end tests for authentication endpoints
 * 
 * Auth E2E Testleri
 * Kimlik doğrulama endpoint'leri için uçtan uca testler
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/v1/auth/register (POST)', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: `test${Date.now()}@example.com`,
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toContain('@example.com');
        });
    });

    it('should fail with invalid email', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
        })
        .expect(400);
    });

    it('should fail with short password', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: '123',
          firstName: 'Test',
          lastName: 'User',
        })
        .expect(400);
    });
  });

  describe('/api/v1/auth/login (POST)', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@demo.com',
          password: 'demo123',
        })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      accessToken = response.body.accessToken;
    });

    it('should fail with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@demo.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('/api/v1/auth/profile (GET)', () => {
    it('should return user profile with valid token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('user');
          expect(res.body.user).toHaveProperty('email');
        });
    });

    it('should fail without token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/auth/profile')
        .expect(401);
    });

    it('should fail with invalid token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});
















