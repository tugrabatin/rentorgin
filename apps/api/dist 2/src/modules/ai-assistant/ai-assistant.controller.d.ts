import { AiAssistantService } from './ai-assistant.service';
export declare class AiAssistantController {
    private readonly aiService;
    constructor(aiService: AiAssistantService);
    executePrompt(data: {
        promptId: string;
        context: any;
        userInput: string;
    }): Promise<{
        interactionId: string;
        response: string;
        timestamp: Date;
        model: string;
        jobDescription: {
            tenantId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roleNameTR: string;
            roleNameEN: string;
            summaryTR: string | null;
            summaryEN: string | null;
            responsibilitiesTR: string[];
            responsibilitiesEN: string[];
            skillsTR: string[];
            skillsEN: string[];
            sectors: string[];
            seniorityLevel: import(".prisma/client").$Enums.SeniorityLevel;
            companyContext: string | null;
            isTemplate: boolean;
            isPublished: boolean;
            createdById: string;
        };
    } | {
        interactionId: string;
        response: string;
        timestamp: Date;
        model: string;
    }>;
    submitFeedback(data: {
        interactionId: string;
        feedback: any;
    }): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        model: string;
        tokensUsed: number | null;
        responseTime: number | null;
        userId: string;
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
    }>;
}
//# sourceMappingURL=ai-assistant.controller.d.ts.map