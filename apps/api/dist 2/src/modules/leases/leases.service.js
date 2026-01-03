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
exports.LeasesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let LeasesService = class LeasesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
        if (filters?.storeId)
            where.storeId = filters.storeId;
        if (filters?.mallId)
            where.mallId = filters.mallId;
        if (filters?.status)
            where.status = filters.status;
        if (filters?.assignedToId)
            where.assignedToId = filters.assignedToId;
        return this.prisma.lease.findMany({
            where,
            include: {
                store: true,
                mall: true,
                assignedTo: {
                    select: { id: true, firstName: true, lastName: true, email: true }
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findExpiring(tenantId, days = 90) {
        const threshold = new Date();
        threshold.setDate(threshold.getDate() + days);
        return this.prisma.lease.findMany({
            where: {
                tenantId,
                endDate: { lte: threshold, gte: new Date() },
                status: { in: ['ACTIVE', 'EXPIRING_SOON'] },
            },
            include: { store: true, mall: true },
            orderBy: { endDate: 'asc' },
        });
    }
    async findOne(id, tenantId) {
        const lease = await this.prisma.lease.findFirst({
            where: { id, tenantId },
            include: {
                store: true,
                mall: true,
                assignedTo: {
                    select: { id: true, firstName: true, lastName: true, email: true }
                },
                renewals: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!lease) {
            throw new common_1.NotFoundException(`Lease with ID ${id} not found`);
        }
        const daysRemaining = Math.ceil((new Date(lease.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return {
            ...lease,
            daysRemaining,
            isExpiringSoon: daysRemaining <= 90 && daysRemaining > 0,
        };
    }
    async create(tenantId, createDto) {
        const existing = await this.prisma.lease.findUnique({
            where: { contractNumber: createDto.contractNumber },
        });
        if (existing) {
            throw new common_1.ConflictException(`Lease with contract number ${createDto.contractNumber} already exists`);
        }
        const data = {
            ...createDto,
            tenantId,
            startDate: new Date(createDto.startDate),
            endDate: new Date(createDto.endDate),
            signedDate: createDto.signedDate ? new Date(createDto.signedDate) : undefined,
            currency: createDto.currency || 'TRY',
            renewalNoticeMonths: createDto.renewalNoticeMonths || 3,
            status: 'ACTIVE',
        };
        return this.prisma.lease.create({
            data,
            include: { store: true, mall: true },
        });
    }
    async update(id, tenantId, updateDto) {
        const lease = await this.prisma.lease.findFirst({
            where: { id, tenantId },
        });
        if (!lease) {
            throw new common_1.NotFoundException(`Lease with ID ${id} not found`);
        }
        const updateData = {};
        if (updateDto.assignedToId !== undefined)
            updateData.assignedToId = updateDto.assignedToId;
        if (updateDto.status !== undefined)
            updateData.status = updateDto.status;
        if (updateDto.monthlyRent !== undefined)
            updateData.monthlyRent = updateDto.monthlyRent;
        if (updateDto.escalationRate !== undefined)
            updateData.escalationRate = updateDto.escalationRate;
        if (updateDto.renewalNoticeMonths !== undefined)
            updateData.renewalNoticeMonths = updateDto.renewalNoticeMonths;
        if (updateDto.commonAreaCharges !== undefined)
            updateData.commonAreaCharges = updateDto.commonAreaCharges;
        if (updateDto.documentUrl !== undefined)
            updateData.documentUrl = updateDto.documentUrl;
        return this.prisma.lease.update({
            where: { id },
            data: updateData,
            include: { store: true, mall: true },
        });
    }
    async initiateRenewal(leaseId, tenantId) {
        const lease = await this.prisma.lease.findFirst({
            where: { id: leaseId, tenantId },
        });
        if (!lease) {
            throw new common_1.NotFoundException(`Lease with ID ${leaseId} not found`);
        }
        const existingRenewal = await this.prisma.leaseRenewal.findFirst({
            where: {
                leaseId,
                status: { in: ['PENDING', 'IN_NEGOTIATION'] },
            },
        });
        if (existingRenewal) {
            throw new common_1.ConflictException('Lease already has a pending renewal');
        }
        return this.prisma.leaseRenewal.create({
            data: {
                leaseId,
                status: 'PENDING',
                reminderSentAt: new Date(),
            },
        });
    }
    async calculateCurrentRent(leaseId, tenantId) {
        const lease = await this.findOne(leaseId, tenantId);
        const yearsElapsed = Math.floor((new Date().getTime() - new Date(lease.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365));
        let currentRent = lease.monthlyRent;
        if (lease.escalationType === 'FIXED_PERCENTAGE' && yearsElapsed > 0) {
            currentRent = lease.monthlyRent * Math.pow(1 + lease.escalationRate / 100, yearsElapsed);
        }
        return {
            leaseId: lease.id,
            baseRent: lease.monthlyRent,
            currentRent: Math.round(currentRent * 100) / 100,
            yearsElapsed,
            escalationType: lease.escalationType,
            escalationRate: lease.escalationRate,
        };
    }
};
exports.LeasesService = LeasesService;
exports.LeasesService = LeasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeasesService);
//# sourceMappingURL=leases.service.js.map