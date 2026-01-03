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
exports.FranchiseProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let FranchiseProjectsService = class FranchiseProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
        if (filters?.status) {
            where.status = filters.status;
        }
        if (filters?.targetCity) {
            where.targetCity = filters.targetCity;
        }
        if (filters?.targetRegion) {
            where.targetRegion = filters.targetRegion;
        }
        if (filters?.projectManagerId) {
            where.projectManagerId = filters.projectManagerId;
        }
        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { code: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.franchiseProject.findMany({
            where,
            include: {
                tasks: {
                    where: { status: { not: 'COMPLETED' } },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, tenantId) {
        const project = await this.prisma.franchiseProject.findFirst({
            where: { id, tenantId },
            include: {
                tasks: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Franchise project with ID ${id} not found`);
        }
        return project;
    }
    async create(tenantId, createDto) {
        if (createDto.code) {
            const existing = await this.prisma.franchiseProject.findUnique({
                where: { code: createDto.code },
            });
            if (existing) {
                throw new common_1.ConflictException(`Project with code ${createDto.code} already exists`);
            }
        }
        const data = {
            ...createDto,
            tenantId,
            status: 'PIPELINE',
        };
        if (createDto.targetOpeningDate) {
            data.targetOpeningDate = new Date(createDto.targetOpeningDate);
        }
        return this.prisma.franchiseProject.create({ data });
    }
    async update(id, tenantId, updateDto) {
        const project = await this.prisma.franchiseProject.findFirst({
            where: { id, tenantId },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Franchise project with ID ${id} not found`);
        }
        const data = { ...updateDto };
        if (updateDto.targetOpeningDate) {
            data.targetOpeningDate = new Date(updateDto.targetOpeningDate);
        }
        if (updateDto.actualOpeningDate) {
            data.actualOpeningDate = new Date(updateDto.actualOpeningDate);
        }
        if (updateDto.status === 'OPENED' && project.status !== 'OPENED') {
            data.actualOpeningDate = data.actualOpeningDate || new Date();
        }
        return this.prisma.franchiseProject.update({
            where: { id },
            data,
        });
    }
    async remove(id, tenantId) {
        const project = await this.prisma.franchiseProject.findFirst({
            where: { id, tenantId },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Franchise project with ID ${id} not found`);
        }
        if (project.storeId) {
            throw new common_1.ConflictException(`Cannot delete project linked to a store. Please unlink first.`);
        }
        await this.prisma.franchiseProject.delete({ where: { id } });
        return {
            success: true,
            message: 'Franchise project deleted successfully',
        };
    }
    async getStatistics(tenantId) {
        const total = await this.prisma.franchiseProject.count({ where: { tenantId } });
        const pipeline = await this.prisma.franchiseProject.count({
            where: { tenantId, status: 'PIPELINE' },
        });
        const evaluation = await this.prisma.franchiseProject.count({
            where: { tenantId, status: { in: ['EVALUATION', 'FEASIBILITY_STUDY'] } },
        });
        const approved = await this.prisma.franchiseProject.count({
            where: { tenantId, status: 'APPROVED' },
        });
        const opened = await this.prisma.franchiseProject.count({
            where: { tenantId, status: 'OPENED' },
        });
        const byCity = await this.getProjectsByCity(tenantId);
        const avgFeasibilityScore = await this.getAvgFeasibilityScore(tenantId);
        return {
            total,
            pipeline,
            evaluation,
            approved,
            opened,
            byCity,
            avgFeasibilityScore,
        };
    }
    async getProjectsByCity(tenantId) {
        const projects = await this.prisma.franchiseProject.findMany({
            where: { tenantId, targetCity: { not: null } },
            select: { targetCity: true },
        });
        const grouped = projects.reduce((acc, project) => {
            const city = project.targetCity || 'Unknown';
            acc[city] = (acc[city] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(grouped).map(([city, count]) => ({ city, count }));
    }
    async getAvgFeasibilityScore(tenantId) {
        const result = await this.prisma.franchiseProject.aggregate({
            where: {
                tenantId,
                feasibilityScore: { not: null },
            },
            _avg: {
                feasibilityScore: true,
            },
        });
        return result._avg.feasibilityScore || 0;
    }
};
exports.FranchiseProjectsService = FranchiseProjectsService;
exports.FranchiseProjectsService = FranchiseProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FranchiseProjectsService);
//# sourceMappingURL=franchise-projects.service.js.map