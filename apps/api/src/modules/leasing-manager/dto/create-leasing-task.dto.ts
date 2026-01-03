/**
 * Create Leasing Task DTO
 * Data transfer object for creating leasing tasks
 * 
 * Kiralama Görevi Oluşturma DTO
 * Kiralama görevleri oluşturmak için veri transfer nesnesi
 */

import { IsString, IsOptional, IsEnum, IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateLeasingTaskDto {
  @IsEnum(['CONTRACT_NEGOTIATION', 'CONTRACT_RENEWAL', 'MAINTENANCE', 'BUDGET_TRACKING', 'FRANCHISE_DEVELOPMENT', 'MARKET_RESEARCH', 'COMPLIANCE', 'TENANT_RELATIONS', 'SPACE_MANAGEMENT', 'REPORTING', 'OTHER'])
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  storeId?: string;

  @IsString()
  @IsOptional()
  mallId?: string;

  @IsString()
  @IsOptional()
  franchiseProjectId?: string;

  @IsString()
  @IsOptional()
  leaseId?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsInt()
  @IsOptional()
  defaultSLA?: number;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  @IsOptional()
  riskLevel?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
