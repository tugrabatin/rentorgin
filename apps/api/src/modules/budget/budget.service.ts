/**
 * Budget Service
 * Budget yönetimi için iş mantığı
 * 
 * Bütçe Servisi
 * Bütçe yönetimi için iş mantığı
 */

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create new budget
   * Yeni bütçe oluştur
   */
  async create(tenantId: string, createBudgetDto: CreateBudgetDto) {
    // Check if budget already exists for this period and scope
    const existing = await this.prisma.budget.findUnique({
      where: {
        tenantId_year_quarter_scope_scopeValue: {
          tenantId,
          year: createBudgetDto.year,
          quarter: createBudgetDto.quarter || null,
          scope: createBudgetDto.scope as any,
          scopeValue: createBudgetDto.scopeValue || null,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Budget already exists for this period and scope');
    }

    // Calculate variance if actual amount is provided
    const variance = createBudgetDto.plannedAmount ? null : 0;

    return this.prisma.budget.create({
      data: {
        tenantId,
        year: createBudgetDto.year,
        quarter: createBudgetDto.quarter || null,
        scope: createBudgetDto.scope as any,
        scopeValue: createBudgetDto.scopeValue || null,
        plannedAmount: createBudgetDto.plannedAmount,
        status: (createBudgetDto.status || 'DRAFT') as any,
        variance,
      },
    });
  }

  /**
   * Find all budgets for tenant
   * Tenant için tüm bütçeleri getir
   */
  async findAll(
    tenantId: string,
    filters?: {
      year?: number;
      quarter?: number;
      scope?: string;
      status?: string;
    },
  ) {
    const where: any = { tenantId };

    if (filters?.year) {
      where.year = filters.year;
    }

    if (filters?.quarter !== undefined) {
      where.quarter = filters.quarter;
    }

    if (filters?.scope) {
      where.scope = filters.scope;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.budget.findMany({
      where,
      orderBy: [
        { year: 'desc' },
        { quarter: 'asc' },
      ],
    });
  }

  /**
   * Find one budget
   * Bir bütçeyi getir
   */
  async findOne(tenantId: string, id: string) {
    const budget = await this.prisma.budget.findFirst({
      where: {
        id,
        tenantId,
      },
    });

    if (!budget) {
      throw new NotFoundException('Budget not found');
    }

    return budget;
  }

  /**
   * Update budget
   * Bütçeyi güncelle
   */
  async update(tenantId: string, id: string, updateBudgetDto: UpdateBudgetDto) {
    const budget = await this.findOne(tenantId, id);

    const updateData: any = { ...updateBudgetDto };

    // Calculate variance if both amounts are present
    if (updateBudgetDto.actualAmount !== undefined && budget.plannedAmount) {
      updateData.variance = updateBudgetDto.actualAmount - budget.plannedAmount;
    } else if (updateBudgetDto.plannedAmount !== undefined && budget.actualAmount) {
      updateData.variance = budget.actualAmount - updateBudgetDto.plannedAmount;
    }

    return this.prisma.budget.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Delete budget
   * Bütçeyi sil
   */
  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.prisma.budget.delete({
      where: { id },
    });
  }

  /**
   * Get budget statistics
   * Bütçe istatistiklerini getir
   */
  async getStatistics(tenantId: string, year?: number) {
    const where: any = { tenantId };
    if (year) {
      where.year = year;
    }

    const budgets = await this.prisma.budget.findMany({
      where,
    });

    const totalPlanned = budgets.reduce((sum, b) => sum + b.plannedAmount, 0);
    const totalActual = budgets
      .filter((b) => b.actualAmount !== null)
      .reduce((sum, b) => sum + (b.actualAmount || 0), 0);
    const totalVariance = budgets
      .filter((b) => b.variance !== null)
      .reduce((sum, b) => sum + (b.variance || 0), 0);

    const byStatus = budgets.reduce((acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byScope = budgets.reduce((acc, b) => {
      acc[b.scope] = (acc[b.scope] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalBudgets: budgets.length,
      totalPlanned,
      totalActual,
      totalVariance,
      byStatus,
      byScope,
      averageVariance: budgets.length > 0 ? totalVariance / budgets.length : 0,
    };
  }

  /**
   * Get budget vs actual comparison
   * Bütçe vs gerçekleşen karşılaştırması
   */
  async getBudgetVsActual(tenantId: string, year: number, quarter?: number) {
    const where: any = { tenantId, year };
    if (quarter) {
      where.quarter = quarter;
    }

    const budgets = await this.prisma.budget.findMany({
      where,
    });

    // Get actual expenses for the period
    const startDate = quarter
      ? new Date(year, (quarter - 1) * 3, 1)
      : new Date(year, 0, 1);
    const endDate = quarter
      ? new Date(year, quarter * 3, 1)
      : new Date(year + 1, 0, 1);

    const expenses = await this.prisma.expense.findMany({
      where: {
        tenantId,
        dueDate: {
          gte: startDate,
          lt: endDate,
        },
        status: 'PAID',
      },
      select: {
        amount: true,
      },
    });

    const actualTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
    const plannedTotal = budgets.reduce((sum, b) => sum + b.plannedAmount, 0);

    return {
      year,
      quarter: quarter || null,
      planned: plannedTotal,
      actual: actualTotal,
      variance: actualTotal - plannedTotal,
      variancePercentage: plannedTotal > 0 ? ((actualTotal - plannedTotal) / plannedTotal) * 100 : 0,
      budgets: budgets.map((b) => ({
        id: b.id,
        scope: b.scope,
        scopeValue: b.scopeValue,
        planned: b.plannedAmount,
        actual: b.actualAmount || 0,
        variance: b.variance || 0,
      })),
    };
  }
}







