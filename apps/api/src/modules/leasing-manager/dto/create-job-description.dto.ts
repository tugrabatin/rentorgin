/**
 * Create Job Description DTO
 * Data transfer object for creating job descriptions
 * 
 * İş Tanımı Oluşturma DTO
 * İş tanımları oluşturmak için veri transfer nesnesi
 */

import { IsString, IsOptional, IsArray, IsEnum, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateJobDescriptionDto {
  @IsString()
  @IsNotEmpty()
  roleNameTR: string;

  @IsString()
  @IsNotEmpty()
  roleNameEN: string;

  @IsString()
  @IsOptional()
  summaryTR?: string;

  @IsString()
  @IsOptional()
  summaryEN?: string;

  @IsArray()
  @IsString({ each: true })
  responsibilitiesTR: string[];

  @IsArray()
  @IsString({ each: true })
  responsibilitiesEN: string[];

  @IsArray()
  @IsString({ each: true })
  skillsTR: string[];

  @IsArray()
  @IsString({ each: true })
  skillsEN: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sectors?: string[];

  @IsEnum(['ENTRY', 'MID', 'SENIOR', 'LEAD', 'DIRECTOR'])
  @IsOptional()
  seniorityLevel?: string;

  @IsString()
  @IsOptional()
  companyContext?: string;

  @IsBoolean()
  @IsOptional()
  isTemplate?: boolean;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
