/**
 * JWT Authentication Strategy
 * Validates JWT tokens and extracts user payload
 * 
 * JWT Kimlik Doğrulama Stratejisi
 * JWT token'larını doğrular ve kullanıcı payload'ını çıkarır
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../database/prisma.service';

export interface JwtPayload {
  sub: string; // User ID
  email: string;
  tenantId: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret-change-me',
    });
  }

  /**
   * Validates JWT payload and returns user
   * JWT payload'ını doğrular ve kullanıcıyı döndürür
   */
  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { tenant: true },
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User not found or inactive');
    }

    // Return user object that will be attached to request
    // Request'e eklenecek kullanıcı nesnesini döndür
    return {
      userId: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}


















