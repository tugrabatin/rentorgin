/**
 * Session Service Unit Tests
 * Tests for session management
 * 
 * Oturum Servisi Birim Testleri
 * Oturum yönetimi testleri
 */

import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './session.service';
import { PrismaService } from '../../database/prisma.service';

describe('SessionService', () => {
  let service: SessionService;
  let prisma: PrismaService;

  const mockPrismaService = {
    userSession: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SessionService>(SessionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('exportSession', () => {
    it('should create session export', async () => {
      const mockSession = {
        id: 'session1',
        userId: 'u1',
        tenantId: 't1',
        name: 'Test Session',
        sessionData: JSON.stringify({ test: 'data' }),
      };

      mockPrismaService.userSession.create.mockResolvedValue(mockSession);

      const result = await service.exportSession('u1', 'Test Session');

      expect(result).toHaveProperty('sessionId');
      expect(result).toHaveProperty('downloadUrl');
      expect(prisma.userSession.create).toHaveBeenCalled();
    });
  });

  describe('getUserSessions', () => {
    it('should return all sessions for user', async () => {
      const mockSessions = [
        { id: 's1', name: 'Session 1' },
        { id: 's2', name: 'Session 2' },
      ];

      mockPrismaService.userSession.findMany.mockResolvedValue(mockSessions);

      const result = await service.getUserSessions('u1');

      expect(result).toHaveLength(2);
      expect(prisma.userSession.findMany).toHaveBeenCalledWith({
        where: { userId: 'u1' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('getSession', () => {
    it('should return session by id', async () => {
      const mockSession = { id: 's1', name: 'Test Session' };

      mockPrismaService.userSession.findUnique.mockResolvedValue(mockSession);

      const result = await service.getSession('s1');

      expect(result).toEqual(mockSession);
    });
  });

  describe('importSession', () => {
    it('should return success message', async () => {
      const result = await service.importSession('u1', { test: 'data' });

      expect(result).toHaveProperty('success');
      expect(result.success).toBe(true);
    });
  });
});
















