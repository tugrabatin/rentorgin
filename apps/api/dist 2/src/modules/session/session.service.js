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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let SessionService = class SessionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async exportSession(userId, name) {
        const sessionData = {
            filters: {},
            activeViews: [],
            preferences: {},
            timestamp: new Date().toISOString(),
        };
        const session = await this.prisma.userSession.create({
            data: {
                userId,
                tenantId: 'temp-tenant-id',
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
    async importSession(userId, sessionData) {
        return {
            success: true,
            message: 'Session restored successfully',
        };
    }
    async getUserSessions(userId) {
        return this.prisma.userSession.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getSession(sessionId) {
        return this.prisma.userSession.findUnique({
            where: { id: sessionId },
        });
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessionService);
//# sourceMappingURL=session.service.js.map