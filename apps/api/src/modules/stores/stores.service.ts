/**
 * Stores Service
 * Business logic for store management
 * 
 * Mağazalar Servisi
 * Mağaza yönetimi için iş mantığı
 */

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all stores with optional filters
   * Opsiyonel filtrelerle tüm mağazaları getir
   */
  async findAll(tenantId: string, filters?: any) {
    const where: any = { tenantId };

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

  /**
   * Get single store by ID
   * ID ile tek mağaza getir
   */
  async findOne(id: string, tenantId: string) {
    const store = await this.prisma.store.findFirst({
      where: { id, tenantId },
      include: { 
        mall: true, 
        leases: { orderBy: { createdAt: 'desc' } },
        analytics: { 
          orderBy: [{ year: 'desc' }, { month: 'desc' }],
          take: 12, // Last 12 months
        },
      },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    return store;
  }

  /**
   * Create new store
   * Yeni mağaza oluştur
   */
  async create(tenantId: string, createDto: CreateStoreDto) {
    // Check if store code already exists
    // Mağaza kodunun zaten var olup olmadığını kontrol et
    const existing = await this.prisma.store.findUnique({
      where: { code: createDto.code },
    });

    if (existing) {
      throw new ConflictException(`Store with code ${createDto.code} already exists`);
    }

    const data: any = {
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

  /**
   * Update store
   * Mağaza güncelle
   */
  async update(id: string, tenantId: string, updateDto: UpdateStoreDto) {
    // Check if store exists and belongs to tenant
    // Mağazanın var olup olmadığını ve tenant'a ait olup olmadığını kontrol et
    const store = await this.prisma.store.findFirst({
      where: { id, tenantId },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    const data: any = { ...updateDto };

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

  /**
   * Delete store
   * Mağaza sil
   */
  async remove(id: string, tenantId: string) {
    // Check if store exists and belongs to tenant
    // Mağazanın var olup olmadığını ve tenant'a ait olup olmadığını kontrol et
    const store = await this.prisma.store.findFirst({
      where: { id, tenantId },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    // Check if store has active leases
    // Mağazanın aktif kiraları olup olmadığını kontrol et
    const activeLeases = await this.prisma.lease.count({
      where: { 
        storeId: id,
        status: { in: ['ACTIVE', 'PENDING_APPROVAL', 'APPROVED'] },
      },
    });

    if (activeLeases > 0) {
      throw new ConflictException(
        `Cannot delete store with ${activeLeases} active lease(s). Please terminate leases first.`
      );
    }

    await this.prisma.store.delete({ where: { id } });

    return { 
      success: true,
      message: 'Store deleted successfully',
    };
  }

  /**
   * Get store statistics
   * Mağaza istatistikleri getir
   */
  async getStatistics(tenantId: string) {
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

  /**
   * Get stores grouped by city
   * Şehre göre gruplanmış mağazaları getir
   */
  private async getStoresByCity(tenantId: string) {
    const stores = await this.prisma.store.findMany({
      where: { tenantId },
      select: { city: true },
    });

    const grouped = stores.reduce((acc: any, store) => {
      acc[store.city] = (acc[store.city] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([city, count]) => ({ city, count }));
  }
}

