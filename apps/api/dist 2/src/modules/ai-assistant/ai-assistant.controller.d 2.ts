import { AiAssistantService } from './ai-assistant.service';
export declare class AiAssistantController {
    private readonly aiService;
    constructor(aiService: AiAssistantService);
    executePrompt(data: {
        promptId: string;
        context: any;
        userInput: string;
    }): Promise<any>;
    submitFeedback(data: {
        interactionId: string;
        feedback: any;
    }): Promise<{
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
}
//# sourceMappingURL=ai-assistant.controller.d.ts.map