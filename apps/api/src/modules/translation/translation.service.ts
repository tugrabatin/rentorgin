import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TranslationService {
  constructor(private prisma: PrismaService) {}

  async startTranslation(data: { documentUrl: string; sourceLang: string; targetLang: string; tenantId?: string }) {
    // Create translation job
    const job = await this.prisma.translationJob.create({
      data: {
        tenantId: data.tenantId || 'default-tenant',
        sourceDocumentUrl: data.documentUrl,
        sourceLanguage: data.sourceLang,
        targetLanguage: data.targetLang,
        totalSegments: 10, // Would be calculated from document
        status: 'PENDING',
      },
    });

    // In production, trigger background job for segmentation and translation
    return {
      jobId: job.id,
      status: job.status,
      message: 'Translation job started',
    };
  }

  async getJobStatus(jobId: string) {
    return this.prisma.translationJob.findUnique({
      where: { id: jobId },
      include: { segments: true },
    });
  }

  async getProgress(jobId: string) {
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
}



















