/**
 * Create Leasing Request DTO
 * Data transfer object for creating leasing requests
 * 
 * Kiralama Talebi Oluşturma DTO
 * Kiralama talepleri oluşturmak için veri transfer nesnesi
 */

import { IsString, IsOptional, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateLeasingRequestDto {
  @IsEnum(['RENT_REDUCTION', 'LEASE_EXTENSION', 'CONTRACT_REVISION', 'ADDITIONAL_SPACE', 'SPACE_REDUCTION', 'COMPLAINT', 'FRANCHISE_INQUIRY', 'RENEWAL_REQUEST', 'EARLY_TERMINATION', 'MAINTENANCE_REQUEST', 'DOCUMENT_REQUEST', 'OTHER'])
  @IsNotEmpty()
  type: string;

  @IsEnum(['TENANT', 'LANDLORD', 'INTERNAL', 'FRANCHISE_CANDIDATE', 'LEGAL_DEPT', 'FINANCE_DEPT'])
  @IsOptional()
  source?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  storeId?: string;

  @IsString()
  @IsOptional()
  mallId?: string;

  @IsString()
  @IsOptional()
  leaseId?: string;

  @IsString()
  @IsOptional()
  franchiseProjectId?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  @IsOptional()
  priority?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
