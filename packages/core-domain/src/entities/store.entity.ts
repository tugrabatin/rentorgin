/**
 * Store Entity
 * Represents a retail store location
 * 
 * Mağaza Varlığı
 * Bir perakende mağaza lokasyonunu temsil eder
 */

import { StoreStatus } from '../enums';
import { Address } from '../value-objects/address';

export interface IStore {
  id: string;
  tenantId: string;
  
  // Basic Info
  name: string;
  code: string;
  brand?: string;
  concept?: string;
  
  // Location
  address: Address;
  
  // Size & Status
  squareMeters: number;
  status: StoreStatus;
  
  // Dates
  openingDate?: Date;
  closingDate?: Date;
  
  // Relations
  mallId?: string;
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
}

export class StoreEntity implements IStore {
  constructor(
    public id: string,
    public tenantId: string,
    public name: string,
    public code: string,
    public address: Address,
    public squareMeters: number,
    public status: StoreStatus,
    public createdAt: Date,
    public updatedAt: Date,
    public brand?: string,
    public concept?: string,
    public openingDate?: Date,
    public closingDate?: Date,
    public mallId?: string,
  ) {}

  /**
   * Checks if store is currently active
   * Mağazanın şu anda aktif olup olmadığını kontrol eder
   */
  isActive(): boolean {
    return this.status === StoreStatus.ACTIVE;
  }

  /**
   * Checks if store is closed
   * Mağazanın kapalı olup olmadığını kontrol eder
   */
  isClosed(): boolean {
    return this.status === StoreStatus.CLOSED;
  }

  /**
   * Gets store age in days since opening
   * Açılıştan bu yana mağaza yaşını gün olarak alır
   */
  getAgeInDays(): number | null {
    if (!this.openingDate) return null;
    const diffTime = Math.abs(new Date().getTime() - this.openingDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Changes store status
   * Mağaza durumunu değiştirir
   */
  changeStatus(newStatus: StoreStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
    
    if (newStatus === StoreStatus.CLOSED && !this.closingDate) {
      this.closingDate = new Date();
    }
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
      brand: this.brand,
      concept: this.concept,
      address: this.address.toJSON(),
      squareMeters: this.squareMeters,
      status: this.status,
      openingDate: this.openingDate?.toISOString(),
      closingDate: this.closingDate?.toISOString(),
      mallId: this.mallId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}




















