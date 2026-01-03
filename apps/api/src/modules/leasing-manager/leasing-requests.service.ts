/**
 * Leasing Requests Service
 * Business logic for leasing request management
 * 
 * Kiralama Talepleri Servisi
 * Kiralama talepleri yönetimi için iş mantığı
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLeasingRequestDto } from './dto/create-leasing-request.dto';
import { UpdateLeasingRequestDto } from './dto/update-leasing-request.dto';

@Injectable()
export class LeasingRequestsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all leasing requests with optional filters
   * Opsiyonel filtrelerle tüm kiralama taleplerini getir
   */
  async findAll(tenantId: string, filters?: any) {
    const where: any = { tenantId };

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

  /**
   * Get single leasing request by ID
   * ID ile tek kiralama talebi getir
   */
  async findOne(id: string, tenantId: string) {
    const request = await this.prisma.leasingRequest.findFirst({
      where: { id, tenantId },
    });

    if (!request) {
      throw new NotFoundException(`Leasing request with ID ${id} not found`);
    }

    return request;
  }

  /**
   * Create new leasing request
   * Yeni kiralama talebi oluştur
   */
  async create(tenantId: string, userId: string, createDto: CreateLeasingRequestDto) {
    const data: any = {
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

  /**
   * Update leasing request
   * Kiralama talebini güncelle
   */
  async update(id: string, tenantId: string, updateDto: UpdateLeasingRequestDto) {
    const request = await this.prisma.leasingRequest.findFirst({
      where: { id, tenantId },
    });

    if (!request) {
      throw new NotFoundException(`Leasing request with ID ${id} not found`);
    }

    const data: any = { ...updateDto };

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

  /**
   * Resolve leasing request
   * Kiralama talebini çöz
   */
  async resolve(id: string, tenantId: string, userId: string, resolution: string) {
    const request = await this.prisma.leasingRequest.findFirst({
      where: { id, tenantId },
    });

    if (!request) {
      throw new NotFoundException(`Leasing request with ID ${id} not found`);
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

  /**
   * Reject leasing request
   * Kiralama talebini reddet
   */
  async reject(id: string, tenantId: string, userId: string, reason: string) {
    const request = await this.prisma.leasingRequest.findFirst({
      where: { id, tenantId },
    });

    if (!request) {
      throw new NotFoundException(`Leasing request with ID ${id} not found`);
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

  /**
   * Delete leasing request
   * Kiralama talebini sil
   */
  async remove(id: string, tenantId: string) {
    const request = await this.prisma.leasingRequest.findFirst({
      where: { id, tenantId },
    });

    if (!request) {
      throw new NotFoundException(`Leasing request with ID ${id} not found`);
    }

    await this.prisma.leasingRequest.delete({ where: { id } });

    return {
      success: true,
      message: 'Leasing request deleted successfully',
    };
  }

  /**
   * Get request statistics
   * Talep istatistikleri getir
   */
  async getStatistics(tenantId: string) {
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

  /**
   * Get requests grouped by type
   * Tipe göre gruplanmış talepleri getir
   */
  private async getRequestsByType(tenantId: string) {
    const requests = await this.prisma.leasingRequest.findMany({
      where: { tenantId },
      select: { type: true },
    });

    const grouped = requests.reduce((acc: any, request) => {
      acc[request.type] = (acc[request.type] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([type, count]) => ({ type, count }));
  }

  /**
   * Get requests grouped by source
   * Kaynağa göre gruplanmış talepleri getir
   */
  private async getRequestsBySource(tenantId: string) {
    const requests = await this.prisma.leasingRequest.findMany({
      where: { tenantId },
      select: { source: true },
    });

    const grouped = requests.reduce((acc: any, request) => {
      acc[request.source] = (acc[request.source] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([source, count]) => ({ source, count }));
  }

  /**
   * Calculate average resolution time in days
   * Ortalama çözüm süresini gün olarak hesapla
   */
  private async getAvgResolutionTime(tenantId: string): Promise<number> {
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

    if (resolved.length === 0) return 0;

    const totalDays = resolved.reduce((sum, request) => {
      const diff = request.resolvedAt!.getTime() - request.createdAt.getTime();
      return sum + diff / (1000 * 60 * 60 * 24);
    }, 0);

    return Math.round(totalDays / resolved.length);
  }
}
