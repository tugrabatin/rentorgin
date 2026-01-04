/**
 * Root Application Controller
 * Health check and API info
 * 
 * Ana Uygulama Controller
 * Sağlık kontrolü ve API bilgisi
 */

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API Root - Get API information' })
  getApiInfo() {
    return {
      name: 'BASIS API',
      version: '0.1.0',
      description: 'BASIS - Kurumsal Kiralama Yönetim Platformu - Enterprise Rental Management Platform',
      status: 'operational',
      timestamp: new Date().toISOString(),
      docs: '/api/docs',
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health Check - Check API health status' })
  healthCheck() {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}



















