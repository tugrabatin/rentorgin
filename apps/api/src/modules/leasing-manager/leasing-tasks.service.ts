/**
 * Leasing Tasks Service
 * Business logic for leasing task management
 * 
 * Kiralama Görevleri Servisi
 * Kiralama görevleri yönetimi için iş mantığı
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLeasingTaskDto } from './dto/create-leasing-task.dto';
import { UpdateLeasingTaskDto } from './dto/update-leasing-task.dto';

@Injectable()
export class LeasingTasksService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all leasing tasks with optional filters
   * Opsiyonel filtrelerle tüm kiralama görevlerini getir
   */
  async findAll(tenantId: string, filters?: any) {
    const where: any = { tenantId };

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

  /**
   * Get single leasing task by ID
   * ID ile tek kiralama görevi getir
   */
  async findOne(id: string, tenantId: string) {
    const task = await this.prisma.leasingTask.findFirst({
      where: { id, tenantId },
    });

    if (!task) {
      throw new NotFoundException(`Leasing task with ID ${id} not found`);
    }

    return task;
  }

  /**
   * Create new leasing task
   * Yeni kiralama görevi oluştur
   */
  async create(tenantId: string, createDto: CreateLeasingTaskDto) {
    const data: any = {
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

  /**
   * Update leasing task
   * Kiralama görevini güncelle
   */
  async update(id: string, tenantId: string, updateDto: UpdateLeasingTaskDto) {
    const task = await this.prisma.leasingTask.findFirst({
      where: { id, tenantId },
    });

    if (!task) {
      throw new NotFoundException(`Leasing task with ID ${id} not found`);
    }

    const data: any = { ...updateDto };

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

  /**
   * Delete leasing task
   * Kiralama görevini sil
   */
  async remove(id: string, tenantId: string) {
    const task = await this.prisma.leasingTask.findFirst({
      where: { id, tenantId },
    });

    if (!task) {
      throw new NotFoundException(`Leasing task with ID ${id} not found`);
    }

    await this.prisma.leasingTask.delete({ where: { id } });

    return {
      success: true,
      message: 'Leasing task deleted successfully',
    };
  }

  /**
   * Get task statistics
   * Görev istatistikleri getir
   */
  async getStatistics(tenantId: string) {
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

  /**
   * Get tasks grouped by category
   * Kategoriye göre gruplanmış görevleri getir
   */
  private async getTasksByCategory(tenantId: string) {
    const tasks = await this.prisma.leasingTask.findMany({
      where: { tenantId },
      select: { category: true },
    });

    const grouped = tasks.reduce((acc: any, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([category, count]) => ({ category, count }));
  }

  /**
   * Get tasks grouped by priority
   * Önceliğe göre gruplanmış görevleri getir
   */
  private async getTasksByPriority(tenantId: string) {
    const tasks = await this.prisma.leasingTask.findMany({
      where: { tenantId, status: { not: 'COMPLETED' } },
      select: { priority: true },
    });

    const grouped = tasks.reduce((acc: any, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([priority, count]) => ({ priority, count }));
  }
}
