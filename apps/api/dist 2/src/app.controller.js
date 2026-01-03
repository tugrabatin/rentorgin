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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    getApiInfo() {
        return {
            name: 'RentOrgin API',
            version: '0.1.0',
            description: 'Kurumsal Kiralama Yönetim Platformu - Enterprise Rental Management Platform',
            status: 'operational',
            timestamp: new Date().toISOString(),
            docs: '/api/docs',
        };
    }
    healthCheck() {
        return {
            status: 'healthy',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'API Root - Get API information' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getApiInfo", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Health Check - Check API health status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "healthCheck", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map