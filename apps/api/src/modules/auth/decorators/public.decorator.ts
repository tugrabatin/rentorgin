/**
 * Public Route Decorator
 * Marks a route as public (no authentication required)
 * 
 * Public Rota Dekoratörü
 * Bir rotayı public olarak işaretler (kimlik doğrulama gerektirmez)
 */

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);




















