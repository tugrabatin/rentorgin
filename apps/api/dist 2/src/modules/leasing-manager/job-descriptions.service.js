"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobDescriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let JobDescriptionsService = class JobDescriptionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
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
    async findOne(id, tenantId) {
        const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
            where: { id, tenantId },
        });
        if (!jobDescription) {
            throw new common_1.NotFoundException(`Job description with ID ${id} not found`);
        }
        return jobDescription;
    }
    async create(tenantId, userId, createDto) {
        const data = {
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
    async update(id, tenantId, updateDto) {
        const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
            where: { id, tenantId },
        });
        if (!jobDescription) {
            throw new common_1.NotFoundException(`Job description with ID ${id} not found`);
        }
        const data = { ...updateDto };
        if (updateDto.companyContext && typeof updateDto.companyContext === 'object') {
            data.companyContext = JSON.stringify(updateDto.companyContext);
        }
        return this.prisma.jobDescriptionTemplate.update({
            where: { id },
            data,
        });
    }
    async remove(id, tenantId) {
        const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
            where: { id, tenantId },
        });
        if (!jobDescription) {
            throw new common_1.NotFoundException(`Job description with ID ${id} not found`);
        }
        await this.prisma.jobDescriptionTemplate.delete({ where: { id } });
        return {
            success: true,
            message: 'Job description deleted successfully',
        };
    }
    async publish(id, tenantId) {
        const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
            where: { id, tenantId },
        });
        if (!jobDescription) {
            throw new common_1.NotFoundException(`Job description with ID ${id} not found`);
        }
        return this.prisma.jobDescriptionTemplate.update({
            where: { id },
            data: { isPublished: true },
        });
    }
    async unpublish(id, tenantId) {
        const jobDescription = await this.prisma.jobDescriptionTemplate.findFirst({
            where: { id, tenantId },
        });
        if (!jobDescription) {
            throw new common_1.NotFoundException(`Job description with ID ${id} not found`);
        }
        return this.prisma.jobDescriptionTemplate.update({
            where: { id },
            data: { isPublished: false },
        });
    }
    async exportToPosting(id, tenantId, language = 'TR') {
        const jobDescription = await this.findOne(id, tenantId);
        if (language === 'TR') {
            return this.formatJobPostingTR(jobDescription);
        }
        else {
            return this.formatJobPostingEN(jobDescription);
        }
    }
    formatJobPostingTR(jd) {
        let output = `# ${jd.roleNameTR}\n\n`;
        if (jd.summaryTR) {
            output += `## Pozisyon Özeti\n${jd.summaryTR}\n\n`;
        }
        if (jd.responsibilitiesTR && jd.responsibilitiesTR.length > 0) {
            output += `## Görev ve Sorumluluklar\n`;
            jd.responsibilitiesTR.forEach((resp, idx) => {
                output += `${idx + 1}. ${resp}\n`;
            });
            output += '\n';
        }
        if (jd.skillsTR && jd.skillsTR.length > 0) {
            output += `## Aranan Nitelikler\n`;
            jd.skillsTR.forEach((skill, idx) => {
                output += `${idx + 1}. ${skill}\n`;
            });
            output += '\n';
        }
        if (jd.sectors && jd.sectors.length > 0) {
            output += `## Sektörler\n${jd.sectors.join(', ')}\n\n`;
        }
        return output;
    }
    formatJobPostingEN(jd) {
        let output = `# ${jd.roleNameEN}\n\n`;
        if (jd.summaryEN) {
            output += `## Position Summary\n${jd.summaryEN}\n\n`;
        }
        if (jd.responsibilitiesEN && jd.responsibilitiesEN.length > 0) {
            output += `## Responsibilities\n`;
            jd.responsibilitiesEN.forEach((resp, idx) => {
                output += `${idx + 1}. ${resp}\n`;
            });
            output += '\n';
        }
        if (jd.skillsEN && jd.skillsEN.length > 0) {
            output += `## Required Skills\n`;
            jd.skillsEN.forEach((skill, idx) => {
                output += `${idx + 1}. ${skill}\n`;
            });
            output += '\n';
        }
        if (jd.sectors && jd.sectors.length > 0) {
            output += `## Sectors\n${jd.sectors.join(', ')}\n\n`;
        }
        return output;
    }
    async getDefaultLeasingManagerTemplate() {
        const template = await this.prisma.leasingManagerRoleTemplate.findFirst({
            where: { isDefault: true, isActive: true },
        });
        if (!template) {
            throw new common_1.NotFoundException('Default Leasing Manager template not found');
        }
        return template;
    }
    async generateFromLeasingManagerTemplate(tenantId, userId, companyContext) {
        const template = await this.getDefaultLeasingManagerTemplate();
        const jobDescription = {
            roleNameTR: template.nameTR,
            roleNameEN: template.nameEN,
            summaryTR: template.descriptionTR,
            summaryEN: template.descriptionEN,
            responsibilitiesTR: template.coreResponsibilities,
            responsibilitiesEN: template.coreResponsibilities,
            skillsTR: template.coreSkills,
            skillsEN: template.coreSkills,
            sectors: template.sectors,
            seniorityLevel: template.seniorityLevel,
            companyContext: companyContext ? JSON.stringify(companyContext) : undefined,
            isTemplate: false,
            isPublished: false,
        };
        const created = await this.create(tenantId, userId, jobDescription);
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
};
exports.JobDescriptionsService = JobDescriptionsService;
exports.JobDescriptionsService = JobDescriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobDescriptionsService);
//# sourceMappingURL=job-descriptions.service.js.map