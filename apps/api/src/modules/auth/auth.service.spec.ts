/**
 * Auth Service Unit Tests
 * Tests for authentication business logic
 * 
 * Auth Servisi Birim Testleri
 * Kimlik doğrulama iş mantığı testleri
 */

import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    tenant: {
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'JWT_SECRET') return 'test-secret';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return null if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.validateUser('test@test.com', 'password');

      expect(result).toBeNull();
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
        include: { tenant: true },
      });
    });

    it('should return null if password is invalid', async () => {
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        password: await bcrypt.hash('correctpassword', 12),
        status: 'ACTIVE',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.validateUser('test@test.com', 'wrongpassword');

      expect(result).toBeNull();
    });

    it('should return user if credentials are valid', async () => {
      const hashedPassword = await bcrypt.hash('password123', 12);
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        password: hashedPassword,
        status: 'ACTIVE',
        tenant: { id: 't1', name: 'Test Tenant' },
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.validateUser('test@test.com', 'password123');

      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if user is not active', async () => {
      const hashedPassword = await bcrypt.hash('password123', 12);
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        password: hashedPassword,
        status: 'INACTIVE',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.validateUser('test@test.com', 'password123')
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should throw ConflictException if user already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({ id: '1' });

      await expect(
        service.register({
          email: 'existing@test.com',
          password: 'password',
          firstName: 'Test',
          lastName: 'User',
        })
      ).rejects.toThrow(ConflictException);
    });

    it('should create user with hashed password', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.tenant.create.mockResolvedValue({
        id: 't1',
        name: "Test's Organization",
      });
      mockPrismaService.user.create.mockResolvedValue({
        id: 'u1',
        email: 'new@test.com',
        firstName: 'Test',
        lastName: 'User',
        tenantId: 't1',
        role: 'USER',
        tenant: { id: 't1', name: "Test's Organization" },
      });
      mockJwtService.sign.mockReturnValue('mock-token');

      const result = await service.register({
        email: 'new@test.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('user');
      expect(prisma.user.create).toHaveBeenCalled();
      
      const createCall = (prisma.user.create as jest.Mock).mock.calls[0][0];
      expect(createCall.data.password).not.toBe('password123');
    });
  });

  describe('login', () => {
    it('should update lastLoginAt and return tokens', async () => {
      const mockUser = {
        id: 'u1',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'USER',
        tenantId: 't1',
        tenant: { id: 't1', name: 'Test Tenant', domain: 'test' },
      };

      mockPrismaService.user.update.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('mock-token');

      const result = await service.login(mockUser);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'u1' },
        data: { lastLoginAt: expect.any(Date) },
      });
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@test.com');
    });
  });

  describe('refreshToken', () => {
    it('should throw UnauthorizedException if token is invalid', async () => {
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(
        service.refreshToken('invalid-token')
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return new tokens if refresh token is valid', async () => {
      const mockPayload = { sub: 'u1', email: 'test@test.com' };
      const mockUser = {
        id: 'u1',
        email: 'test@test.com',
        status: 'ACTIVE',
        tenantId: 't1',
      };

      mockJwtService.verify.mockReturnValue(mockPayload);
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('new-token');

      const result = await service.refreshToken('valid-refresh-token');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });
});

















