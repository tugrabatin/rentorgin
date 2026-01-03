"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let LoggerService = class LoggerService {
    constructor() {
        this.logPath = (0, path_1.join)(process.cwd(), '../../logs/error-log.md');
        this.errorCount = 0;
    }
    async logError(module, error, severity = 'MEDIUM', userContext) {
        this.errorCount++;
        const errorId = `ERROR-${String(this.errorCount).padStart(3, '0')}`;
        const errorLog = {
            errorId,
            timestamp: new Date().toISOString(),
            module,
            severity,
            errorMessage: error.message,
            stackTrace: error.stack,
            userContext,
        };
        const entry = this.formatErrorEntry(errorLog);
        try {
            if (!(0, fs_1.existsSync)(this.logPath)) {
                const header = `# Error Log - Auto Generated\n\n**Last Updated:** ${new Date().toISOString()}\n\n---\n\n`;
                (0, fs_1.writeFileSync)(this.logPath, header);
            }
            (0, fs_1.appendFileSync)(this.logPath, entry + '\n\n---\n\n');
            console.error(`[${errorId}] Logged to error-log.md`);
        }
        catch (logError) {
            console.error('Failed to write to error log:', logError);
        }
        return errorId;
    }
    formatErrorEntry(log) {
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
    info(message, context) {
        console.log(`[INFO]${context ? `[${context}]` : ''} ${message}`);
    }
    warn(message, context) {
        console.warn(`[WARN]${context ? `[${context}]` : ''} ${message}`);
    }
    error(message, trace, context) {
        console.error(`[ERROR]${context ? `[${context}]` : ''} ${message}`);
        if (trace) {
            console.error(trace);
        }
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)()
], LoggerService);
//# sourceMappingURL=logger.service.js.map