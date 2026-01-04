/**
 * Update Budget DTO
 * Budget güncelleme için veri transfer nesnesi
 */

import { IsNumber, IsEnum, IsOptional, Min } from 'class-validator';

export class UpdateBudgetDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  plannedAmount?: number;

  @IsNumber()
  @IsOptional()
  actualAmount?: number;

  @IsEnum(['DRAFT', 'APPROVED', 'ACTIVE', 'CLOSED'])
  @IsOptional()
  status?: string;
}








