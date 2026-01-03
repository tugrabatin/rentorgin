/**
 * Leases Service
 * Business logic for lease contract management
 * 
 * Kira Servisi
 * Kira sözleşmesi yönetimi için iş mantığı
 */

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';

@Injectable()
export class LeasesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all leases with filters
   * Filtrelerle tüm kiraları getir
   */
  async findAll(tenantId: string, filters?: any) {
    const where: any = { tenantId };

    if (filters?.storeId) where.storeId = filters.storeId;
    if (filters?.mallId) where.mallId = filters.mallId;
    if (filters?.status) where.status = filters.status;
    if (filters?.assignedToId) where.assignedToId = filters.assignedToId;

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

  /**
   * Get expiring leases within X days
   * X gün içinde dolacak kiraları getir
   */
  async findExpiring(tenantId: string, days: number = 90) {
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

  /**
   * Get single lease by ID
   * ID ile tek kira getir
   */
  async findOne(id: string, tenantId: string) {
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
      throw new NotFoundException(`Lease with ID ${id} not found`);
    }

    // Calculate additional info
    // Ek bilgileri hesapla
    const daysRemaining = Math.ceil(
      (new Date(lease.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      ...lease,
      daysRemaining,
      isExpiringSoon: daysRemaining <= 90 && daysRemaining > 0,
    };
  }

  /**
   * Create new lease
   * Yeni kira oluştur
   */
  async create(tenantId: string, createDto: CreateLeaseDto) {
    // Check if contract number already exists
    // Sözleşme numarasının zaten var olup olmadığını kontrol et
    const existing = await this.prisma.lease.findUnique({
      where: { contractNumber: createDto.contractNumber },
    });

    if (existing) {
      throw new ConflictException(`Lease with contract number ${createDto.contractNumber} already exists`);
    }

    const data: any = {
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

  /**
   * Update lease
   * Kira güncelle
   */
  async update(id: string, tenantId: string, updateDto: UpdateLeaseDto) {
    const lease = await this.prisma.lease.findFirst({
      where: { id, tenantId },
    });

    if (!lease) {
      throw new NotFoundException(`Lease with ID ${id} not found`);
    }

    const updateData: any = {};
    if (updateDto.assignedToId !== undefined) updateData.assignedToId = updateDto.assignedToId;
    if (updateDto.status !== undefined) updateData.status = updateDto.status;
    if (updateDto.monthlyRent !== undefined) updateData.monthlyRent = updateDto.monthlyRent;
    if (updateDto.escalationRate !== undefined) updateData.escalationRate = updateDto.escalationRate;
    if (updateDto.renewalNoticeMonths !== undefined) updateData.renewalNoticeMonths = updateDto.renewalNoticeMonths;
    if (updateDto.commonAreaCharges !== undefined) updateData.commonAreaCharges = updateDto.commonAreaCharges;
    if (updateDto.documentUrl !== undefined) updateData.documentUrl = updateDto.documentUrl;

    return this.prisma.lease.update({
      where: { id },
      data: updateData,
      include: { store: true, mall: true },
    });
  }

  /**
   * Initiate lease renewal
   * Kira yenileme başlat
   */
  async initiateRenewal(leaseId: string, tenantId: string) {
    const lease = await this.prisma.lease.findFirst({
      where: { id: leaseId, tenantId },
    });

    if (!lease) {
      throw new NotFoundException(`Lease with ID ${leaseId} not found`);
    }

    // Check if already has pending renewal
    // Zaten bekleyen yenileme olup olmadığını kontrol et
    const existingRenewal = await this.prisma.leaseRenewal.findFirst({
      where: { 
        leaseId,
        status: { in: ['PENDING', 'IN_NEGOTIATION'] },
      },
    });

    if (existingRenewal) {
      throw new ConflictException('Lease already has a pending renewal');
    }

    return this.prisma.leaseRenewal.create({
      data: { 
        leaseId, 
        status: 'PENDING',
        reminderSentAt: new Date(),
      },
    });
  }

  /**
   * Calculate current rent with escalation
   * Artış ile mevcut kirayı hesapla
   */
  async calculateCurrentRent(leaseId: string, tenantId: string) {
    const lease = await this.findOne(leaseId, tenantId);
    
    const yearsElapsed = Math.floor(
      (new Date().getTime() - new Date(lease.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365)
    );

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
}


