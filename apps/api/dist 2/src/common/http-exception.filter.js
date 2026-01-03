"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./logger.service");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : 'Internal server error';
        const errorMessage = typeof message === 'string'
            ? message
            : message.message || 'Unknown error';
        const severity = status >= 500 ? 'CRITICAL' : status >= 400 ? 'HIGH' : 'MEDIUM';
        this.logger.logError(request.path.split('/')[3] || 'unknown', exception instanceof Error ? exception : new Error(String(exception)), severity, {
            userId: request.user?.userId,
            tenantId: request.user?.tenantId,
            action: `${request.method} ${request.path}`,
            ip: request.ip,
        });
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: errorMessage,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map