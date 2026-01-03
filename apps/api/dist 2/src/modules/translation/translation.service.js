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
exports.TranslationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let TranslationService = class TranslationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async startTranslation(data) {
        const job = await this.prisma.translationJob.create({
            data: {
                tenantId: data.tenantId || 'default-tenant',
                sourceDocumentUrl: data.documentUrl,
                sourceLanguage: data.sourceLang,
                targetLanguage: data.targetLang,
                totalSegments: 10,
                status: 'PENDING',
            },
        });
        return {
            jobId: job.id,
            status: job.status,
            message: 'Translation job started',
        };
    }
    async getJobStatus(jobId) {
        return this.prisma.translationJob.findUnique({
            where: { id: jobId },
            include: { segments: true },
        });
    }
    async getProgress(jobId) {
        const job = await this.prisma.translationJob.findUnique({
            where: { id: jobId },
        });
        return {
            jobId,
            progress: job?.progress || 0,
            completedSegments: job?.completedSegments || 0,
            totalSegments: job?.totalSegments || 0,
            status: job?.status,
        };
    }
};
exports.TranslationService = TranslationService;
exports.TranslationService = TranslationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TranslationService);
//# sourceMappingURL=translation.service.js.map