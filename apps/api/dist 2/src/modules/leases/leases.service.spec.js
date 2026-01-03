"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const leases_service_1 = require("./leases.service");
const prisma_service_1 = require("../../database/prisma.service");
describe('LeasesService', () => {
    let service;
    let prisma;
    const mockPrismaService = {
        lease: {
            findMany: jest.fn(),
            findFirst: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            count: jest.fn(),
        },
        leaseRenewal: {
            create: jest.fn(),
            findFirst: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                leases_service_1.LeasesService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get(leases_service_1.LeasesService);
        prisma = module.get(prisma_service_1.PrismaService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('findExpiring', () => {
        it('should return leases expiring within specified days', async () => {
            const mockLeases = [
                {
                    id: 'l1',
                    contractNumber: 'CNT-001',
                    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
                    status: 'ACTIVE',
                },
            ];
            mockPrismaService.lease.findMany.mockResolvedValue(mockLeases);
            const result = await service.findExpiring('t1', 90);
            expect(result).toHaveLength(1);
            const call = prisma.lease.findMany.mock.calls[0][0];
            expect(call.where.endDate).toBeDefined();
            expect(call.where.status.in).toContain('ACTIVE');
        });
    });
    describe('create', () => {
        it('should throw ConflictException if contract number exists', async () => {
            mockPrismaService.lease.findUnique.mockResolvedValue({ id: 'l1' });
            await expect(service.create('t1', {
                storeId: 's1',
                contractNumber: 'DUPLICATE',
                startDate: '2024-01-01',
                endDate: '2029-12-31',
                monthlyRent: 50000,
                escalationType: 'FIXED_PERCENTAGE',
                escalationRate: 15,
            })).rejects.toThrow(common_1.ConflictException);
        });
        it('should create lease with proper data transformation', async () => {
            mockPrismaService.lease.findUnique.mockResolvedValue(null);
            mockPrismaService.lease.create.mockResolvedValue({
                id: 'l1',
                contractNumber: 'CNT-001',
                status: 'ACTIVE',
            });
            const result = await service.create('t1', {
                storeId: 's1',
                contractNumber: 'CNT-001',
                startDate: '2024-01-01',
                endDate: '2029-12-31',
                monthlyRent: 50000,
                escalationType: 'FIXED_PERCENTAGE',
                escalationRate: 15,
            });
            expect(result.status).toBe('ACTIVE');
            const createCall = prisma.lease.create.mock.calls[0][0];
            expect(createCall.data.startDate).toBeInstanceOf(Date);
            expect(createCall.data.endDate).toBeInstanceOf(Date);
        });
    });
    describe('calculateCurrentRent', () => {
        it('should calculate escalated rent correctly', async () => {
            const mockLease = {
                id: 'l1',
                monthlyRent: 10000,
                escalationType: 'FIXED_PERCENTAGE',
                escalationRate: 10,
                startDate: new Date('2020-01-01'),
                endDate: new Date('2025-12-31'),
                tenantId: 't1',
            };
            mockPrismaService.lease.findFirst.mockResolvedValue(mockLease);
            const result = await service.calculateCurrentRent('l1', 't1');
            expect(result.baseRent).toBe(10000);
            expect(result.currentRent).toBeGreaterThan(10000);
            expect(result.yearsElapsed).toBeGreaterThan(0);
        });
        it('should return base rent if escalation type is NONE', async () => {
            const mockLease = {
                id: 'l1',
                monthlyRent: 10000,
                escalationType: 'NONE',
                escalationRate: 0,
                startDate: new Date('2020-01-01'),
                endDate: new Date('2025-12-31'),
                tenantId: 't1',
            };
            mockPrismaService.lease.findFirst.mockResolvedValue(mockLease);
            const result = await service.calculateCurrentRent('l1', 't1');
            expect(result.currentRent).toBe(10000);
        });
    });
    describe('initiateRenewal', () => {
        it('should throw ConflictException if renewal already pending', async () => {
            mockPrismaService.lease.findFirst.mockResolvedValue({ id: 'l1' });
            mockPrismaService.leaseRenewal.findFirst.mockResolvedValue({
                id: 'r1',
                status: 'PENDING'
            });
            await expect(service.initiateRenewal('l1', 't1')).rejects.toThrow(common_1.ConflictException);
        });
        it('should create renewal record successfully', async () => {
            mockPrismaService.lease.findFirst.mockResolvedValue({ id: 'l1' });
            mockPrismaService.leaseRenewal.findFirst.mockResolvedValue(null);
            mockPrismaService.leaseRenewal.create.mockResolvedValue({
                id: 'r1',
                leaseId: 'l1',
                status: 'PENDING',
            });
            const result = await service.initiateRenewal('l1', 't1');
            expect(result.status).toBe('PENDING');
        });
        it('should throw NotFoundException if lease not found', async () => {
            mockPrismaService.lease.findFirst.mockResolvedValue(null);
            await expect(service.initiateRenewal('nonexistent', 't1')).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('findAll', () => {
        it('should return all leases for tenant', async () => {
            const mockLeases = [
                { id: 'l1', contractNumber: 'CNT-001', tenantId: 't1' },
                { id: 'l2', contractNumber: 'CNT-002', tenantId: 't1' },
            ];
            mockPrismaService.lease.findMany.mockResolvedValue(mockLeases);
            const result = await service.findAll('t1');
            expect(result).toHaveLength(2);
            expect(prisma.lease.findMany).toHaveBeenCalledWith({
                where: { tenantId: 't1' },
                include: expect.any(Object),
                orderBy: { createdAt: 'desc' },
            });
        });
        it('should filter by status if provided', async () => {
            mockPrismaService.lease.findMany.mockResolvedValue([]);
            await service.findAll('t1', { status: 'ACTIVE' });
            const call = prisma.lease.findMany.mock.calls[0][0];
            expect(call.where.status).toBe('ACTIVE');
        });
    });
    describe('findOne', () => {
        it('should throw NotFoundException if lease not found', async () => {
            mockPrismaService.lease.findFirst.mockResolvedValue(null);
            await expect(service.findOne('nonexistent', 't1')).rejects.toThrow(common_1.NotFoundException);
        });
        it('should return lease with calculated days remaining', async () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 100);
            const mockLease = {
                id: 'l1',
                contractNumber: 'CNT-001',
                startDate: new Date('2024-01-01'),
                endDate: futureDate,
                tenantId: 't1',
            };
            mockPrismaService.lease.findFirst.mockResolvedValue(mockLease);
            const result = await service.findOne('l1', 't1');
            expect(result).toHaveProperty('daysRemaining');
            expect(result.daysRemaining).toBeGreaterThan(0);
            expect(result).toHaveProperty('isExpiringSoon');
        });
    });
    describe('update', () => {
        it('should throw NotFoundException if lease not found', async () => {
            mockPrismaService.lease.findFirst.mockResolvedValue(null);
            await expect(service.update('l1', 't1', { monthlyRent: 60000 })).rejects.toThrow(common_1.NotFoundException);
        });
        it('should update lease successfully', async () => {
            mockPrismaService.lease.findFirst.mockResolvedValue({ id: 'l1' });
            mockPrismaService.lease.update.mockResolvedValue({
                id: 'l1',
                monthlyRent: 60000,
            });
            const result = await service.update('l1', 't1', { monthlyRent: 60000 });
            expect(result.monthlyRent).toBe(60000);
        });
    });
});
//# sourceMappingURL=leases.service.spec.js.map