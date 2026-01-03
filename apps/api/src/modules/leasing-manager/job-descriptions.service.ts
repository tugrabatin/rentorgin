/**
 * Job Descriptions Service
 * Business logic for job description management and generation
 * 
 * İş Tanımları Servisi
 * İş tanımı yönetimi ve oluşturma için iş mantığı
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateJobDescriptionDto } from './dto/create-job-description.dto';

@Injectable()
export class JobDescriptionsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all job description templates
   * Tüm iş tanımı şablonlarını getir
   */
  async findAll(tenantId: string, filters?: any) {
    const where: any = { tenantId };

    if (filters?.seniorityLevel) {
      where.seniorityLevel = filters.seniorityLevel;
    }
    if (filters?.isTemplate !== undefined) {
      where.isTemplate = filters.isTemplate === 'true';
    }
    if (filters?.isPublished !== undefined) {
      where.isPublished = filters.isPublished === 'true';
    }

    return this.prisma.jobDescriptionTemplate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get single job description by ID
   * ID ile tek iş tanımı getir
   */
  async findOne(id: string, tenantId: string) {
    const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
      where: { id, tenantId },
    });

    if (!jobDescription) {
      throw new NotFoundException(`Job description with ID ${id} not found`);
    }

    return jobDescription;
  }

  /**
   * Create new job description
   * Yeni iş tanımı oluştur
   */
  async create(tenantId: string, userId: string, createDto: CreateJobDescriptionDto) {
    const data: any = {
      ...createDto,
      tenantId,
      createdById: userId,
      seniorityLevel: createDto.seniorityLevel || 'MID',
      sectors: createDto.sectors || [],
      isTemplate: createDto.isTemplate || false,
      isPublished: createDto.isPublished || false,
    };

    if (createDto.companyContext && typeof createDto.companyContext === 'object') {
      data.companyContext = JSON.stringify(createDto.companyContext);
    }

    return this.prisma.jobDescriptionTemplate.create({ data });
  }

  /**
   * Update job description
   * İş tanımını güncelle
   */
  async update(id: string, tenantId: string, updateDto: Partial<CreateJobDescriptionDto>) {
    const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
      where: { id, tenantId },
    });

    if (!jobDescription) {
      throw new NotFoundException(`Job description with ID ${id} not found`);
    }

    const data: any = { ...updateDto };

    if (updateDto.companyContext && typeof updateDto.companyContext === 'object') {
      data.companyContext = JSON.stringify(updateDto.companyContext);
    }

    return this.prisma.jobDescriptionTemplate.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete job description
   * İş tanımını sil
   */
  async remove(id: string, tenantId: string) {
    const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
      where: { id, tenantId },
    });

    if (!jobDescription) {
      throw new NotFoundException(`Job description with ID ${id} not found`);
    }

    await this.prisma.jobDescriptionTemplate.delete({ where: { id } });

    return {
      success: true,
      message: 'Job description deleted successfully',
    };
  }

  /**
   * Publish job description
   * İş tanımını yayınla
   */
  async publish(id: string, tenantId: string) {
    const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
      where: { id, tenantId },
    });

    if (!jobDescription) {
      throw new NotFoundException(`Job description with ID ${id} not found`);
    }

    return this.prisma.jobDescriptionTemplate.update({
      where: { id },
      data: { isPublished: true },
    });
  }

  /**
   * Unpublish job description
   * İş tanımını yayından kaldır
   */
  async unpublish(id: string, tenantId: string) {
    const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
      where: { id, tenantId },
    });

    if (!jobDescription) {
      throw new NotFoundException(`Job description with ID ${id} not found`);
    }

    return this.prisma.jobDescriptionTemplate.update({
      where: { id },
      data: { isPublished: false },
    });
  }

  /**
   * Export job description to posting format
   * İş tanımını ilan formatına dışa aktar
   */
  async exportToPosting(id: string, tenantId: string, language: 'TR' | 'EN' = 'TR') {
    const jobDescription = await this.findOne(id, tenantId);

    if (language === 'TR') {
      return this.formatJobPostingTR(jobDescription);
    } else {
      return this.formatJobPostingEN(jobDescription);
    }
  }

  /**
   * Format job posting in Turkish
   * Türkçe iş ilanı formatla
   */
  private formatJobPostingTR(jd: any): string {
    let output = `# ${jd.roleNameTR}\n\n`;

    if (jd.summaryTR) {
      output += `## Pozisyon Özeti\n${jd.summaryTR}\n\n`;
    }

    if (jd.responsibilitiesTR && jd.responsibilitiesTR.length > 0) {
      output += `## Görev ve Sorumluluklar\n`;
      jd.responsibilitiesTR.forEach((resp: string, idx: number) => {
        output += `${idx + 1}. ${resp}\n`;
      });
      output += '\n';
    }

    if (jd.skillsTR && jd.skillsTR.length > 0) {
      output += `## Aranan Nitelikler\n`;
      jd.skillsTR.forEach((skill: string, idx: number) => {
        output += `${idx + 1}. ${skill}\n`;
      });
      output += '\n';
    }

    if (jd.sectors && jd.sectors.length > 0) {
      output += `## Sektörler\n${jd.sectors.join(', ')}\n\n`;
    }

    return output;
  }

  /**
   * Format job posting in English
   * İngilizce iş ilanı formatla
   */
  private formatJobPostingEN(jd: any): string {
    let output = `# ${jd.roleNameEN}\n\n`;

    if (jd.summaryEN) {
      output += `## Position Summary\n${jd.summaryEN}\n\n`;
    }

    if (jd.responsibilitiesEN && jd.responsibilitiesEN.length > 0) {
      output += `## Responsibilities\n`;
      jd.responsibilitiesEN.forEach((resp: string, idx: number) => {
        output += `${idx + 1}. ${resp}\n`;
      });
      output += '\n';
    }

    if (jd.skillsEN && jd.skillsEN.length > 0) {
      output += `## Required Skills\n`;
      jd.skillsEN.forEach((skill: string, idx: number) => {
        output += `${idx + 1}. ${skill}\n`;
      });
      output += '\n';
    }

    if (jd.sectors && jd.sectors.length > 0) {
      output += `## Sectors\n${jd.sectors.join(', ')}\n\n`;
    }

    return output;
  }

  /**
   * Get default Leasing Manager template
   * Varsayılan Kiralama Yöneticisi şablonunu getir
   */
  async getDefaultLeasingManagerTemplate() {
    const template = await this.prisma.leasingManagerRoleTemplate.findFirst({
      where: { isDefault: true, isActive: true },
    });

    if (!template) {
      throw new NotFoundException('Default Leasing Manager template not found');
    }

    return template;
  }

  /**
   * Generate job description from Leasing Manager template
   * Kiralama Yöneticisi şablonundan iş tanımı oluştur
   */
  async generateFromLeasingManagerTemplate(
    tenantId: string,
    userId: string,
    companyContext?: any,
  ) {
    const template = await this.getDefaultLeasingManagerTemplate();

    const jobDescription: CreateJobDescriptionDto = {
      roleNameTR: template.nameTR,
      roleNameEN: template.nameEN,
      summaryTR: template.descriptionTR,
      summaryEN: template.descriptionEN,
      responsibilitiesTR: template.coreResponsibilities,
      responsibilitiesEN: template.coreResponsibilities, // TODO: Add EN translations
      skillsTR: template.coreSkills,
      skillsEN: template.coreSkills, // TODO: Add EN translations
      sectors: template.sectors,
      seniorityLevel: template.seniorityLevel,
      companyContext: companyContext ? JSON.stringify(companyContext) : undefined,
      isTemplate: false,
      isPublished: false,
    };

    const created = await this.create(tenantId, userId, jobDescription);

    // Log the generation
    await this.prisma.jobDescriptionGenerationLog.create({
      data: {
        tenantId,
        userId,
        inputParams: JSON.stringify(companyContext || {}),
        templateId: created.id,
        model: 'template-based',
      },
    });

    return created;
  }
}
