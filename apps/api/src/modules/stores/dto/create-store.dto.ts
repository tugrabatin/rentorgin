/**
 * Create Store DTO
 * Request validation for creating a new store
 * 
 * Mağaza Oluşturma DTO
 * Yeni mağaza oluşturma için istek doğrulama
 */

import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({ example: 'Fashion Store İstanbul' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'FST-IST-001' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Fashion Brand', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 'Premium Fashion', required: false })
  @IsOptional()
  @IsString()
  concept?: string;

  @ApiProperty({ example: 'Türkiye' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'İstanbul' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Beşiktaş', required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: 'İstanbul AVM, Kat 2, No: 45' })
  @IsString()
  address: string;

  @ApiProperty({ example: 150.0 })
  @IsNumber()
  @Min(0)
  squareMeters: number;

  @ApiProperty({ example: 'ACTIVE', enum: ['PLANNING', 'ACTIVE', 'RENOVATION', 'CLOSING', 'CLOSED'], required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: '2023-01-15', required: false })
  @IsOptional()
  @IsString()
  openingDate?: string;

  @ApiProperty({ example: 'mall-id', required: false })
  @IsOptional()
  @IsString()
  mallId?: string;
}



















