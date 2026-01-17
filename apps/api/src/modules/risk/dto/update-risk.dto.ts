/**
 * Update Risk DTO
 * Risk güncelleme için veri transfer nesnesi
 */

import { IsEnum, IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateRiskDto {
  @IsEnum(['FINANCIAL', 'OPERATIONAL', 'LEGAL', 'RELATIONSHIP', 'MARKET', 'OTHER'])
  @IsOptional()
  category?: string;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  @IsOptional()
  severity?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  potentialImpact?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  probability?: number;

  @IsString()
  @IsOptional()
  mitigationPlan?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mitigationCost?: number;

  @IsEnum(['IDENTIFIED', 'ASSESSING', 'MITIGATING', 'MONITORING', 'RESOLVED', 'ACCEPTED'])
  @IsOptional()
  status?: string;
}









