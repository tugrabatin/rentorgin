/**
 * Analytics DTOs (Data Transfer Objects)
 * Request and response structures for analytics operations
 * 
 * Analitik DTO'ları (Veri Transfer Nesneleri)
 * Analitik işlemleri için istek ve yanıt yapıları
 */

import { PerformanceRecommendation } from '../enums';

export interface CreateStoreAnalyticsDto {
  storeId: string;
  year: number;
  month: number;
  revenue: number;
  rent: number;
  commonAreaCharges?: number;
  otherExpenses?: number;
  footTraffic?: number;
  conversionRate?: number;
}

export interface StoreAnalyticsResponseDto {
  id: string;
  tenantId: string;
  storeId: string;
  storeName?: string;
  year: number;
  month: number;
  revenue: number;
  rent: number;
  commonAreaCharges?: number;
  otherExpenses?: number;
  totalExpenses: number;
  rentToRevenueRatio: number;
  revenuePerSquareMeter: number;
  profitMargin?: number;
  footTraffic?: number;
  conversionRate?: number;
  performanceScore?: number;
  recommendation?: PerformanceRecommendation;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsReportFiltersDto {
  storeId?: string;
  storeIds?: string[];
  city?: string;
  brand?: string;
  startDate: string;
  endDate: string;
  groupBy?: 'month' | 'quarter' | 'year';
}

export interface PerformanceComparisonDto {
  storeId: string;
  storeName: string;
  averageScore: number;
  recommendation: PerformanceRecommendation;
  totalRevenue: number;
  totalRent: number;
  avgRentToRevenueRatio: number;
}

export interface PortfolioSummaryDto {
  totalStores: number;
  activeStores: number;
  totalRevenue: number;
  totalRent: number;
  averageRentToRevenueRatio: number;
  storesByRecommendation: Record<PerformanceRecommendation, number>;
  topPerformers: PerformanceComparisonDto[];
  underperformers: PerformanceComparisonDto[];
}




















