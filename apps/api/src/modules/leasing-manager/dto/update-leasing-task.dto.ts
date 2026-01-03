/**
 * Update Leasing Task DTO
 * Data transfer object for updating leasing tasks
 * 
 * Kiralama Görevi Güncelleme DTO
 * Kiralama görevlerini güncellemek için veri transfer nesnesi
 */

import { IsString, IsOptional, IsEnum, IsInt, IsDateString } from 'class-validator';

export class UpdateLeasingTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsInt()
  @IsOptional()
  defaultSLA?: number;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  @IsOptional()
  riskLevel?: string;

  @IsEnum(['PENDING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED'])
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
