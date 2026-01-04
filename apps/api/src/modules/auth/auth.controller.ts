/**
 * Authentication Controller
 * Login, register, logout, token refresh endpoints
 * 
 * Kimlik Doğrulama Controller
 * Giriş, kayıt, çıkış, token yenileme endpoint'leri
 */

import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @SkipThrottle() // Disable throttling for login in development
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ 
    summary: 'User login / Kullanıcı girişi',
    description: 'Authenticate user with email and password / E-posta ve şifre ile kullanıcı girişi'
  })
  @ApiBody({ type: LoginDto })
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 3600000 } }) // 3 registrations per hour
  @Post('register')
  @ApiOperation({ 
    summary: 'User registration / Kullanıcı kaydı',
    description: 'Create new user account / Yeni kullanıcı hesabı oluştur'
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ 
    summary: 'Refresh access token / Token yenileme',
    description: 'Get new access token using refresh token / Refresh token kullanarak yeni access token al'
  })
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get current user profile / Mevcut kullanıcı profilini al',
    description: 'Returns authenticated user information / Kimliği doğrulanmış kullanıcı bilgilerini döndürür'
  })
  async getProfile(@CurrentUser() user: any) {
    return {
      user: {
        id: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenantId: user.tenantId,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'User logout / Kullanıcı çıkışı',
    description: 'Invalidate current session / Mevcut oturumu geçersiz kıl'
  })
  async logout() {
    // In production, you would invalidate the token here
    // Production'da burada token'ı geçersiz kılarsınız
    return { 
      message: 'Logged out successfully',
      success: true 
    };
  }
}

