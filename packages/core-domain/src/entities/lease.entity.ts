/**
 * Lease Entity
 * Represents a lease contract for a store
 * 
 * Kira Sözleşmesi Varlığı
 * Bir mağaza için kira sözleşmesini temsil eder
 */

import { LeaseStatus, EscalationType } from '../enums';
import { Money } from '../value-objects/money';
import { DateRange } from '../value-objects/date-range';
import { LEASE_CONSTANTS } from '../constants';

export interface ILease {
  id: string;
  tenantId: string;
  storeId: string;
  mallId?: string;
  assignedToId?: string;
  
  // Contract Basics
  contractNumber: string;
  version: number;
  status: LeaseStatus;
  
  // Dates
  dateRange: DateRange;
  signedDate?: Date;
  
  // Financial Terms
  monthlyRent: Money;
  
  // Escalation
  escalationType: EscalationType;
  escalationRate: number;
  escalationIndex?: string;
  
  // Renewal
  renewalOptionMonths?: number;
  renewalNoticeMonths: number;
  
  // Additional Terms
  commonAreaCharges?: Money;
  securityDeposit?: Money;
  fitOutPeriodDays?: number;
  
  // Documents
  documentUrl?: string;
  documentVersion: number;
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
}

export class LeaseEntity implements ILease {
  constructor(
    public id: string,
    public tenantId: string,
    public storeId: string,
    public contractNumber: string,
    public version: number,
    public status: LeaseStatus,
    public dateRange: DateRange,
    public monthlyRent: Money,
    public escalationType: EscalationType,
    public escalationRate: number,
    public renewalNoticeMonths: number,
    public documentVersion: number,
    public createdAt: Date,
    public updatedAt: Date,
    public mallId?: string,
    public assignedToId?: string,
    public signedDate?: Date,
    public escalationIndex?: string,
    public renewalOptionMonths?: number,
    public commonAreaCharges?: Money,
    public securityDeposit?: Money,
    public fitOutPeriodDays?: number,
    public documentUrl?: string,
  ) {}

  /**
   * Calculates current rent with escalation applied
   * Artış uygulanarak mevcut kirayı hesaplar
   */
  calculateCurrentRent(currentDate: Date = new Date()): Money {
    if (this.escalationType === EscalationType.NONE) {
      return this.monthlyRent;
    }

    const yearsElapsed = this.dateRange.startDate
      ? Math.floor(
          (currentDate.getTime() - this.dateRange.startDate.getTime()) /
            (1000 * 60 * 60 * 24 * 365),
        )
      : 0;

    if (yearsElapsed <= 0) {
      return this.monthlyRent;
    }

    if (this.escalationType === EscalationType.FIXED_PERCENTAGE) {
      const multiplier = Math.pow(1 + this.escalationRate / 100, yearsElapsed);
      return this.monthlyRent.multiply(multiplier);
    }

    // For INDEX_BASED and others, would need actual index data
    // This is simplified for now
    return this.monthlyRent;
  }

  /**
   * Checks if lease is nearing expiration
   * Kiranın sona ermeye yaklaşıp yaklaşmadığını kontrol eder
   */
  isNearingExpiration(
    currentDate: Date = new Date(),
    daysThreshold: number = LEASE_CONSTANTS.EXPIRING_SOON_THRESHOLD_DAYS,
  ): boolean {
    return this.dateRange.isNearingEnd(currentDate, daysThreshold);
  }

  /**
   * Checks if lease is expired
   * Kiranın sona erip ermediğini kontrol eder
   */
  isExpired(currentDate: Date = new Date()): boolean {
    return this.dateRange.isExpired(currentDate);
  }

  /**
   * Checks if lease is currently active
   * Kiranın şu anda aktif olup olmadığını kontrol eder
   */
  isActive(): boolean {
    return this.status === LeaseStatus.ACTIVE;
  }

  /**
   * Gets days remaining until expiration
   * Sona ermesine kalan günleri alır
   */
  getDaysRemaining(currentDate: Date = new Date()): number {
    return this.dateRange.getDaysRemaining(currentDate);
  }

  /**
   * Gets total annual rent cost including CAC
   * CAC dahil toplam yıllık kira maliyetini alır
   */
  getTotalAnnualCost(currentDate: Date = new Date()): Money {
    const currentRent = this.calculateCurrentRent(currentDate);
    const annualRent = currentRent.multiply(12);
    
    if (this.commonAreaCharges) {
      const annualCAC = this.commonAreaCharges.multiply(12);
      return annualRent.add(annualCAC);
    }
    
    return annualRent;
  }

  /**
   * Changes lease status
   * Kira durumunu değiştirir
   */
  changeStatus(newStatus: LeaseStatus): void {
    this.status = newStatus;
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
      storeId: this.storeId,
      mallId: this.mallId,
      assignedToId: this.assignedToId,
      contractNumber: this.contractNumber,
      version: this.version,
      status: this.status,
      dateRange: this.dateRange.toJSON(),
      signedDate: this.signedDate?.toISOString(),
      monthlyRent: this.monthlyRent.toJSON(),
      escalationType: this.escalationType,
      escalationRate: this.escalationRate,
      escalationIndex: this.escalationIndex,
      renewalOptionMonths: this.renewalOptionMonths,
      renewalNoticeMonths: this.renewalNoticeMonths,
      commonAreaCharges: this.commonAreaCharges?.toJSON(),
      securityDeposit: this.securityDeposit?.toJSON(),
      fitOutPeriodDays: this.fitOutPeriodDays,
      documentUrl: this.documentUrl,
      documentVersion: this.documentVersion,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}



















