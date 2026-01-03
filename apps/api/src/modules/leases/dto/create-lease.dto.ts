/**
 * Create Lease DTO
 * Request validation for creating a new lease contract
 * 
 * Kira Oluşturma DTO
 * Yeni kira sözleşmesi oluşturma için istek doğrulama
 */

import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeaseDto {
  @ApiProperty({ example: 'store-id' })
  @IsString()
  storeId: string;

  @ApiProperty({ example: 'mall-id', required: false })
  @IsOptional()
  @IsString()
  mallId?: string;

  @ApiProperty({ example: 'user-id', required: false })
  @IsOptional()
  @IsString()
  assignedToId?: string;

  @ApiProperty({ example: 'CNT-2024-001' })
  @IsString()
  contractNumber: string;

  @ApiProperty({ example: '2024-01-01' })
  @IsString()
  startDate: string;

  @ApiProperty({ example: '2029-12-31' })
  @IsString()
  endDate: string;

  @ApiProperty({ example: '2023-12-15', required: false })
  @IsOptional()
  @IsString()
  signedDate?: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(0)
  monthlyRent: number;

  @ApiProperty({ example: 'TRY', required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ example: 'INDEX_BASED', enum: ['NONE', 'FIXED_PERCENTAGE', 'INDEX_BASED', 'REVENUE_BASED', 'CUSTOM'] })
  @IsString()
  escalationType: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  escalationRate: number;

  @ApiProperty({ example: 'TUFE', required: false })
  @IsOptional()
  @IsString()
  escalationIndex?: string;

  @ApiProperty({ example: 60, required: false })
  @IsOptional()
  @IsNumber()
  renewalOptionMonths?: number;

  @ApiProperty({ example: 6, required: false })
  @IsOptional()
  @IsNumber()
  renewalNoticeMonths?: number;

  @ApiProperty({ example: 8000, required: false })
  @IsOptional()
  @IsNumber()
  commonAreaCharges?: number;

  @ApiProperty({ example: 150000, required: false })
  @IsOptional()
  @IsNumber()
  securityDeposit?: number;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  fitOutPeriodDays?: number;
}


















