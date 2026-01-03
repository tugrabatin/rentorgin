import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create new expense
   */
  async create(tenantId: string, createExpenseDto: CreateExpenseDto) {
    // Verify store belongs to tenant
    const store = await this.prisma.store.findFirst({
      where: {
        id: createExpenseDto.storeId,
        tenantId,
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found or access denied');
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

  /**
   * Find all expenses for tenant
   */
  async findAll(
    tenantId: string,
    filters?: {
      storeId?: string;
      type?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    },
  ) {
    const where: any = { tenantId };

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

  /**
   * Find one expense
   */
  async findOne(tenantId: string, id: string) {
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
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  /**
   * Update expense
   */
  async update(tenantId: string, id: string, updateExpenseDto: UpdateExpenseDto) {
    // Verify expense exists and belongs to tenant
    await this.findOne(tenantId, id);

    const updateData: any = { ...updateExpenseDto };

    // Convert date strings to Date objects
    if (updateExpenseDto.dueDate) {
      updateData.dueDate = new Date(updateExpenseDto.dueDate);
    }
    if (updateExpenseDto.paidDate) {
      updateData.paidDate = new Date(updateExpenseDto.paidDate);
    }

    // If marking as disputed, set isDisputed flag
    if (updateExpenseDto.disputeReason && updateExpenseDto.isDisputed === undefined) {
      updateData.isDisputed = true;
    }

    // If resolving dispute
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

  /**
   * Delete expense
   */
  async remove(tenantId: string, id: string) {
    // Verify expense exists and belongs to tenant
    await this.findOne(tenantId, id);

    return this.prisma.expense.delete({
      where: { id },
    });
  }

  /**
   * Get expense statistics
   */
  async getStatistics(tenantId: string, filters?: { storeId?: string; year?: number; month?: number }) {
    const where: any = { tenantId };

    if (filters?.storeId) {
      where.storeId = filters.storeId;
    }

    // Date range for month/year filter
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

    // Calculate totals by type
    const totalByType = expenses.reduce((acc, exp) => {
      acc[exp.type] = (acc[exp.type] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

    // Calculate totals by status
    const totalByStatus = expenses.reduce((acc, exp) => {
      acc[exp.status] = (acc[exp.status] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

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

  /**
   * Get monthly expenses summary
   */
  async getMonthlySummary(tenantId: string, year: number, storeId?: string) {
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

  /**
   * Mark expense as paid
   */
  async markAsPaid(tenantId: string, id: string) {
    return this.update(tenantId, id, {
      status: 'PAID' as any,
      paidDate: new Date().toISOString(),
    });
  }

  /**
   * Get overdue expenses
   */
  async getOverdue(tenantId: string) {
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
}

