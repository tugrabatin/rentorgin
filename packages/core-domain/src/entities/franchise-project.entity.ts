/**
 * Franchise Project Entity
 * Represents a franchise development project
 * 
 * Franchise Projesi Varlığı
 * Bir franchise geliştirme projesini temsil eder
 */

import { FranchiseProjectStatus } from '../enums';

export interface IFranchiseProject {
  id: string;
  tenantId: string;
  
  // Project Details
  name: string;
  code?: string;
  status: FranchiseProjectStatus;
  
  // Location Target
  targetRegion?: string;
  targetCity?: string;
  targetMallId?: string;
  
  // Store Type
  storeType?: string;
  brand?: string;
  concept?: string;
  
  // Financial Projections
  estimatedCapex?: number;
  estimatedOpex?: number;
  expectedRevenue?: number;
  expectedRentCost?: number;
  
  // Analysis
  feasibilityScore?: number;
  riskAssessment?: string;
  notes?: string;
  
  // Responsible
  projectManagerId?: string;
  
  // Dates
  targetOpeningDate?: Date;
  actualOpeningDate?: Date;
  
  // Related Store
  storeId?: string;
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
}

export class FranchiseProjectEntity implements IFranchiseProject {
  constructor(
    public id: string,
    public tenantId: string,
    public name: string,
    public status: FranchiseProjectStatus,
    public createdAt: Date,
    public updatedAt: Date,
    public code?: string,
    public targetRegion?: string,
    public targetCity?: string,
    public targetMallId?: string,
    public storeType?: string,
    public brand?: string,
    public concept?: string,
    public estimatedCapex?: number,
    public estimatedOpex?: number,
    public expectedRevenue?: number,
    public expectedRentCost?: number,
    public feasibilityScore?: number,
    public riskAssessment?: string,
    public notes?: string,
    public projectManagerId?: string,
    public targetOpeningDate?: Date,
    public actualOpeningDate?: Date,
    public storeId?: string,
  ) {}

  /**
   * Checks if project is in pipeline
   * Projenin planlama aşamasında olup olmadığını kontrol eder
   */
  isInPipeline(): boolean {
    return this.status === FranchiseProjectStatus.PIPELINE;
  }

  /**
   * Checks if project is approved
   * Projenin onaylanıp onaylanmadığını kontrol eder
   */
  isApproved(): boolean {
    return this.status === FranchiseProjectStatus.APPROVED;
  }

  /**
   * Checks if project is opened
   * Projenin açılıp açılmadığını kontrol eder
   */
  isOpened(): boolean {
    return this.status === FranchiseProjectStatus.OPENED;
  }

  /**
   * Calculates estimated ROI (Return on Investment)
   * Tahmini yatırım getirisini hesaplar
   */
  calculateEstimatedROI(): number | null {
    if (!this.expectedRevenue || !this.estimatedCapex || !this.estimatedOpex) {
      return null;
    }
    
    const annualProfit = this.expectedRevenue * 12 - this.estimatedOpex * 12;
    if (this.estimatedCapex === 0) return null;
    
    return (annualProfit / this.estimatedCapex) * 100;
  }

  /**
   * Calculates break-even months
   * Başabaş noktasına kaç ay içinde ulaşılacağını hesaplar
   */
  calculateBreakEvenMonths(): number | null {
    if (!this.expectedRevenue || !this.estimatedCapex || !this.estimatedOpex || !this.expectedRentCost) {
      return null;
    }
    
    const monthlyProfit = this.expectedRevenue - this.estimatedOpex - this.expectedRentCost;
    if (monthlyProfit <= 0) return null;
    
    return Math.ceil(this.estimatedCapex / monthlyProfit);
  }

  /**
   * Checks if project has assigned manager
   * Projenin atanmış yöneticisi olup olmadığını kontrol eder
   */
  hasProjectManager(): boolean {
    return !!this.projectManagerId;
  }

  /**
   * Changes project status
   * Proje durumunu değiştirir
   */
  changeStatus(newStatus: FranchiseProjectStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
    
    if (newStatus === FranchiseProjectStatus.OPENED && !this.actualOpeningDate) {
      this.actualOpeningDate = new Date();
    }
  }

  /**
   * Links project to a store
   * Projeyi bir mağazaya bağlar
   */
  linkToStore(storeId: string): void {
    this.storeId = storeId;
    this.updatedAt = new Date();
  }

  /**
   * Converts to plain object
   * Düz nesneye dönüştürür
   */
  toJSON() {
    return {
      id: this.id,
      tenantId: this.tenantId,
      name: this.name,
      code: this.code,
      status: this.status,
      targetRegion: this.targetRegion,
      targetCity: this.targetCity,
      targetMallId: this.targetMallId,
      storeType: this.storeType,
      brand: this.brand,
      concept: this.concept,
      estimatedCapex: this.estimatedCapex,
      estimatedOpex: this.estimatedOpex,
      expectedRevenue: this.expectedRevenue,
      expectedRentCost: this.expectedRentCost,
      feasibilityScore: this.feasibilityScore,
      riskAssessment: this.riskAssessment,
      notes: this.notes,
      projectManagerId: this.projectManagerId,
      targetOpeningDate: this.targetOpeningDate?.toISOString(),
      actualOpeningDate: this.actualOpeningDate?.toISOString(),
      storeId: this.storeId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      calculatedROI: this.calculateEstimatedROI(),
      calculatedBreakEven: this.calculateBreakEvenMonths(),
    };
  }
}
