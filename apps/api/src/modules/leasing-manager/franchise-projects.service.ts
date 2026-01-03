/**
 * Franchise Projects Service
 * Business logic for franchise project management
 * 
 * Franchise Projeleri Servisi
 * Franchise projeleri yönetimi için iş mantığı
 */

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateFranchiseProjectDto } from './dto/create-franchise-project.dto';
import { UpdateFranchiseProjectDto } from './dto/update-franchise-project.dto';

@Injectable()
export class FranchiseProjectsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all franchise projects with optional filters
   * Opsiyonel filtrelerle tüm franchise projelerini getir
   */
  async findAll(tenantId: string, filters?: any) {
    const where: any = { tenantId };

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

  /**
   * Get single franchise project by ID
   * ID ile tek franchise projesi getir
   */
  async findOne(id: string, tenantId: string) {
    const project = await this.prisma.franchiseProject.findFirst({
      where: { id, tenantId },
      include: {
        tasks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Franchise project with ID ${id} not found`);
    }

    return project;
  }

  /**
   * Create new franchise project
   * Yeni franchise projesi oluştur
   */
  async create(tenantId: string, createDto: CreateFranchiseProjectDto) {
    // Check if code already exists
    if (createDto.code) {
      const existing = await this.prisma.franchiseProject.findUnique({
        where: { code: createDto.code },
      });

      if (existing) {
        throw new ConflictException(`Project with code ${createDto.code} already exists`);
      }
    }

    const data: any = {
      ...createDto,
      tenantId,
      status: 'PIPELINE',
    };

    if (createDto.targetOpeningDate) {
      data.targetOpeningDate = new Date(createDto.targetOpeningDate);
    }

    return this.prisma.franchiseProject.create({ data });
  }

  /**
   * Update franchise project
   * Franchise projesini güncelle
   */
  async update(id: string, tenantId: string, updateDto: UpdateFranchiseProjectDto) {
    const project = await this.prisma.franchiseProject.findFirst({
      where: { id, tenantId },
    });

    if (!project) {
      throw new NotFoundException(`Franchise project with ID ${id} not found`);
    }

    const data: any = { ...updateDto };

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

  /**
   * Delete franchise project
   * Franchise projesini sil
   */
  async remove(id: string, tenantId: string) {
    const project = await this.prisma.franchiseProject.findFirst({
      where: { id, tenantId },
    });

    if (!project) {
      throw new NotFoundException(`Franchise project with ID ${id} not found`);
    }

    // Check if linked to a store
    if (project.storeId) {
      throw new ConflictException(
        `Cannot delete project linked to a store. Please unlink first.`
      );
    }

    await this.prisma.franchiseProject.delete({ where: { id } });

    return {
      success: true,
      message: 'Franchise project deleted successfully',
    };
  }

  /**
   * Get project statistics
   * Proje istatistikleri getir
   */
  async getStatistics(tenantId: string) {
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

  /**
   * Get projects grouped by target city
   * Hedef şehre göre gruplanmış projeleri getir
   */
  private async getProjectsByCity(tenantId: string) {
    const projects = await this.prisma.franchiseProject.findMany({
      where: { tenantId, targetCity: { not: null } },
      select: { targetCity: true },
    });

    const grouped = projects.reduce((acc: any, project) => {
      const city = project.targetCity || 'Unknown';
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([city, count]) => ({ city, count }));
  }

  /**
   * Calculate average feasibility score
   * Ortalama fizibilite skorunu hesapla
   */
  private async getAvgFeasibilityScore(tenantId: string): Promise<number> {
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
}
