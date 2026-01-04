/**
 * Lease DTOs (Data Transfer Objects)
 * Request and response structures for lease operations
 * 
 * Kira DTO'ları (Veri Transfer Nesneleri)
 * Kira işlemleri için istek ve yanıt yapıları
 */

import { LeaseStatus, EscalationType } from '../enums';

export interface CreateLeaseDto {
  storeId: string;
  mallId?: string;
  assignedToId?: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  signedDate?: string;
  monthlyRent: number;
  currency?: string;
  escalationType: EscalationType;
  escalationRate: number;
  escalationIndex?: string;
  renewalOptionMonths?: number;
  renewalNoticeMonths?: number;
  commonAreaCharges?: number;
  securityDeposit?: number;
  fitOutPeriodDays?: number;
  documentUrl?: string;
}

export interface UpdateLeaseDto {
  assignedToId?: string;
  status?: LeaseStatus;
  monthlyRent?: number;
  escalationRate?: number;
  renewalNoticeMonths?: number;
  commonAreaCharges?: number;
  documentUrl?: string;
  documentVersion?: number;
}

export interface LeaseResponseDto {
  id: string;
  tenantId: string;
  storeId: string;
  storeName?: string;
  mallId?: string;
  mallName?: string;
  assignedToId?: string;
  assignedToName?: string;
  contractNumber: string;
  version: number;
  status: LeaseStatus;
  startDate: string;
  endDate: string;
  signedDate?: string;
  monthlyRent: number;
  currency: string;
  currentRent?: number;
  escalationType: EscalationType;
  escalationRate: number;
  escalationIndex?: string;
  renewalOptionMonths?: number;
  renewalNoticeMonths: number;
  commonAreaCharges?: number;
  securityDeposit?: number;
  fitOutPeriodDays?: number;
  documentUrl?: string;
  documentVersion: number;
  daysRemaining?: number;
  isExpiringSoon?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LeaseListFiltersDto {
  storeId?: string;
  mallId?: string;
  status?: LeaseStatus;
  assignedToId?: string;
  expiringSoonDays?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}



















