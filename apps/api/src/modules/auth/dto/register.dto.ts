/**
 * Register Data Transfer Object
 * Request payload for user registration
 * 
 * Kayıt Veri Transfer Nesnesi
 * Kullanıcı kaydı için istek payload'ı
 */

import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'john@company.com',
    description: 'User email address / Kullanıcı e-posta adresi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securepassword123',
    description: 'User password (min 6 characters) / Kullanıcı şifresi (min 6 karakter)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name / Ad',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name / Soyad',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'tenant-id',
    description: 'Tenant ID (optional, for admin) / Tenant ID (opsiyonel, admin için)',
    required: false,
  })
  @IsOptional()
  @IsString()
  tenantId?: string;
}




















