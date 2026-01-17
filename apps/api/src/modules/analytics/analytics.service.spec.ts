/**
 * Analytics Service Unit Tests
 * Tests for performance analytics calculations
 * 
 * Analitik Servisi Birim Testleri
 * Performans analitiği hesaplama testleri
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';
import { PrismaService } from '../../database/prisma.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    storeAnalytics: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStoreAnalytics', () => {
    it('should return analytics for a specific store', async () => {
      const mockAnalytics = [
        {
          id: 'a1',
          storeId: 's1',
          year: 2024,
          month: 12,
          revenue: 200000,
          rent: 50000,
          rentToRevenueRatio: 25,
          store: { id: 's1', name: 'Test Store' },
        },
      ];

      mockPrismaService.storeAnalytics.findMany.mockResolvedValue(mockAnalytics);

      const result = await service.getStoreAnalytics('s1', {});

      expect(result).toEqual(mockAnalytics);
      expect(prisma.storeAnalytics.findMany).toHaveBeenCalledWith({
        where: { storeId: 's1' },
        include: { store: true },
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
      });
    });

    it('should apply filters if provided', async () => {
      mockPrismaService.storeAnalytics.findMany.mockResolvedValue([]);

      await service.getStoreAnalytics('s1', { year: 2024, month: 12 });

      const call = (prisma.storeAnalytics.findMany as jest.Mock).mock.calls[0][0];
      expect(call.where).toMatchObject({ storeId: 's1', year: 2024, month: 12 });
    });

    it('should order results by date descending', async () => {
      mockPrismaService.storeAnalytics.findMany.mockResolvedValue([]);

      await service.getStoreAnalytics('s1', {});

      const call = (prisma.storeAnalytics.findMany as jest.Mock).mock.calls[0][0];
      expect(call.orderBy).toEqual([{ year: 'desc' }, { month: 'desc' }]);
    });
  });

  describe('getPortfolioSummary', () => {
    it('should calculate portfolio totals correctly', async () => {
      const mockAnalytics = [
        {
          id: 'a1',
          storeId: 's1',
          revenue: 100000,
          rent: 20000,
          store: { id: 's1' },
        },
        {
          id: 'a2',
          storeId: 's2',
          revenue: 150000,
          rent: 30000,
          store: { id: 's2' },
        },
      ];

      mockPrismaService.storeAnalytics.findMany.mockResolvedValue(mockAnalytics);

      const result = await service.getPortfolioSummary({});

      expect(result.totalRevenue).toBe(250000);
      expect(result.totalRent).toBe(50000);
      expect(result.averageRentToRevenueRatio).toBe(20); // 50000/250000 * 100
      expect(result.totalStores).toBe(2);
    });

    it('should handle empty analytics gracefully', async () => {
      mockPrismaService.storeAnalytics.findMany.mockResolvedValue([]);

      const result = await service.getPortfolioSummary({});

      expect(result.totalRevenue).toBe(0);
      expect(result.totalRent).toBe(0);
      expect(result.totalStores).toBe(0);
    });

    it('should filter analytics if filters provided', async () => {
      mockPrismaService.storeAnalytics.findMany.mockResolvedValue([]);

      await service.getPortfolioSummary({ year: 2024 });

      const call = (prisma.storeAnalytics.findMany as jest.Mock).mock.calls[0][0];
      expect(call.where).toMatchObject({ year: 2024 });
    });
  });

  describe('calculate', () => {
    it('should calculate KPIs correctly', async () => {
      const inputData = {
        storeId: 's1',
        year: 2024,
        month: 12,
        revenue: 200000,
        rent: 40000,
        squareMeters: 150,
        tenantId: 't1',
      };

      const expectedKPIs = {
        ...inputData,
        rentToRevenueRatio: 20, // 40000/200000 * 100
        revenuePerSquareMeter: 1333.33, // 200000/150
      };

      mockPrismaService.storeAnalytics.create.mockResolvedValue(expectedKPIs);

      const result = await service.calculate(inputData);

      expect(result.rentToRevenueRatio).toBeCloseTo(20, 1);
      expect(result.revenuePerSquareMeter).toBeCloseTo(1333.33, 1);
    });

    it('should handle zero revenue gracefully', async () => {
      const inputData = {
        storeId: 's1',
        year: 2024,
        month: 12,
        revenue: 0,
        rent: 40000,
        squareMeters: 150,
        tenantId: 't1',
      };

      mockPrismaService.storeAnalytics.create.mockResolvedValue(inputData);

      // Should not throw error, handle division by zero
      await expect(service.calculate(inputData)).resolves.toBeDefined();
    });
  });

  describe('compareStores', () => {
    it('should return analytics for multiple stores', async () => {
      const mockAnalytics = [
        { id: 'a1', storeId: 's1', revenue: 100000, store: { id: 's1', name: 'Store 1' } },
        { id: 'a2', storeId: 's2', revenue: 150000, store: { id: 's2', name: 'Store 2' } },
      ];

      mockPrismaService.storeAnalytics.findMany.mockResolvedValue(mockAnalytics);

      const result = await service.compareStores(['s1', 's2']);

      expect(result).toHaveLength(2);
      expect(prisma.storeAnalytics.findMany).toHaveBeenCalledWith({
        where: { storeId: { in: ['s1', 's2'] } },
        include: { store: true },
      });
    });

    it('should return empty array if no stores match', async () => {
      mockPrismaService.storeAnalytics.findMany.mockResolvedValue([]);

      const result = await service.compareStores(['nonexistent']);

      expect(result).toEqual([]);
    });
  });
});


















