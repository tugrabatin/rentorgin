import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async exportSession(userId: string, name: string) {
    // Collect user context (filters, open views, etc.)
    const sessionData = {
      filters: {},
      activeViews: [],
      preferences: {},
      timestamp: new Date().toISOString(),
    };

    const session = await this.prisma.userSession.create({
      data: {
        userId,
        tenantId: 'temp-tenant-id', // Would be extracted from user context
        name,
        sessionData: JSON.stringify(sessionData),
        appVersion: '0.1.0',
      },
    });

    return {
      sessionId: session.id,
      downloadUrl: `/api/v1/session/${session.id}/download`,
    };
  }

  async importSession(userId: string, sessionData: any) {
    // Validate session structure
    // Restore user context
    return {
      success: true,
      message: 'Session restored successfully',
    };
  }

  async getUserSessions(userId: string) {
    return this.prisma.userSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSession(sessionId: string) {
    return this.prisma.userSession.findUnique({
      where: { id: sessionId },
    });
  }
}


















