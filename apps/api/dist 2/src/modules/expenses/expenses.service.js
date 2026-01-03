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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ExpensesService = class ExpensesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, createExpenseDto) {
        const store = await this.prisma.store.findFirst({
            where: {
                id: createExpenseDto.storeId,
                tenantId,
            },
        });
        if (!store) {
            throw new common_1.NotFoundException('Store not found or access denied');
        }
        return this.prisma.expense.create({
            data: {
                tenantId,
                storeId: createExpenseDto.storeId,
                type: createExpenseDto.type,
                category: createExpenseDto.category,
                description: createExpenseDto.description,
                amount: createExpenseDto.amount,
                currency: createExpenseDto.currency || 'TRY',
                dueDate: new Date(createExpenseDto.dueDate),
                invoiceNumber: createExpenseDto.invoiceNumber,
                invoiceUrl: createExpenseDto.invoiceUrl,
            },
            include: {
                store: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        city: true,
                    },
                },
            },
        });
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
        if (filters?.storeId) {
            where.storeId = filters.storeId;
        }
        if (filters?.type) {
            where.type = filters.type;
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        if (filters?.startDate || filters?.endDate) {
            where.dueDate = {};
            if (filters.startDate) {
                where.dueDate.gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                where.dueDate.lte = new Date(filters.endDate);
            }
        }
        return this.prisma.expense.findMany({
            where,
            include: {
                store: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        city: true,
                    },
                },
            },
            orderBy: {
                dueDate: 'desc',
            },
        });
    }
    async findOne(tenantId, id) {
        const expense = await this.prisma.expense.findFirst({
            where: {
                id,
                tenantId,
            },
            include: {
                store: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        city: true,
                        brand: true,
                    },
                },
            },
        });
        if (!expense) {
            throw new common_1.NotFoundException('Expense not found');
        }
        return expense;
    }
    async update(tenantId, id, updateExpenseDto) {
        await this.findOne(tenantId, id);
        const updateData = { ...updateExpenseDto };
        if (updateExpenseDto.dueDate) {
            updateData.dueDate = new Date(updateExpenseDto.dueDate);
        }
        if (updateExpenseDto.paidDate) {
            updateData.paidDate = new Date(updateExpenseDto.paidDate);
        }
        if (updateExpenseDto.disputeReason && updateExpenseDto.isDisputed === undefined) {
            updateData.isDisputed = true;
        }
        if (updateExpenseDto.isDisputed === false) {
            updateData.disputeResolvedAt = new Date();
        }
        return this.prisma.expense.update({
            where: { id },
            data: updateData,
            include: {
                store: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        city: true,
                    },
                },
            },
        });
    }
    async remove(tenantId, id) {
        await this.findOne(tenantId, id);
        return this.prisma.expense.delete({
            where: { id },
        });
    }
    async getStatistics(tenantId, filters) {
        const where = { tenantId };
        if (filters?.storeId) {
            where.storeId = filters.storeId;
        }
        if (filters?.year) {
            const year = filters.year;
            const month = filters.month || 1;
            const startDate = new Date(year, month - 1, 1);
            const endDate = month === 12 ? new Date(year + 1, 0, 1) : new Date(year, month, 1);
            where.dueDate = {
                gte: startDate,
                lt: endDate,
            };
        }
        const expenses = await this.prisma.expense.findMany({
            where,
            select: {
                amount: true,
                type: true,
                status: true,
                currency: true,
            },
        });
        const totalByType = expenses.reduce((acc, exp) => {
            acc[exp.type] = (acc[exp.type] || 0) + exp.amount;
            return acc;
        }, {});
        const totalByStatus = expenses.reduce((acc, exp) => {
            acc[exp.status] = (acc[exp.status] || 0) + exp.amount;
            return acc;
        }, {});
        const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const paidAmount = expenses
            .filter((exp) => exp.status === 'PAID')
            .reduce((sum, exp) => sum + exp.amount, 0);
        const pendingAmount = expenses
            .filter((exp) => exp.status === 'PENDING')
            .reduce((sum, exp) => sum + exp.amount, 0);
        const overdueAmount = expenses
            .filter((exp) => exp.status === 'OVERDUE')
            .reduce((sum, exp) => sum + exp.amount, 0);
        return {
            totalAmount,
            paidAmount,
            pendingAmount,
            overdueAmount,
            totalCount: expenses.length,
            byType: totalByType,
            byStatus: totalByStatus,
            currency: expenses[0]?.currency || 'TRY',
        };
    }
    async getMonthlySummary(tenantId, year, storeId) {
        const months = [];
        for (let month = 1; month <= 12; month++) {
            const stats = await this.getStatistics(tenantId, { storeId, year, month });
            months.push({
                month,
                year,
                totalAmount: stats.totalAmount,
                paidAmount: stats.paidAmount,
                pendingAmount: stats.pendingAmount,
                count: stats.totalCount,
            });
        }
        return {
            year,
            storeId: storeId || 'all',
            months,
            yearTotal: months.reduce((sum, m) => sum + m.totalAmount, 0),
        };
    }
    async markAsPaid(tenantId, id) {
        return this.update(tenantId, id, {
            status: 'PAID',
            paidDate: new Date().toISOString(),
        });
    }
    async getOverdue(tenantId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.prisma.expense.findMany({
            where: {
                tenantId,
                status: {
                    in: ['PENDING', 'OVERDUE'],
                },
                dueDate: {
                    lt: today,
                },
            },
            include: {
                store: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        city: true,
                    },
                },
            },
            orderBy: {
                dueDate: 'asc',
            },
        });
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map