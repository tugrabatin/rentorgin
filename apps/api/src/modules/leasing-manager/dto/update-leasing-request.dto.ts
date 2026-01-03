/**
 * Update Leasing Request DTO
 * Data transfer object for updating leasing requests
 * 
 * Kiralama Talebi Güncelleme DTO
 * Kiralama taleplerini güncellemek için veri transfer nesnesi
 */

import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class UpdateLeasingRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsEnum(['OPEN', 'IN_PROGRESS', 'PENDING_APPROVAL', 'PENDING_INFO', 'RESOLVED', 'REJECTED', 'CANCELLED'])
  @IsOptional()
  status?: string;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  @IsOptional()
  priority?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  resolution?: string;
}
