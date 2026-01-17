/**
 * Store DTOs (Data Transfer Objects)
 * Request and response structures for store operations
 * 
 * Mağaza DTO'ları (Veri Transfer Nesneleri)
 * Mağaza işlemleri için istek ve yanıt yapıları
 */

import { StoreStatus } from '../enums';

export interface CreateStoreDto {
  name: string;
  code: string;
  brand?: string;
  concept?: string;
  country: string;
  city: string;
  district?: string;
  address: string;
  postalCode?: string;
  squareMeters: number;
  status?: StoreStatus;
  openingDate?: string;
  mallId?: string;
}

export interface UpdateStoreDto {
  name?: string;
  brand?: string;
  concept?: string;
  address?: string;
  district?: string;
  postalCode?: string;
  squareMeters?: number;
  status?: StoreStatus;
  openingDate?: string;
  closingDate?: string;
  mallId?: string;
}

export interface StoreResponseDto {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  brand?: string;
  concept?: string;
  country: string;
  city: string;
  district?: string;
  address: string;
  postalCode?: string;
  squareMeters: number;
  status: StoreStatus;
  openingDate?: string;
  closingDate?: string;
  mallId?: string;
  mallName?: string;
  ageInDays?: number;
  createdAt: string;
  updatedAt: string;
}

export interface StoreListFiltersDto {
  city?: string;
  brand?: string;
  status?: StoreStatus;
  mallId?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}




















