/**
 * Risk Service
 * Risk yönetimi için iş mantığı
 * 
 * Risk Servisi
 * Risk yönetimi için iş mantığı
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';

@Injectable()
export class RiskService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create new risk
   * Yeni risk oluştur
   */
  async create(tenantId: string, createRiskDto: CreateRiskDto) {
    return this.prisma.risk.create({
      data: {
        tenantId,
        category: createRiskDto.category as any,
        severity: createRiskDto.severity as any,
        title: createRiskDto.title,
        description: createRiskDto.description,
        potentialImpact: createRiskDto.potentialImpact,
        probability: createRiskDto.probability,
        mitigationPlan: createRiskDto.mitigationPlan,
        mitigationCost: createRiskDto.mitigationCost,
        status: (createRiskDto.status || 'IDENTIFIED') as any,
      },
    });
  }

  /**
   * Find all risks for tenant
   * Tenant için tüm riskleri getir
   */
  async findAll(
    tenantId: string,
    filters?: {
      category?: string;
      severity?: string;
      status?: string;
    },
  ) {
    const where: any = { tenantId };

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.severity) {
      where.severity = filters.severity;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.risk.findMany({
      where,
      orderBy: [
        { severity: 'desc' },
        { identifiedAt: 'desc' },
      ],
    });
  }

  /**
   * Find one risk
   * Bir riski getir
   */
  async findOne(tenantId: string, id: string) {
    const risk = await this.prisma.risk.findFirst({
      where: {
        id,
        tenantId,
      },
    });

    if (!risk) {
      throw new NotFoundException('Risk not found');
    }

    return risk;
  }

  /**
   * Update risk
   * Risk'i güncelle
   */
  async update(tenantId: string, id: string, updateRiskDto: UpdateRiskDto) {
    await this.findOne(tenantId, id);

    const updateData: any = { ...updateRiskDto };

    // If status is RESOLVED, set mitigatedAt
    if (updateRiskDto.status === 'RESOLVED') {
      updateData.mitigatedAt = new Date();
    }

    return this.prisma.risk.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Delete risk
   * Risk'i sil
   */
  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.prisma.risk.delete({
      where: { id },
    });
  }

  /**
   * Get risk statistics
   * Risk istatistiklerini getir
   */
  async getStatistics(tenantId: string) {
    const risks = await this.prisma.risk.findMany({
      where: { tenantId },
    });

    const byCategory = risks.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const bySeverity = risks.reduce((acc, r) => {
      acc[r.severity] = (acc[r.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byStatus = risks.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalImpact = risks
      .filter((r) => r.potentialImpact !== null)
      .reduce((sum, r) => sum + (r.potentialImpact || 0), 0);

    const totalMitigationCost = risks
      .filter((r) => r.mitigationCost !== null)
      .reduce((sum, r) => sum + (r.mitigationCost || 0), 0);

    const criticalRisks = risks.filter((r) => r.severity === 'CRITICAL' && r.status !== 'RESOLVED');
    const highRisks = risks.filter((r) => r.severity === 'HIGH' && r.status !== 'RESOLVED');

    return {
      totalRisks: risks.length,
      criticalCount: criticalRisks.length,
      highCount: highRisks.length,
      totalImpact,
      totalMitigationCost,
      byCategory,
      bySeverity,
      byStatus,
      unresolvedCount: risks.filter((r) => r.status !== 'RESOLVED' && r.status !== 'ACCEPTED').length,
    };
  }

  /**
   * Get risk score (0-100)
   * Risk skoru hesapla (0-100)
   */
  async getRiskScore(tenantId: string): Promise<number> {
    const risks = await this.prisma.risk.findMany({
      where: {
        tenantId,
        status: {
          notIn: ['RESOLVED', 'ACCEPTED'],
        },
      },
    });

    if (risks.length === 0) return 100;

    let totalScore = 0;
    risks.forEach((risk) => {
      let severityScore = 0;
      switch (risk.severity) {
        case 'CRITICAL':
          severityScore = 100;
          break;
        case 'HIGH':
          severityScore = 75;
          break;
        case 'MEDIUM':
          severityScore = 50;
          break;
        case 'LOW':
          severityScore = 25;
          break;
      }

      const probabilityWeight = (risk.probability || 50) / 100;
      totalScore += severityScore * probabilityWeight;
    });

    const averageScore = totalScore / risks.length;
    return Math.max(0, Math.min(100, 100 - averageScore));
  }
}







