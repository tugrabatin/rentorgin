/**
 * BASIS API Entry Point
 * NestJS application bootstrap
 * 
 * BASIS API Giriş Noktası
 * NestJS uygulama başlatma
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger.service';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get logger service
  const logger = app.get(LoggerService);

  // Security Headers (Helmet)
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }));

  // Enable CORS (Strict)
  // Production: Allow Vercel domains and custom domain
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    process.env.FRONTEND_URL,
    // Vercel preview and production domains (wildcard support)
    ...(process.env.FRONTEND_URL ? [] : []), // Will be set via env
  ].filter(Boolean);
  
  // In production, also allow *.vercel.app domains if FRONTEND_URL is not set
  const isProduction = process.env.NODE_ENV === 'production';

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      // Development mode'da tüm origin'lere izin ver
      if (process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      
      if (!origin) return callback(null, true);
      
      // Check exact match first
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // In production, allow Vercel domains (*.vercel.app)
      if (isProduction && origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      
      // Allow if FRONTEND_URL matches (with or without protocol)
      if (process.env.FRONTEND_URL) {
        const frontendUrl = process.env.FRONTEND_URL.replace(/^https?:\/\//, '');
        const originHost = origin.replace(/^https?:\/\//, '').split('/')[0];
        if (originHost === frontendUrl || originHost === frontendUrl.replace(/^https?:\/\//, '')) {
          return callback(null, true);
        }
      }
      
      logger.warn(`Blocked CORS request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  // API prefix
  app.setGlobalPrefix('api/v1');

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('BASIS API')
    .setDescription('BASIS - Kurumsal Kiralama Yönetim Platformu API - Enterprise Rental Management Platform API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication / Kimlik Doğrulama')
    .addTag('stores', 'Store Management / Mağaza Yönetimi')
    .addTag('leases', 'Lease Management / Kira Sözleşme Yönetimi')
    .addTag('malls', 'Mall Relations / AVM İlişkileri')
    .addTag('analytics', 'Analytics / Analitik')
    .addTag('ai-assistant', 'AI Assistant / Yapay Zeka Asistanı')
    .addTag('translation', 'Translation Engine / Çeviri Motoru')
    .addTag('session', 'Session Management / Oturum Yönetimi')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Railway and most platforms use PORT, fallback to API_PORT or 3001
  const port = process.env.PORT || process.env.API_PORT || 3001;
  // Bind to 0.0.0.0 for production deployment (Railway, Render, etc.)
  await app.listen(port, '0.0.0.0');

  const host = isProduction ? '0.0.0.0' : 'localhost';
  console.log(`
    🚀 BASIS API is running!
    📡 Listening on ${host}:${port}
    📚 API Docs: http://${host}:${port}/api/docs
    🏥 Health: http://${host}:${port}/api/v1/health
    🌍 Environment: ${process.env.NODE_ENV || 'development'}
    📦 Version: 0.4.0
  `);
}

bootstrap();



