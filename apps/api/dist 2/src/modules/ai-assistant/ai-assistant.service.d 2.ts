import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
export declare class AiAssistantService {
    private prisma;
    private configService;
    private openaiApiKey;
    private useRealAI;
    constructor(prisma: PrismaService, configService: ConfigService);
    executePrompt(promptId: string, context: any, userInput: string): Promise<any>;
    logFeedback(interactionId: string, feedback: any): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        promptId: string;
        promptVersion: string;
        module: string;
        contextData: string | null;
        userInput: string;
        aiResponse: string;
        wasAccepted: boolean | null;
        wasEdited: boolean;
        userEdits: string | null;
        satisfaction: number | null;
        model: string;
        tokensUsed: number | null;
        responseTime: number | null;
        userId: string;
    }>;
    private generateMockResponse;
}
//# sourceMappingURL=ai-assistant.service.d.ts.map