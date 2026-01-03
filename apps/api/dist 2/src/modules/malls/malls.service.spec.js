"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const malls_service_1 = require("./malls.service");
const prisma_service_1 = require("../../database/prisma.service");
describe('MallsService', () => {
    let service;
    let prisma;
    const mockPrismaService = {
        mall: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                malls_service_1.MallsService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get(malls_service_1.MallsService);
        prisma = module.get(prisma_service_1.PrismaService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('findAll', () => {
        it('should return all malls with contacts and stores', async () => {
            const mockMalls = [
                {
                    id: 'm1',
                    name: 'Test Mall',
                    type: 'SHOPPING_MALL',
                    contacts: [],
                    stores: [],
                },
            ];
            mockPrismaService.mall.findMany.mockResolvedValue(mockMalls);
            const result = await service.findAll();
            expect(result).toEqual(mockMalls);
            expect(prisma.mall.findMany).toHaveBeenCalledWith({
                include: { contacts: true, stores: true },
            });
        });
        it('should return empty array if no malls exist', async () => {
            mockPrismaService.mall.findMany.mockResolvedValue([]);
            const result = await service.findAll();
            expect(result).toEqual([]);
        });
    });
    describe('findOne', () => {
        it('should return mall with all relations', async () => {
            const mockMall = {
                id: 'm1',
                name: 'Test Mall',
                contacts: [{ id: 'c1', name: 'John Doe' }],
                stores: [{ id: 's1', name: 'Store 1' }],
                leases: [],
                negotiations: [],
            };
            mockPrismaService.mall.findUnique.mockResolvedValue(mockMall);
            const result = await service.findOne('m1');
            expect(result).toEqual(mockMall);
            expect(prisma.mall.findUnique).toHaveBeenCalledWith({
                where: { id: 'm1' },
                include: {
                    contacts: true,
                    stores: true,
                    leases: true,
                    negotiations: true,
                },
            });
        });
    });
    describe('create', () => {
        it('should create new mall successfully', async () => {
            const createData = {
                name: 'New Mall',
                type: 'SHOPPING_MALL',
                country: 'Turkey',
                city: 'Istanbul',
                address: 'Test Address',
                tenantId: 't1',
            };
            mockPrismaService.mall.create.mockResolvedValue({
                id: 'm1',
                ...createData,
            });
            const result = await service.create(createData);
            expect(result.name).toBe('New Mall');
            expect(prisma.mall.create).toHaveBeenCalledWith({ data: createData });
        });
    });
    describe('updateRelationship', () => {
        it('should update mall relationship quality', async () => {
            const mockMall = {
                id: 'm1',
                relationshipQuality: 'EXCELLENT',
            };
            mockPrismaService.mall.update.mockResolvedValue(mockMall);
            const result = await service.updateRelationship('m1', 'EXCELLENT');
            expect(result.relationshipQuality).toBe('EXCELLENT');
            expect(prisma.mall.update).toHaveBeenCalledWith({
                where: { id: 'm1' },
                data: { relationshipQuality: 'EXCELLENT' },
            });
        });
        it('should accept all relationship quality values', async () => {
            const qualities = ['EXCELLENT', 'GOOD', 'NEUTRAL', 'FAIR', 'POOR'];
            for (const quality of qualities) {
                mockPrismaService.mall.update.mockResolvedValue({
                    id: 'm1',
                    relationshipQuality: quality,
                });
                const result = await service.updateRelationship('m1', quality);
                expect(result.relationshipQuality).toBe(quality);
            }
            expect(prisma.mall.update).toHaveBeenCalledTimes(5);
        });
    });
});
//# sourceMappingURL=malls.service.spec.js.map