"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const stores_service_1 = require("./stores.service");
const prisma_service_1 = require("../../database/prisma.service");
describe('StoresService', () => {
    let service;
    let prisma;
    const mockPrismaService = {
        store: {
            findMany: jest.fn(),
            findFirst: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            count: jest.fn(),
        },
        lease: {
            count: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                stores_service_1.StoresService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get(stores_service_1.StoresService);
        prisma = module.get(prisma_service_1.PrismaService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('findAll', () => {
        it('should return all stores for tenant', async () => {
            const mockStores = [
                { id: 's1', name: 'Store 1', tenantId: 't1' },
                { id: 's2', name: 'Store 2', tenantId: 't1' },
            ];
            mockPrismaService.store.findMany.mockResolvedValue(mockStores);
            const result = await service.findAll('t1');
            expect(result).toEqual(mockStores);
            expect(prisma.store.findMany).toHaveBeenCalledWith({
                where: { tenantId: 't1' },
                include: expect.any(Object),
                orderBy: { createdAt: 'desc' },
            });
        });
        it('should filter by city if provided', async () => {
            mockPrismaService.store.findMany.mockResolvedValue([]);
            await service.findAll('t1', { city: 'İstanbul' });
            const call = prisma.store.findMany.mock.calls[0][0];
            expect(call.where.city).toBe('İstanbul');
        });
        it('should search by name or code if search provided', async () => {
            mockPrismaService.store.findMany.mockResolvedValue([]);
            await service.findAll('t1', { search: 'test' });
            const call = prisma.store.findMany.mock.calls[0][0];
            expect(call.where.OR).toBeDefined();
        });
    });
    describe('findOne', () => {
        it('should throw NotFoundException if store not found', async () => {
            mockPrismaService.store.findFirst.mockResolvedValue(null);
            await expect(service.findOne('s1', 't1')).rejects.toThrow(common_1.NotFoundException);
        });
        it('should return store with relations', async () => {
            const mockStore = {
                id: 's1',
                name: 'Test Store',
                tenantId: 't1',
                mall: { id: 'm1', name: 'Test Mall' },
            };
            mockPrismaService.store.findFirst.mockResolvedValue(mockStore);
            const result = await service.findOne('s1', 't1');
            expect(result).toEqual(mockStore);
        });
    });
    describe('create', () => {
        it('should throw ConflictException if code already exists', async () => {
            mockPrismaService.store.findUnique.mockResolvedValue({ id: 's1' });
            await expect(service.create('t1', {
                name: 'Store',
                code: 'DUPLICATE',
                country: 'Turkey',
                city: 'Istanbul',
                address: 'Address',
                squareMeters: 100,
            })).rejects.toThrow(common_1.ConflictException);
        });
        it('should create store successfully', async () => {
            const createDto = {
                name: 'New Store',
                code: 'NEW-001',
                country: 'Turkey',
                city: 'Istanbul',
                address: 'Test Address',
                squareMeters: 150,
            };
            mockPrismaService.store.findUnique.mockResolvedValue(null);
            mockPrismaService.store.create.mockResolvedValue({
                id: 's1',
                ...createDto,
                tenantId: 't1',
                status: 'PLANNING',
            });
            const result = await service.create('t1', createDto);
            expect(result.name).toBe('New Store');
            expect(result.tenantId).toBe('t1');
        });
    });
    describe('remove', () => {
        it('should throw NotFoundException if store not found', async () => {
            mockPrismaService.store.findFirst.mockResolvedValue(null);
            await expect(service.remove('s1', 't1')).rejects.toThrow(common_1.NotFoundException);
        });
        it('should throw ConflictException if store has active leases', async () => {
            mockPrismaService.store.findFirst.mockResolvedValue({ id: 's1' });
            mockPrismaService.lease.count.mockResolvedValue(2);
            await expect(service.remove('s1', 't1')).rejects.toThrow(common_1.ConflictException);
        });
        it('should delete store successfully if no active leases', async () => {
            mockPrismaService.store.findFirst.mockResolvedValue({ id: 's1' });
            mockPrismaService.lease.count.mockResolvedValue(0);
            mockPrismaService.store.delete.mockResolvedValue({ id: 's1' });
            const result = await service.remove('s1', 't1');
            expect(result.success).toBe(true);
            expect(prisma.store.delete).toHaveBeenCalledWith({ where: { id: 's1' } });
        });
    });
    describe('getStatistics', () => {
        it('should return aggregated statistics', async () => {
            mockPrismaService.store.count
                .mockResolvedValueOnce(10)
                .mockResolvedValueOnce(8)
                .mockResolvedValueOnce(1)
                .mockResolvedValueOnce(1);
            mockPrismaService.store.findMany.mockResolvedValue([
                { city: 'Istanbul' },
                { city: 'Istanbul' },
                { city: 'Ankara' },
            ]);
            const result = await service.getStatistics('t1');
            expect(result.total).toBe(10);
            expect(result.active).toBe(8);
            expect(result.byCity).toHaveLength(2);
        });
    });
    describe('update', () => {
        it('should throw NotFoundException if store not found', async () => {
            mockPrismaService.store.findFirst.mockResolvedValue(null);
            await expect(service.update('s1', 't1', { name: 'Updated Store' })).rejects.toThrow(common_1.NotFoundException);
        });
        it('should update store successfully', async () => {
            mockPrismaService.store.findFirst.mockResolvedValue({ id: 's1', tenantId: 't1' });
            mockPrismaService.store.update.mockResolvedValue({
                id: 's1',
                name: 'Updated Store',
                tenantId: 't1',
            });
            const result = await service.update('s1', 't1', { name: 'Updated Store' });
            expect(result.name).toBe('Updated Store');
            expect(prisma.store.update).toHaveBeenCalled();
        });
        it('should handle date transformation in update', async () => {
            mockPrismaService.store.findFirst.mockResolvedValue({ id: 's1' });
            mockPrismaService.store.update.mockResolvedValue({ id: 's1' });
            await service.update('s1', 't1', { openingDate: '2024-01-01' });
            const call = prisma.store.update.mock.calls[0][0];
            expect(call.data.openingDate).toBeInstanceOf(Date);
        });
    });
});
//# sourceMappingURL=stores.service.spec.js.map