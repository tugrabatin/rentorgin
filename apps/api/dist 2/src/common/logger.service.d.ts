export declare class LoggerService {
    private logPath;
    private errorCount;
    logError(module: string, error: Error, severity?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW', userContext?: any): Promise<string>;
    private formatErrorEntry;
    info(message: string, context?: string): void;
    warn(message: string, context?: string): void;
    error(message: string, trace?: string, context?: string): void;
}
//# sourceMappingURL=logger.service.d.ts.map