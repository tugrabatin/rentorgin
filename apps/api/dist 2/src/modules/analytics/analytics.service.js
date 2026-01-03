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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStoreAnalytics(storeId, filters) {
        return this.prisma.storeAnalytics.findMany({
            where: { storeId, ...filters },
            include: { store: true },
            orderBy: [{ year: 'desc' }, { month: 'desc' }],
        });
    }
    async getPortfolioSummary(filters) {
        const analytics = await this.prisma.storeAnalytics.findMany({
            where: filters,
            include: { store: true },
        });
        const totalRevenue = analytics.reduce((sum, a) => sum + a.revenue, 0);
        const totalRent = analytics.reduce((sum, a) => sum + a.rent, 0);
        const avgRatio = totalRent / totalRevenue * 100;
        return {
            totalStores: new Set(analytics.map(a => a.storeId)).size,
            totalRevenue,
            totalRent,
            averageRentToRevenueRatio: avgRatio,
            analytics,
        };
    }
    async calculate(data) {
        const { storeId, year, month, revenue, rent, squareMeters } = data;
        const rentToRevenueRatio = (rent / revenue) * 100;
        const revenuePerSquareMeter = revenue / squareMeters;
        return this.prisma.storeAnalytics.create({
            data: {
                ...data,
                rentToRevenueRatio,
                revenuePerSquareMeter,
            },
        });
    }
    async compareStores(storeIds) {
        return this.prisma.storeAnalytics.findMany({
            where: { storeId: { in: storeIds } },
            include: { store: true },
        });
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map