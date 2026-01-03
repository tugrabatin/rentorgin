import { SessionService } from './session.service';
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    exportSession(data: {
        userId: string;
        name: string;
    }): Promise<{
        sessionId: string;
        downloadUrl: string;
    }>;
    importSession(data: {
        userId: string;
        sessionData: any;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getUserSessions(userId: string): Promise<{
        description: string | null;
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        sessionData: string;
        appVersion: string;
        lastLoadedAt: Date | null;
    }[]>;
    getSession(sessionId: string): Promise<{
        description: string | null;
        tenantId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: string;
        sessionData: string;
        appVersion: string;
        lastLoadedAt: Date | null;
    }>;
}
//# sourceMappingURL=session.controller.d.ts.map