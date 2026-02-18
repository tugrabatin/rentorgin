/**
 * Core Domain Package Entry Point
 * Exports all domain models, interfaces, and types
 * 
 * Temel Domain Paketi Giriş Noktası
 * Tüm domain modellerini, arayüzlerini ve tiplerini dışa aktarır
 */

// Entities
export * from './entities/store.entity';
export * from './entities/lease.entity';
export * from './entities/mall.entity';
export * from './entities/expense.entity';
export * from './entities/analytics.entity';

// Leasing Manager Module Entities
export * from './entities/leasing-manager-role-template.entity';
export * from './entities/leasing-task.entity';
export * from './entities/franchise-project.entity';
export * from './entities/leasing-request.entity';
export * from './entities/job-description-template.entity';
export * from './entities/market-research-record.entity';

// Value Objects
export * from './value-objects/money';
export * from './value-objects/date-range';
export * from './value-objects/address';

// Interfaces
export * from './interfaces/repository.interface';
export * from './interfaces/service.interface';

// DTOs
export * from './dtos/lease.dto';
export * from './dtos/store.dto';
export * from './dtos/analytics.dto';

// Enums & Constants
export * from './enums';
export * from './constants';

// Segment UI Configuration
export * from './config/segment-ui-config';










