/**
 * Local Authentication Guard
 * Used for login endpoint
 * 
 * Yerel Kimlik Doğrulama Guard'ı
 * Giriş endpoint'i için kullanılır
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}



















