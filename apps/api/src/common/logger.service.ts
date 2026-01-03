/**
 * Logger Service
 * Centralized error and event logging
 * 
 * Logger Servisi
 * Merkezi hata ve olay loglama
 */

import { Injectable } from '@nestjs/common';
import { writeFileSync, appendFileSync, existsSync } from 'fs';
import { join } from 'path';

interface ErrorLog {
  errorId: string;
  timestamp: string;
  module: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  errorMessage: string;
  stackTrace?: string;
  userContext?: any;
  solution?: string;
}

@Injectable()
export class LoggerService {
  private logPath = join(process.cwd(), '../../logs/error-log.md');
  private errorCount = 0;

  /**
   * Log an error to error-log.md
   * Hatayı error-log.md'ye logla
   */
  async logError(
    module: string,
    error: Error,
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM',
    userContext?: any,
  ) {
    this.errorCount++;
    const errorId = `ERROR-${String(this.errorCount).padStart(3, '0')}`;

    const errorLog: ErrorLog = {
      errorId,
      timestamp: new Date().toISOString(),
      module,
      severity,
      errorMessage: error.message,
      stackTrace: error.stack,
      userContext,
    };

    // Format error entry for markdown
    const entry = this.formatErrorEntry(errorLog);

    // Append to log file
    try {
      if (!existsSync(this.logPath)) {
        // If file doesn't exist, create with header
        const header = `# Error Log - Auto Generated\n\n**Last Updated:** ${new Date().toISOString()}\n\n---\n\n`;
        writeFileSync(this.logPath, header);
      }

      appendFileSync(this.logPath, entry + '\n\n---\n\n');
      console.error(`[${errorId}] Logged to error-log.md`);
    } catch (logError) {
      console.error('Failed to write to error log:', logError);
    }

    return errorId;
  }

  /**
   * Format error entry as markdown
   * Hata girişini markdown olarak biçimlendir
   */
  private formatErrorEntry(log: ErrorLog): string {
    return `### ${log.errorId}: ${log.errorMessage}
**Date:** ${log.timestamp}  
**Module:** ${log.module}  
**Severity:** ${log.severity}  
**Status:** Open  

**Error Message:**
\`\`\`
${log.errorMessage}
\`\`\`

${log.stackTrace ? `**Stack Trace:**
\`\`\`
${log.stackTrace}
\`\`\`` : ''}

${log.userContext ? `**Context:**
- User: ${log.userContext.userId || 'Unknown'}
- Tenant: ${log.userContext.tenantId || 'Unknown'}
- Action: ${log.userContext.action || 'Unknown'}` : ''}

**Root Cause:**
To be analyzed

**Solution Attempted:**
None yet

**Prevention Measures:**
To be defined`;
  }

  /**
   * Log info message
   * Bilgi mesajı logla
   */
  info(message: string, context?: string) {
    console.log(`[INFO]${context ? `[${context}]` : ''} ${message}`);
  }

  /**
   * Log warning
   * Uyarı logla
   */
  warn(message: string, context?: string) {
    console.warn(`[WARN]${context ? `[${context}]` : ''} ${message}`);
  }

  /**
   * Log error to console
   * Hatayı console'a logla
   */
  error(message: string, trace?: string, context?: string) {
    console.error(`[ERROR]${context ? `[${context}]` : ''} ${message}`);
    if (trace) {
      console.error(trace);
    }
  }
}
















