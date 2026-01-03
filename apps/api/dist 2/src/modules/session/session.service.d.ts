import { PrismaService } from '../../database/prisma.service';
export declare class SessionService {
    private prisma;
    constructor(prisma: PrismaService);
    exportSession(userId: string, name: string): Promise<{
        sessionId: string;
        downloadUrl: string;
    }>;
    importSession(userId: string, sessionData: any): Promise<{
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
//# sourceMappingURL=session.service.d.ts.map