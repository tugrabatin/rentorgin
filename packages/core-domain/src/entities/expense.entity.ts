/**
 * Expense Entity
 * Represents an expense related to a store
 * 
 * Gider Varlığı
 * Bir mağazayla ilgili gideri temsil eder
 */

import { ExpenseType, ExpenseStatus } from '../enums';
import { Money } from '../value-objects/money';

export interface IExpense {
  id: string;
  tenantId: string;
  storeId: string;
  
  type: ExpenseType;
  category?: string;
  description?: string;
  
  // Financial
  amount: Money;
  
  // Dates
  dueDate: Date;
  paidDate?: Date;
  
  // Status
  status: ExpenseStatus;
  
  // Dispute
  isDisputed: boolean;
  disputeReason?: string;
  disputeResolvedAt?: Date;
  
  // Invoice
  invoiceNumber?: string;
  invoiceUrl?: string;
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
}

export class ExpenseEntity implements IExpense {
  constructor(
    public id: string,
    public tenantId: string,
    public storeId: string,
    public type: ExpenseType,
    public amount: Money,
    public dueDate: Date,
    public status: ExpenseStatus,
    public isDisputed: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public category?: string,
    public description?: string,
    public paidDate?: Date,
    public disputeReason?: string,
    public disputeResolvedAt?: Date,
    public invoiceNumber?: string,
    public invoiceUrl?: string,
  ) {}

  /**
   * Checks if expense is overdue
   * Giderin vadesi geçmiş mi kontrol eder
   */
  isOverdue(currentDate: Date = new Date()): boolean {
    return !this.paidDate && currentDate > this.dueDate;
  }

  /**
   * Checks if expense is paid
   * Giderin ödenmiş olup olmadığını kontrol eder
   */
  isPaid(): boolean {
    return this.status === ExpenseStatus.PAID && this.paidDate !== undefined;
  }

  /**
   * Gets days until due date
   * Vade tarihine kalan günleri alır
   */
  getDaysUntilDue(currentDate: Date = new Date()): number {
    const diffTime = this.dueDate.getTime() - currentDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Marks expense as paid
   * Gideri ödenmiş olarak işaretler
   */
  markAsPaid(paidDate: Date = new Date()): void {
    this.status = ExpenseStatus.PAID;
    this.paidDate = paidDate;
    this.updatedAt = new Date();
  }

  /**
   * Opens a dispute
   * Uyuşmazlık açar
   */
  openDispute(reason: string): void {
    this.isDisputed = true;
    this.disputeReason = reason;
    this.status = ExpenseStatus.DISPUTED;
    this.updatedAt = new Date();
  }

  /**
   * Resolves a dispute
   * Uyuşmazlığı çözer
   */
  resolveDispute(): void {
    this.isDisputed = false;
    this.disputeResolvedAt = new Date();
    this.status = ExpenseStatus.PENDING;
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
      type: this.type,
      category: this.category,
      description: this.description,
      amount: this.amount.toJSON(),
      dueDate: this.dueDate.toISOString(),
      paidDate: this.paidDate?.toISOString(),
      status: this.status,
      isDisputed: this.isDisputed,
      disputeReason: this.disputeReason,
      disputeResolvedAt: this.disputeResolvedAt?.toISOString(),
      invoiceNumber: this.invoiceNumber,
      invoiceUrl: this.invoiceUrl,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}


















