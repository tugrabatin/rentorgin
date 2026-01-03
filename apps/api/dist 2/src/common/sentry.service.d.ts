import { ConfigService } from '@nestjs/config';
export declare class SentryService {
    private configService;
    private sentryDsn;
    private enabled;
    constructor(configService: ConfigService);
    captureException(error: Error, context?: any): void;
    captureMessage(message: string, level?: 'info' | 'warning' | 'error'): void;
    setUser(user: {
        id: string;
        email: string;
        tenantId: string;
    }): void;
}
//# sourceMappingURL=sentry.service.d.ts.map