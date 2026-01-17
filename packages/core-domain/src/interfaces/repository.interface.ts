/**
 * Repository Interfaces
 * Generic repository patterns for data access
 * 
 * Repository Arayüzleri
 * Veri erişimi için genel repository kalıpları
 */

export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(filters?: Record<string, any>): Promise<T[]>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface ITenantScopedRepository<T> extends IRepository<T> {
  findByTenantId(tenantId: string, filters?: Record<string, any>): Promise<T[]>;
  findByIdAndTenantId(id: string, tenantId: string): Promise<T | null>;
}




















