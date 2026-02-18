/**
 * Segment E2E Tests
 * Tests for customer segment selection, update, and access control
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Customer Segment (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let userToken: string;

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

  describe('Registration with segment', () => {
    it('should register with a valid customerSegment and persist it on tenant', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: `seg-test-${Date.now()}@example.com`,
          password: 'password123',
          firstName: 'Segment',
          lastName: 'Test',
          customerSegment: 'A1_SOLO_MARKA',
        })
        .expect(201);

      expect(res.body).toHaveProperty('accessToken');
      expect(res.body.user).toHaveProperty('customerSegment', 'A1_SOLO_MARKA');
      adminToken = res.body.accessToken;
    });

    it('should register without segment (backward compat)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: `noseg-${Date.now()}@example.com`,
          password: 'password123',
          firstName: 'NoSeg',
          lastName: 'User',
        })
        .expect(201);

      expect(res.body.user.customerSegment).toBeNull();
    });

    it('should reject invalid segment enum value', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: `badseg-${Date.now()}@example.com`,
          password: 'password123',
          firstName: 'Bad',
          lastName: 'Seg',
          customerSegment: 'INVALID_SEGMENT',
        })
        .expect(400);
    });
  });

  describe('Tenant profile includes segment', () => {
    it('should return customerSegment in tenant profile', async () => {
      if (!adminToken) return;

      const res = await request(app.getHttpServer())
        .get('/api/v1/tenant/profile')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('customerSegment');
    });
  });

  describe('Segment update — role-based access', () => {
    it('should allow ADMIN to update segment', async () => {
      if (!adminToken) return;

      const res = await request(app.getHttpServer())
        .patch('/api/v1/tenant/segment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ customerSegment: 'A2_KENDI_ZINCIRI' })
        .expect(200);

      expect(res.body.customerSegment).toBe('A2_KENDI_ZINCIRI');
    });

    it('should reject invalid segment value on update', async () => {
      if (!adminToken) return;

      return request(app.getHttpServer())
        .patch('/api/v1/tenant/segment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ customerSegment: 'NOT_A_SEGMENT' })
        .expect(400);
    });

    it('should require authentication for segment update', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/tenant/segment')
        .send({ customerSegment: 'A1_SOLO_MARKA' })
        .expect(401);
    });
  });

  describe('Audit logging', () => {
    it('should update segmentUpdatedAt on segment change', async () => {
      if (!adminToken) return;

      await request(app.getHttpServer())
        .patch('/api/v1/tenant/segment')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ customerSegment: 'A3_FRANCHISE_ALAN' })
        .expect(200);

      const profile = await request(app.getHttpServer())
        .get('/api/v1/tenant/profile')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(profile.body.segmentUpdatedAt).toBeTruthy();
    });
  });
});
