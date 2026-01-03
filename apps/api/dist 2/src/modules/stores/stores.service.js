"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let StoresService = class StoresService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
        if (filters?.city) {
            where.city = filters.city;
        }
        if (filters?.brand) {
            where.brand = filters.brand;
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { code: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        const stores = await this.prisma.store.findMany({
            where,
            include: {
                mall: true,
                leases: {
                    where: { status: 'ACTIVE' },
                    take: 1,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return stores;
    }
    async findOne(id, tenantId) {
        const store = await this.prisma.store.findFirst({
            where: { id, tenantId },
            include: {
                mall: true,
                leases: { orderBy: { createdAt: 'desc' } },
                analytics: {
                    orderBy: [{ year: 'desc' }, { month: 'desc' }],
                    take: 12,
                },
            },
        });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${id} not found`);
        }
        return store;
    }
    async create(tenantId, createDto) {
        const existing = await this.prisma.store.findUnique({
            where: { code: createDto.code },
        });
        if (existing) {
            throw new common_1.ConflictException(`Store with code ${createDto.code} already exists`);
        }
        const data = {
            ...createDto,
            tenantId,
            status: createDto.status || 'PLANNING',
        };
        if (createDto.openingDate) {
            data.openingDate = new Date(createDto.openingDate);
        }
        return this.prisma.store.create({
            data,
            include: { mall: true },
        });
    }
    async update(id, tenantId, updateDto) {
        const store = await this.prisma.store.findFirst({
            where: { id, tenantId },
        });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${id} not found`);
        }
        const data = { ...updateDto };
        if (updateDto.openingDate) {
            data.openingDate = new Date(updateDto.openingDate);
        }
        if (updateDto.closingDate) {
            data.closingDate = new Date(updateDto.closingDate);
        }
        return this.prisma.store.update({
            where: { id },
            data,
            include: { mall: true },
        });
    }
    async remove(id, tenantId) {
        const store = await this.prisma.store.findFirst({
            where: { id, tenantId },
        });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${id} not found`);
        }
        const activeLeases = await this.prisma.lease.count({
            where: {
                storeId: id,
                status: { in: ['ACTIVE', 'PENDING_APPROVAL', 'APPROVED'] },
            },
        });
        if (activeLeases > 0) {
            throw new common_1.ConflictException(`Cannot delete store with ${activeLeases} active lease(s). Please terminate leases first.`);
        }
        await this.prisma.store.delete({ where: { id } });
        return {
            success: true,
            message: 'Store deleted successfully',
        };
    }
    async getStatistics(tenantId) {
        const total = await this.prisma.store.count({ where: { tenantId } });
        const active = await this.prisma.store.count({
            where: { tenantId, status: 'ACTIVE' },
        });
        const planning = await this.prisma.store.count({
            where: { tenantId, status: 'PLANNING' },
        });
        const closed = await this.prisma.store.count({
            where: { tenantId, status: 'CLOSED' },
        });
        return {
            total,
            active,
            planning,
            closed,
            byCity: await this.getStoresByCity(tenantId),
        };
    }
    async getStoresByCity(tenantId) {
        const stores = await this.prisma.store.findMany({
            where: { tenantId },
            select: { city: true },
        });
        const grouped = stores.reduce((acc, store) => {
            acc[store.city] = (acc[store.city] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(grouped).map(([city, count]) => ({ city, count }));
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoresService);
//# sourceMappingURL=stores.service.js.map