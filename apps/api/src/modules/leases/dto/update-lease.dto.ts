/**
 * Update Lease DTO
 * Request validation for updating a lease contract
 * 
 * Kira Güncelleme DTO
 * Kira sözleşmesi güncelleme için istek doğrulama
 */

import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLeaseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedToId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyRent?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  escalationRate?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  renewalNoticeMonths?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  commonAreaCharges?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  documentUrl?: string;
}


















