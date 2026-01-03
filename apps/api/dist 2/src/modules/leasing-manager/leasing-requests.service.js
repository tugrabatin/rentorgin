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
exports.LeasingRequestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let LeasingRequestsService = class LeasingRequestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
        if (filters?.type) {
            where.type = filters.type;
        }
        if (filters?.source) {
            where.source = filters.source;
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        if (filters?.priority) {
            where.priority = filters.priority;
        }
        if (filters?.assignedToId) {
            where.assignedToId = filters.assignedToId;
        }
        if (filters?.storeId) {
            where.storeId = filters.storeId;
        }
        if (filters?.mallId) {
            where.mallId = filters.mallId;
        }
        if (filters?.franchiseProjectId) {
            where.franchiseProjectId = filters.franchiseProjectId;
        }
        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.leasingRequest.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, tenantId) {
        const request = await this.prisma.leasingRequest.findFirst({
            where: { id, tenantId },
        });
        if (!request) {
            throw new common_1.NotFoundException(`Leasing request with ID ${id} not found`);
        }
        return request;
    }
    async create(tenantId, userId, createDto) {
        const data = {
            ...createDto,
            tenantId,
            createdById: userId,
            source: createDto.source || 'INTERNAL',
            priority: createDto.priority || 'MEDIUM',
            status: 'OPEN',
        };
        if (createDto.dueDate) {
            data.dueDate = new Date(createDto.dueDate);
        }
        return this.prisma.leasingRequest.create({ data });
    }
    async update(id, tenantId, updateDto) {
        const request = await this.prisma.leasingRequest.findFirst({
            where: { id, tenantId },
        });
        if (!request) {
            throw new common_1.NotFoundException(`Leasing request with ID ${id} not found`);
        }
        const data = { ...updateDto };
        if (updateDto.dueDate) {
            data.dueDate = new Date(updateDto.dueDate);
        }
        if (updateDto.status === 'RESOLVED' && request.status !== 'RESOLVED') {
            data.resolvedAt = new Date();
        }
        return this.prisma.leasingRequest.update({
            where: { id },
            data,
        });
    }
    async resolve(id, tenantId, userId, resolution) {
        const request = await this.prisma.leasingRequest.findFirst({
            where: { id, tenantId },
        });
        if (!request) {
            throw new common_1.NotFoundException(`Leasing request with ID ${id} not found`);
        }
        return this.prisma.leasingRequest.update({
            where: { id },
            data: {
                status: 'RESOLVED',
                resolution,
                resolvedAt: new Date(),
                resolvedById: userId,
            },
        });
    }
    async reject(id, tenantId, userId, reason) {
        const request = await this.prisma.leasingRequest.findFirst({
            where: { id, tenantId },
        });
        if (!request) {
            throw new common_1.NotFoundException(`Leasing request with ID ${id} not found`);
        }
        return this.prisma.leasingRequest.update({
            where: { id },
            data: {
                status: 'REJECTED',
                resolution: reason,
                resolvedAt: new Date(),
                resolvedById: userId,
            },
        });
    }
    async remove(id, tenantId) {
        const request = await this.prisma.leasingRequest.findFirst({
            where: { id, tenantId },
        });
        if (!request) {
            throw new common_1.NotFoundException(`Leasing request with ID ${id} not found`);
        }
        await this.prisma.leasingRequest.delete({ where: { id } });
        return {
            success: true,
            message: 'Leasing request deleted successfully',
        };
    }
    async getStatistics(tenantId) {
        const total = await this.prisma.leasingRequest.count({ where: { tenantId } });
        const open = await this.prisma.leasingRequest.count({
            where: { tenantId, status: 'OPEN' },
        });
        const inProgress = await this.prisma.leasingRequest.count({
            where: { tenantId, status: 'IN_PROGRESS' },
        });
        const resolved = await this.prisma.leasingRequest.count({
            where: { tenantId, status: 'RESOLVED' },
        });
        const byType = await this.getRequestsByType(tenantId);
        const bySource = await this.getRequestsBySource(tenantId);
        const avgResolutionTime = await this.getAvgResolutionTime(tenantId);
        return {
            total,
            open,
            inProgress,
            resolved,
            byType,
            bySource,
            avgResolutionTime,
        };
    }
    async getRequestsByType(tenantId) {
        const requests = await this.prisma.leasingRequest.findMany({
            where: { tenantId },
            select: { type: true },
        });
        const grouped = requests.reduce((acc, request) => {
            acc[request.type] = (acc[request.type] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(grouped).map(([type, count]) => ({ type, count }));
    }
    async getRequestsBySource(tenantId) {
        const requests = await this.prisma.leasingRequest.findMany({
            where: { tenantId },
            select: { source: true },
        });
        const grouped = requests.reduce((acc, request) => {
            acc[request.source] = (acc[request.source] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(grouped).map(([source, count]) => ({ source, count }));
    }
    async getAvgResolutionTime(tenantId) {
        const resolved = await this.prisma.leasingRequest.findMany({
            where: {
                tenantId,
                status: { in: ['RESOLVED', 'REJECTED'] },
                resolvedAt: { not: null },
            },
            select: {
                createdAt: true,
                resolvedAt: true,
            },
        });
        if (resolved.length === 0)
            return 0;
        const totalDays = resolved.reduce((sum, request) => {
            const diff = request.resolvedAt.getTime() - request.createdAt.getTime();
            return sum + diff / (1000 * 60 * 60 * 24);
        }, 0);
        return Math.round(totalDays / resolved.length);
    }
};
exports.LeasingRequestsService = LeasingRequestsService;
exports.LeasingRequestsService = LeasingRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeasingRequestsService);
//# sourceMappingURL=leasing-requests.service.js.map