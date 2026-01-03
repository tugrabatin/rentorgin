/**
 * HTTP Exception Filter
 * Global exception handler that logs all errors
 * 
 * HTTP İstisna Filtresi
 * Tüm hataları loglayan global istisna yöneticisi
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorMessage =
      typeof message === 'string'
        ? message
        : (message as any).message || 'Unknown error';

    // Log error
    const severity = status >= 500 ? 'CRITICAL' : status >= 400 ? 'HIGH' : 'MEDIUM';
    
    this.logger.logError(
      request.path.split('/')[3] || 'unknown',
      exception instanceof Error ? exception : new Error(String(exception)),
      severity,
      {
        userId: (request as any).user?.userId,
        tenantId: (request as any).user?.tenantId,
        action: `${request.method} ${request.path}`,
        ip: request.ip,
      },
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorMessage,
    });
  }
}
















