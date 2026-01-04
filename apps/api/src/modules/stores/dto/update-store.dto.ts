/**
 * Update Store DTO
 * Request validation for updating a store
 * 
 * Mağaza Güncelleme DTO
 * Mağaza güncelleme için istek doğrulama
 */

import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  concept?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  squareMeters?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  openingDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  closingDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mallId?: string;
}



















