/**
 * Update Franchise Project DTO
 * Data transfer object for updating franchise projects
 * 
 * Franchise Projesi Güncelleme DTO
 * Franchise projelerini güncellemek için veri transfer nesnesi
 */

import { IsString, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';

export class UpdateFranchiseProjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(['PIPELINE', 'EVALUATION', 'FEASIBILITY_STUDY', 'APPROVED', 'IN_CONSTRUCTION', 'OPENED', 'REJECTED', 'CANCELLED'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  targetRegion?: string;

  @IsString()
  @IsOptional()
  targetCity?: string;

  @IsString()
  @IsOptional()
  targetMallId?: string;

  @IsString()
  @IsOptional()
  storeType?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  concept?: string;

  @IsNumber()
  @IsOptional()
  estimatedCapex?: number;

  @IsNumber()
  @IsOptional()
  estimatedOpex?: number;

  @IsNumber()
  @IsOptional()
  expectedRevenue?: number;

  @IsNumber()
  @IsOptional()
  expectedRentCost?: number;

  @IsNumber()
  @IsOptional()
  feasibilityScore?: number;

  @IsString()
  @IsOptional()
  riskAssessment?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  projectManagerId?: string;

  @IsDateString()
  @IsOptional()
  targetOpeningDate?: string;

  @IsDateString()
  @IsOptional()
  actualOpeningDate?: string;

  @IsString()
  @IsOptional()
  storeId?: string;
}
