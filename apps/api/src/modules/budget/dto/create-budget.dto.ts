/**
 * Create Budget DTO
 * Budget oluşturma için veri transfer nesnesi
 */

import { IsInt, IsEnum, IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateBudgetDto {
  @IsInt()
  year: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(4)
  quarter?: number;

  @IsEnum(['COMPANY', 'COUNTRY', 'CITY', 'BRAND', 'MALL_TYPE'])
  scope: string;

  @IsString()
  @IsOptional()
  scopeValue?: string;

  @IsNumber()
  @Min(0)
  plannedAmount: number;

  @IsEnum(['DRAFT', 'APPROVED', 'ACTIVE', 'CLOSED'])
  @IsOptional()
  status?: string;
}







