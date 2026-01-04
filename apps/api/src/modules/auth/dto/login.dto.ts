/**
 * Login Data Transfer Object
 * Request payload for user login
 * 
 * Giriş Veri Transfer Nesnesi
 * Kullanıcı girişi için istek payload'ı
 */

import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@demo.com',
    description: 'User email address / Kullanıcı e-posta adresi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password / Kullanıcı şifresi',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}



















