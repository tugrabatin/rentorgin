import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getStoreAnalytics(storeId: string, filters: any) {
    return this.prisma.storeAnalytics.findMany({
      where: { storeId, ...filters },
      include: { store: true },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }

  async getPortfolioSummary(filters: any) {
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

  async calculate(data: any) {
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

  async compareStores(storeIds: string[]) {
    return this.prisma.storeAnalytics.findMany({
      where: { storeId: { in: storeIds } },
      include: { store: true },
    });
  }
}



















