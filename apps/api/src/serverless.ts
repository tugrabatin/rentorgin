/**
 * Serverless Bootstrap
 * Creates NestJS app configuration for serverless environments
 * This exports the app instance without starting a server
 */

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { LoggerService } from './common/logger.service';
import helmet from 'helmet';
import * as express from 'express';

export async function createApp() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

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
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    process.env.FRONTEND_URL,
  ].filter(Boolean);
  
  const isProduction = process.env.NODE_ENV === 'production';

  app.enableCors({
    origin: (origin, callback) => {
      if (process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // In production, allow Vercel domains (*.vercel.app) and Netlify domains
      if (isProduction && (origin.endsWith('.vercel.app') || origin.endsWith('.netlify.app'))) {
        return callback(null, true);
      }
      
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

  await app.init();
  return expressApp;
}
