/**
 * Leasing Task Entity
 * Represents a task in the leasing management workflow
 * 
 * Kiralama Görevi Varlığı
 * Kiralama yönetimi iş akışındaki bir görevi temsil eder
 */

import { LeasingTaskCategory, TaskPriority, TaskStatus, RiskLevel } from '../enums';

export interface ILeasingTask {
  id: string;
  tenantId: string;
  
  // Task Details
  category: LeasingTaskCategory;
  title: string;
  description?: string;
  priority: TaskPriority;
  
  // Relations
  storeId?: string;
  mallId?: string;
  franchiseProjectId?: string;
  leaseId?: string;
  
  // Assignment
  assignedToId?: string;
  
  // SLA & Risk
  defaultSLA?: number;
  riskLevel: RiskLevel;
  
  // Status
  status: TaskStatus;
  
  // Dates
  dueDate?: Date;
  completedAt?: Date;
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
}

export class LeasingTaskEntity implements ILeasingTask {
  constructor(
    public id: string,
    public tenantId: string,
    public category: LeasingTaskCategory,
    public title: string,
    public priority: TaskPriority,
    public riskLevel: RiskLevel,
    public status: TaskStatus,
    public createdAt: Date,
    public updatedAt: Date,
    public description?: string,
    public storeId?: string,
    public mallId?: string,
    public franchiseProjectId?: string,
    public leaseId?: string,
    public assignedToId?: string,
    public defaultSLA?: number,
    public dueDate?: Date,
    public completedAt?: Date,
  ) {}

  /**
   * Checks if task is overdue
   * Görevin gecikip gecikmediğini kontrol eder
   */
  isOverdue(currentDate: Date = new Date()): boolean {
    if (!this.dueDate || this.status === TaskStatus.COMPLETED) {
      return false;
    }
    return currentDate > this.dueDate;
  }

  /**
   * Checks if task is completed
   * Görevin tamamlanıp tamamlanmadığını kontrol eder
   */
  isCompleted(): boolean {
    return this.status === TaskStatus.COMPLETED;
  }

  /**
   * Checks if task is assigned
   * Görevin atanıp atanmadığını kontrol eder
   */
  isAssigned(): boolean {
    return !!this.assignedToId;
  }

  /**
   * Gets days until due date
   * Son tarihe kadar kalan günleri alır
   */
  getDaysUntilDue(currentDate: Date = new Date()): number | null {
    if (!this.dueDate) return null;
    const diffTime = this.dueDate.getTime() - currentDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Assigns task to a user
   * Görevi bir kullanıcıya atar
   */
  assignTo(userId: string): void {
    this.assignedToId = userId;
    this.updatedAt = new Date();
  }

  /**
   * Marks task as completed
   * Görevi tamamlanmış olarak işaretler
   */
  complete(): void {
    this.status = TaskStatus.COMPLETED;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Changes task status
   * Görev durumunu değiştirir
   */
  changeStatus(newStatus: TaskStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
    
    if (newStatus === TaskStatus.COMPLETED && !this.completedAt) {
      this.completedAt = new Date();
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
      category: this.category,
      title: this.title,
      description: this.description,
      priority: this.priority,
      storeId: this.storeId,
      mallId: this.mallId,
      franchiseProjectId: this.franchiseProjectId,
      leaseId: this.leaseId,
      assignedToId: this.assignedToId,
      defaultSLA: this.defaultSLA,
      riskLevel: this.riskLevel,
      status: this.status,
      dueDate: this.dueDate?.toISOString(),
      completedAt: this.completedAt?.toISOString(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
