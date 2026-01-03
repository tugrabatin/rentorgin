/**
 * Sentry Service
 * Error monitoring and tracking integration
 * 
 * Sentry Servisi
 * Hata izleme ve takip entegrasyonu
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SentryService {
  private sentryDsn: string;
  private enabled: boolean;

  constructor(private configService: ConfigService) {
    this.sentryDsn = this.configService.get<string>('SENTRY_DSN') || '';
    this.enabled = !!this.sentryDsn && process.env.NODE_ENV === 'production';
  }

  /**
   * Capture exception to Sentry
   * İstisnayı Sentry'e gönder
   */
  captureException(error: Error, context?: any) {
    if (this.enabled) {
      // In production, use real Sentry SDK
      // import * as Sentry from '@sentry/node';
      // Sentry.captureException(error, { extra: context });
      console.error('[SENTRY]', error.message, context);
    } else {
      console.error('[ERROR]', error.message, context);
    }
  }

  /**
   * Capture message to Sentry
   * Mesajı Sentry'e gönder
   */
  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
    if (this.enabled) {
      // Sentry.captureMessage(message, level);
      console.log(`[SENTRY][${level.toUpperCase()}]`, message);
    }
  }

  /**
   * Set user context
   * Kullanıcı bağlamını ayarla
   */
  setUser(user: { id: string; email: string; tenantId: string }) {
    if (this.enabled) {
      // Sentry.setUser(user);
      console.log('[SENTRY] User context set:', user.id);
    }
  }
}
















