/**
 * Job Descriptions Service Unit Tests
 * İş Tanımları Servisi Birim Testleri
 */

import { Test, TestingModule } from '@nestjs/testing';
import { JobDescriptionsService } from '../job-descriptions.service';
import { PrismaService } from '../../../database/prisma.service';

describe('JobDescriptionsService', () => {
  let service: JobDescriptionsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    jobDescriptionTemplate: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    leasingManagerRoleTemplate: {
      findFirst: jest.fn(),
    },
    jobDescriptionGenerationLog: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobDescriptionsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<JobDescriptionsService>(JobDescriptionsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all job descriptions for a tenant', async () => {
      const mockTemplates = [
        {
          id: '1',
          tenantId: 'tenant-1',
          roleNameTR: 'Kiralama Yöneticisi',
          roleNameEN: 'Leasing Manager',
        },
      ];

      mockPrismaService.jobDescriptionTemplate.findMany.mockResolvedValue(mockTemplates);

      const result = await service.findAll('tenant-1');

      expect(result).toEqual(mockTemplates);
      expect(prisma.jobDescriptionTemplate.findMany).toHaveBeenCalledWith({
        where: { tenantId: 'tenant-1' },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should filter by seniority level', async () => {
      mockPrismaService.jobDescriptionTemplate.findMany.mockResolvedValue([]);

      await service.findAll('tenant-1', { seniorityLevel: 'SENIOR' });

      expect(prisma.jobDescriptionTemplate.findMany).toHaveBeenCalledWith({
        where: { tenantId: 'tenant-1', seniorityLevel: 'SENIOR' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('create', () => {
    it('should create a new job description template', async () => {
      const createDto = {
        roleNameTR: 'Kiralama Yöneticisi',
        roleNameEN: 'Leasing Manager',
        responsibilitiesTR: ['Sorumluluk 1'],
        responsibilitiesEN: ['Responsibility 1'],
        skillsTR: ['Yetenek 1'],
        skillsEN: ['Skill 1'],
      };

      const mockCreated = { id: '1', ...createDto, tenantId: 'tenant-1' };
      mockPrismaService.jobDescriptionTemplate.create.mockResolvedValue(mockCreated);

      const result = await service.create('tenant-1', 'user-1', createDto);

      expect(result).toEqual(mockCreated);
      expect(prisma.jobDescriptionTemplate.create).toHaveBeenCalled();
    });
  });

  describe('exportToPosting', () => {
    it('should export job description in Turkish format', async () => {
      const mockTemplate = {
        id: '1',
        roleNameTR: 'Kiralama Yöneticisi',
        roleNameEN: 'Leasing Manager',
        summaryTR: 'Test özeti',
        responsibilitiesTR: ['Sorumluluk 1', 'Sorumluluk 2'],
        skillsTR: ['Yetenek 1', 'Yetenek 2'],
        sectors: ['Perakende', 'AVM'],
      };

      mockPrismaService.jobDescriptionTemplate.findFirst.mockResolvedValue(mockTemplate);

      const result = await service.exportToPosting('1', 'tenant-1', 'TR');

      expect(result).toContain('# Kiralama Yöneticisi');
      expect(result).toContain('## Görev ve Sorumluluklar');
      expect(result).toContain('Sorumluluk 1');
      expect(result).toContain('## Aranan Nitelikler');
      expect(result).toContain('Yetenek 1');
    });

    it('should export job description in English format', async () => {
      const mockTemplate = {
        id: '1',
        roleNameEN: 'Leasing Manager',
        summaryEN: 'Test summary',
        responsibilitiesEN: ['Responsibility 1', 'Responsibility 2'],
        skillsEN: ['Skill 1', 'Skill 2'],
        sectors: ['Retail', 'Shopping Mall'],
      };

      mockPrismaService.jobDescriptionTemplate.findFirst.mockResolvedValue(mockTemplate);

      const result = await service.exportToPosting('1', 'tenant-1', 'EN');

      expect(result).toContain('# Leasing Manager');
      expect(result).toContain('## Responsibilities');
      expect(result).toContain('Responsibility 1');
    });
  });

  describe('generateFromLeasingManagerTemplate', () => {
    it('should generate job description from default template', async () => {
      const mockTemplate = {
        id: 'template-1',
        nameTR: 'Kiralama Yöneticisi',
        nameEN: 'Leasing Manager',
        descriptionTR: 'Açıklama',
        descriptionEN: 'Description',
        coreResponsibilities: ['Sorumluluk 1'],
        coreSkills: ['Yetenek 1'],
        sectors: ['Perakende'],
        seniorityLevel: 'MID',
      };

      const mockCreated = { id: 'jd-1', ...mockTemplate };

      mockPrismaService.leasingManagerRoleTemplate.findFirst.mockResolvedValue(mockTemplate);
      mockPrismaService.jobDescriptionTemplate.create.mockResolvedValue(mockCreated);
      mockPrismaService.jobDescriptionGenerationLog.create.mockResolvedValue({});

      const result = await service.generateFromLeasingManagerTemplate('tenant-1', 'user-1');

      expect(result).toBeDefined();
      expect(result.roleNameTR).toBe('Kiralama Yöneticisi');
      expect(prisma.leasingManagerRoleTemplate.findFirst).toHaveBeenCalledWith({
        where: { isDefault: true, isActive: true },
      });
      expect(prisma.jobDescriptionGenerationLog.create).toHaveBeenCalled();
    });

    it('should throw error if default template not found', async () => {
      mockPrismaService.leasingManagerRoleTemplate.findFirst.mockResolvedValue(null);

      await expect(
        service.generateFromLeasingManagerTemplate('tenant-1', 'user-1')
      ).rejects.toThrow('Default Leasing Manager template not found');
    });
  });

  describe('publish/unpublish', () => {
    it('should publish a job description', async () => {
      const mockTemplate = { id: '1', tenantId: 'tenant-1', isPublished: false };
      mockPrismaService.jobDescriptionTemplate.findFirst.mockResolvedValue(mockTemplate);
      mockPrismaService.jobDescriptionTemplate.update.mockResolvedValue({ ...mockTemplate, isPublished: true });

      const result = await service.publish('1', 'tenant-1');

      expect(result.isPublished).toBe(true);
      expect(prisma.jobDescriptionTemplate.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { isPublished: true },
      });
    });

    it('should unpublish a job description', async () => {
      const mockTemplate = { id: '1', tenantId: 'tenant-1', isPublished: true };
      mockPrismaService.jobDescriptionTemplate.findFirst.mockResolvedValue(mockTemplate);
      mockPrismaService.jobDescriptionTemplate.update.mockResolvedValue({ ...mockTemplate, isPublished: false });

      const result = await service.unpublish('1', 'tenant-1');

      expect(result.isPublished).toBe(false);
    });
  });
});









