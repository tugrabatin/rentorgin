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
exports.LeasingTasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let LeasingTasksService = class LeasingTasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
        if (filters?.category) {
            where.category = filters.category;
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
        return this.prisma.leasingTask.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, tenantId) {
        const task = await this.prisma.leasingTask.findFirst({
            where: { id, tenantId },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Leasing task with ID ${id} not found`);
        }
        return task;
    }
    async create(tenantId, createDto) {
        const data = {
            ...createDto,
            tenantId,
            priority: createDto.priority || 'MEDIUM',
            riskLevel: createDto.riskLevel || 'LOW',
            status: 'PENDING',
        };
        if (createDto.dueDate) {
            data.dueDate = new Date(createDto.dueDate);
        }
        return this.prisma.leasingTask.create({ data });
    }
    async update(id, tenantId, updateDto) {
        const task = await this.prisma.leasingTask.findFirst({
            where: { id, tenantId },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Leasing task with ID ${id} not found`);
        }
        const data = { ...updateDto };
        if (updateDto.dueDate) {
            data.dueDate = new Date(updateDto.dueDate);
        }
        if (updateDto.status === 'COMPLETED' && task.status !== 'COMPLETED') {
            data.completedAt = new Date();
        }
        return this.prisma.leasingTask.update({
            where: { id },
            data,
        });
    }
    async remove(id, tenantId) {
        const task = await this.prisma.leasingTask.findFirst({
            where: { id, tenantId },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Leasing task with ID ${id} not found`);
        }
        await this.prisma.leasingTask.delete({ where: { id } });
        return {
            success: true,
            message: 'Leasing task deleted successfully',
        };
    }
    async getStatistics(tenantId) {
        const total = await this.prisma.leasingTask.count({ where: { tenantId } });
        const pending = await this.prisma.leasingTask.count({
            where: { tenantId, status: 'PENDING' },
        });
        const inProgress = await this.prisma.leasingTask.count({
            where: { tenantId, status: 'IN_PROGRESS' },
        });
        const completed = await this.prisma.leasingTask.count({
            where: { tenantId, status: 'COMPLETED' },
        });
        const byCategory = await this.getTasksByCategory(tenantId);
        const byPriority = await this.getTasksByPriority(tenantId);
        return {
            total,
            pending,
            inProgress,
            completed,
            byCategory,
            byPriority,
        };
    }
    async getTasksByCategory(tenantId) {
        const tasks = await this.prisma.leasingTask.findMany({
            where: { tenantId },
            select: { category: true },
        });
        const grouped = tasks.reduce((acc, task) => {
            acc[task.category] = (acc[task.category] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(grouped).map(([category, count]) => ({ category, count }));
    }
    async getTasksByPriority(tenantId) {
        const tasks = await this.prisma.leasingTask.findMany({
            where: { tenantId, status: { not: 'COMPLETED' } },
            select: { priority: true },
        });
        const grouped = tasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(grouped).map(([priority, count]) => ({ priority, count }));
    }
};
exports.LeasingTasksService = LeasingTasksService;
exports.LeasingTasksService = LeasingTasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeasingTasksService);
//# sourceMappingURL=leasing-tasks.service.js.map