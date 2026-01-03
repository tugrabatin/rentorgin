/**
 * Create Franchise Project DTO
 * Data transfer object for creating franchise projects
 * 
 * Franchise Projesi Oluşturma DTO
 * Franchise projeleri oluşturmak için veri transfer nesnesi
 */

import { IsString, IsOptional, IsEnum, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateFranchiseProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  code?: string;

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
}
