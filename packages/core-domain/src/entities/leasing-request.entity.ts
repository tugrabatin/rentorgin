/**
 * Leasing Request Entity
 * Represents a request or inquiry in the leasing workflow
 * 
 * Kiralama Talebi Varlığı
 * Kiralama iş akışındaki bir talep veya başvuruyu temsil eder
 */

import { LeasingRequestType, RequestSource, RequestStatus, TaskPriority } from '../enums';

export interface ILeasingRequest {
  id: string;
  tenantId: string;
  
  // Request Type & Source
  type: LeasingRequestType;
  source: RequestSource;
  
  // Details
  title: string;
  description?: string;
  
  // Relations
  storeId?: string;
  mallId?: string;
  leaseId?: string;
  franchiseProjectId?: string;
  
  // Assignment & Status
  createdById: string;
  assignedToId?: string;
  status: RequestStatus;
  priority: TaskPriority;
  
  // SLA
  dueDate?: Date;
  
  // Resolution
  resolution?: string;
  resolvedAt?: Date;
  resolvedById?: string;
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
}

export class LeasingRequestEntity implements ILeasingRequest {
  constructor(
    public id: string,
    public tenantId: string,
    public type: LeasingRequestType,
    public source: RequestSource,
    public title: string,
    public createdById: string,
    public status: RequestStatus,
    public priority: TaskPriority,
    public createdAt: Date,
    public updatedAt: Date,
    public description?: string,
    public storeId?: string,
    public mallId?: string,
    public leaseId?: string,
    public franchiseProjectId?: string,
    public assignedToId?: string,
    public dueDate?: Date,
    public resolution?: string,
    public resolvedAt?: Date,
    public resolvedById?: string,
  ) {}

  /**
   * Checks if request is open
   * Talebin açık olup olmadığını kontrol eder
   */
  isOpen(): boolean {
    return this.status === RequestStatus.OPEN;
  }

  /**
   * Checks if request is resolved
   * Talebin çözülüp çözülmediğini kontrol eder
   */
  isResolved(): boolean {
    return this.status === RequestStatus.RESOLVED;
  }

  /**
   * Checks if request is overdue
   * Talebin gecikip gecikmediğini kontrol eder
   */
  isOverdue(currentDate: Date = new Date()): boolean {
    if (!this.dueDate || this.isResolved()) {
      return false;
    }
    return currentDate > this.dueDate;
  }

  /**
   * Checks if request is assigned
   * Talebin atanıp atanmadığını kontrol eder
   */
  isAssigned(): boolean {
    return !!this.assignedToId;
  }

  /**
   * Checks if request is from external source
   * Talebin dış kaynaktan gelip gelmediğini kontrol eder
   */
  isExternalRequest(): boolean {
    return this.source === RequestSource.TENANT || 
           this.source === RequestSource.LANDLORD ||
           this.source === RequestSource.FRANCHISE_CANDIDATE;
  }

  /**
   * Gets days since creation
   * Oluşturulduğu günden bu yana geçen gün sayısını alır
   */
  getDaysSinceCreation(currentDate: Date = new Date()): number {
    const diffTime = Math.abs(currentDate.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Gets days until due
   * Son tarihe kadar kalan günleri alır
   */
  getDaysUntilDue(currentDate: Date = new Date()): number | null {
    if (!this.dueDate) return null;
    const diffTime = this.dueDate.getTime() - currentDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Assigns request to a user
   * Talebi bir kullanıcıya atar
   */
  assignTo(userId: string): void {
    this.assignedToId = userId;
    if (this.status === RequestStatus.OPEN) {
      this.status = RequestStatus.IN_PROGRESS;
    }
    this.updatedAt = new Date();
  }

  /**
   * Resolves the request
   * Talebi çözüme kavuşturur
   */
  resolve(resolution: string, resolvedById: string): void {
    this.status = RequestStatus.RESOLVED;
    this.resolution = resolution;
    this.resolvedAt = new Date();
    this.resolvedById = resolvedById;
    this.updatedAt = new Date();
  }

  /**
   * Rejects the request
   * Talebi reddeder
   */
  reject(reason: string, rejectedById: string): void {
    this.status = RequestStatus.REJECTED;
    this.resolution = reason;
    this.resolvedAt = new Date();
    this.resolvedById = rejectedById;
    this.updatedAt = new Date();
  }

  /**
   * Changes request status
   * Talep durumunu değiştirir
   */
  changeStatus(newStatus: RequestStatus): void {
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
      type: this.type,
      source: this.source,
      title: this.title,
      description: this.description,
      storeId: this.storeId,
      mallId: this.mallId,
      leaseId: this.leaseId,
      franchiseProjectId: this.franchiseProjectId,
      createdById: this.createdById,
      assignedToId: this.assignedToId,
      status: this.status,
      priority: this.priority,
      dueDate: this.dueDate?.toISOString(),
      resolution: this.resolution,
      resolvedAt: this.resolvedAt?.toISOString(),
      resolvedById: this.resolvedById,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
