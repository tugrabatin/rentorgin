import { PrismaService } from '../../database/prisma.service';
export declare class TranslationService {
    private prisma;
    constructor(prisma: PrismaService);
    startTranslation(data: {
        documentUrl: string;
        sourceLang: string;
        targetLang: string;
        tenantId?: string;
    }): Promise<{
        jobId: string;
        status: import(".prisma/client").$Enums.TranslationStatus;
        message: string;
    }>;
    getJobStatus(jobId: string): Promise<{
        segments: {
            id: string;
            status: import(".prisma/client").$Enums.SegmentStatus;
            createdAt: Date;
            updatedAt: Date;
            jobId: string;
            segmentNumber: number;
            sourceText: string;
            translatedText: string | null;
            lengthDifference: number | null;
            qualityScore: number | null;
            wordCount: number;
            charCount: number;
        }[];
    } & {
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.TranslationStatus;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date | null;
        sourceDocumentUrl: string;
        sourceLanguage: string;
        targetLanguage: string;
        totalSegments: number;
        completedSegments: number;
        progress: number;
        translatedDocumentUrl: string | null;
        averageQualityScore: number | null;
    }>;
    getProgress(jobId: string): Promise<{
        jobId: string;
        progress: number;
        completedSegments: number;
        totalSegments: number;
        status: import(".prisma/client").$Enums.TranslationStatus;
    }>;
}
//# sourceMappingURL=translation.service.d.ts.map