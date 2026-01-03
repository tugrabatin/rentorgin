/**
 * Authentication Service
 * Business logic for authentication with JWT and bcrypt
 * 
 * Kimlik Doğrulama Servisi
 * JWT ve bcrypt ile kimlik doğrulama iş mantığı
 */

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Validates user credentials (used by LocalStrategy)
   * Kullanıcı kimlik bilgilerini doğrular (LocalStrategy tarafından kullanılır)
   */
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { tenant: true },
    });

    if (!user) {
      return null;
    }

    // Compare password with bcrypt
    // Şifreyi bcrypt ile karşılaştır
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    // Check if user is active
    // Kullanıcının aktif olup olmadığını kontrol et
    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User account is not active');
    }

    return user;
  }

  /**
   * Login user and generate tokens
   * Kullanıcı girişi yap ve token'lar oluştur
   */
  async login(user: any) {
    // Update last login
    // Son giriş zamanını güncelle
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    // Token'ları oluştur
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenantId: user.tenantId,
        tenant: user.tenant ? {
          id: user.tenant.id,
          name: user.tenant.name,
          domain: user.tenant.domain,
        } : null,
      },
    };
  }

  /**
   * Register new user
   * Yeni kullanıcı kaydı
   */
  async register(registerDto: RegisterDto) {
    // Check if user already exists
    // Kullanıcının zaten var olup olmadığını kontrol et
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    // Get or create tenant
    // Tenant al veya oluştur
    let tenantId = registerDto.tenantId;
    
    if (!tenantId) {
      // Create default tenant for new user
      // Yeni kullanıcı için varsayılan tenant oluştur
      const tenant = await this.prisma.tenant.create({
        data: {
          name: `${registerDto.firstName}'s Organization`,
          domain: registerDto.email.split('@')[0],
          plan: 'FREE',
          status: 'ACTIVE',
        },
      });
      tenantId = tenant.id;
    }

    // Create user
    // Kullanıcı oluştur
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        tenantId,
        role: 'USER',
        status: 'ACTIVE',
      },
      include: { tenant: true },
    });

    // Generate tokens
    // Token'ları oluştur
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenantId: user.tenantId,
      },
    };
  }

  /**
   * Refresh access token
   * Access token'ı yenile
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: { tenant: true },
      });

      if (!user || user.status !== 'ACTIVE') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens(user);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Generate JWT access and refresh tokens
   * JWT access ve refresh token'ları oluştur
   */
  private async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m', // 15 minutes
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '7d', // 7 days
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes in seconds
    };
  }
}

