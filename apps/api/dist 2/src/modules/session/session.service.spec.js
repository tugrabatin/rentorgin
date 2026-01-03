"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const session_service_1 = require("./session.service");
const prisma_service_1 = require("../../database/prisma.service");
describe('SessionService', () => {
    let service;
    let prisma;
    const mockPrismaService = {
        userSession: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                session_service_1.SessionService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get(session_service_1.SessionService);
        prisma = module.get(prisma_service_1.PrismaService);
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
//# sourceMappingURL=session.service.spec.js.map