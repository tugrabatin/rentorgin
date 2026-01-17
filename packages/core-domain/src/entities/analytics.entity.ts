/**
 * Store Analytics Entity
 * Represents performance analytics for a store
 * 
 * Mağaza Analitik Varlığı
 * Bir mağazanın performans analitiğini temsil eder
 */

import { PerformanceRecommendation } from '../enums';
import { FINANCIAL_THRESHOLDS, PERFORMANCE_SCORING } from '../constants';

export interface IStoreAnalytics {
  id: string;
  tenantId: string;
  storeId: string;
  
  // Period
  year: number;
  month: number;
  
  // Financial Metrics
  revenue: number;
  rent: number;
  commonAreaCharges?: number;
  otherExpenses?: number;
  
  // Calculated KPIs
  rentToRevenueRatio: number;
  revenuePerSquareMeter: number;
  profitMargin?: number;
  
  // Foot Traffic
  footTraffic?: number;
  conversionRate?: number;
  
  // Performance Score (0-100)
  performanceScore?: number;
  recommendation?: PerformanceRecommendation;
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
}

export class StoreAnalyticsEntity implements IStoreAnalytics {
  constructor(
    public id: string,
    public tenantId: string,
    public storeId: string,
    public year: number,
    public month: number,
    public revenue: number,
    public rent: number,
    public rentToRevenueRatio: number,
    public revenuePerSquareMeter: number,
    public createdAt: Date,
    public updatedAt: Date,
    public commonAreaCharges?: number,
    public otherExpenses?: number,
    public profitMargin?: number,
    public footTraffic?: number,
    public conversionRate?: number,
    public performanceScore?: number,
    public recommendation?: PerformanceRecommendation,
  ) {}

  /**
   * Calculates and updates the performance score
   * Performans puanını hesaplar ve günceller
   */
  calculatePerformanceScore(): number {
    const scores: number[] = [];
    const weights = PERFORMANCE_SCORING.WEIGHTS;

    // Rent to Revenue Score (lower is better)
    if (this.rentToRevenueRatio <= FINANCIAL_THRESHOLDS.EXCELLENT_RATIO) {
      scores.push(100 * weights.RENT_TO_REVENUE);
    } else if (this.rentToRevenueRatio <= FINANCIAL_THRESHOLDS.GOOD_RATIO) {
      scores.push(80 * weights.RENT_TO_REVENUE);
    } else if (this.rentToRevenueRatio <= FINANCIAL_THRESHOLDS.ACCEPTABLE_RATIO) {
      scores.push(60 * weights.RENT_TO_REVENUE);
    } else if (this.rentToRevenueRatio <= FINANCIAL_THRESHOLDS.WARNING_RATIO) {
      scores.push(40 * weights.RENT_TO_REVENUE);
    } else {
      scores.push(20 * weights.RENT_TO_REVENUE);
    }

    // Revenue per SQM Score (higher is better)
    if (this.revenuePerSquareMeter >= FINANCIAL_THRESHOLDS.HIGH_REVENUE_PER_SQM) {
      scores.push(100 * weights.REVENUE_PER_SQM);
    } else if (this.revenuePerSquareMeter >= FINANCIAL_THRESHOLDS.MEDIUM_REVENUE_PER_SQM) {
      scores.push(70 * weights.REVENUE_PER_SQM);
    } else if (this.revenuePerSquareMeter >= FINANCIAL_THRESHOLDS.LOW_REVENUE_PER_SQM) {
      scores.push(40 * weights.REVENUE_PER_SQM);
    } else {
      scores.push(20 * weights.REVENUE_PER_SQM);
    }

    // Profit Margin Score (if available)
    if (this.profitMargin !== undefined) {
      if (this.profitMargin >= 20) {
        scores.push(100 * weights.PROFIT_MARGIN);
      } else if (this.profitMargin >= 10) {
        scores.push(70 * weights.PROFIT_MARGIN);
      } else if (this.profitMargin >= 5) {
        scores.push(50 * weights.PROFIT_MARGIN);
      } else {
        scores.push(30 * weights.PROFIT_MARGIN);
      }
    }

    // Conversion Rate Score (if available)
    if (this.conversionRate !== undefined) {
      if (this.conversionRate >= 15) {
        scores.push(100 * weights.FOOT_TRAFFIC_CONVERSION);
      } else if (this.conversionRate >= 10) {
        scores.push(70 * weights.FOOT_TRAFFIC_CONVERSION);
      } else if (this.conversionRate >= 5) {
        scores.push(50 * weights.FOOT_TRAFFIC_CONVERSION);
      } else {
        scores.push(30 * weights.FOOT_TRAFFIC_CONVERSION);
      }
    }

    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    this.performanceScore = Math.round(totalScore);
    
    return this.performanceScore;
  }

  /**
   * Generates a performance recommendation
   * Performans önerisi oluşturur
   */
  generateRecommendation(): PerformanceRecommendation {
    const score = this.performanceScore ?? this.calculatePerformanceScore();

    if (score >= 80) {
      this.recommendation = PerformanceRecommendation.CONTINUE;
    } else if (score >= 60) {
      this.recommendation = PerformanceRecommendation.MONITOR;
    } else if (score >= 40) {
      this.recommendation = PerformanceRecommendation.RENEGOTIATE;
    } else if (score >= 20) {
      this.recommendation = PerformanceRecommendation.DOWNSIZE;
    } else {
      this.recommendation = PerformanceRecommendation.CLOSE;
    }

    return this.recommendation;
  }

  /**
   * Checks if performance is excellent
   * Performansın mükemmel olup olmadığını kontrol eder
   */
  isExcellentPerformance(): boolean {
    const score = this.performanceScore ?? this.calculatePerformanceScore();
    return score >= PERFORMANCE_SCORING.SCORE_RANGES.EXCELLENT.min;
  }

  /**
   * Checks if performance needs attention
   * Performansın dikkat gerektirip gerektirmediğini kontrol eder
   */
  needsAttention(): boolean {
    const score = this.performanceScore ?? this.calculatePerformanceScore();
    return score < PERFORMANCE_SCORING.SCORE_RANGES.ACCEPTABLE.min;
  }

  /**
   * Gets total expenses for the period
   * Dönem için toplam giderleri alır
   */
  getTotalExpenses(): number {
    return this.rent + (this.commonAreaCharges ?? 0) + (this.otherExpenses ?? 0);
  }

  /**
   * Converts to plain object
   * Düz nesneye dönüştürür
   */
  toJSON() {
    return {
      id: this.id,
      tenantId: this.tenantId,
      storeId: this.storeId,
      year: this.year,
      month: this.month,
      revenue: this.revenue,
      rent: this.rent,
      commonAreaCharges: this.commonAreaCharges,
      otherExpenses: this.otherExpenses,
      rentToRevenueRatio: this.rentToRevenueRatio,
      revenuePerSquareMeter: this.revenuePerSquareMeter,
      profitMargin: this.profitMargin,
      footTraffic: this.footTraffic,
      conversionRate: this.conversionRate,
      performanceScore: this.performanceScore,
      recommendation: this.recommendation,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}




















