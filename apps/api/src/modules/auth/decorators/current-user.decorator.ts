/**
 * Current User Decorator
 * Extracts current user from request
 * 
 * Mevcut Kullanıcı Dekoratörü
 * Request'ten mevcut kullanıcıyı çıkarır
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);


















