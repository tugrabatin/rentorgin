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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analytics_service_1 = require("./analytics.service");
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getStoreAnalytics(storeId, filters) {
        return this.analyticsService.getStoreAnalytics(storeId, filters);
    }
    getPortfolioSummary(filters) {
        return this.analyticsService.getPortfolioSummary(filters);
    }
    calculate(data) {
        return this.analyticsService.calculate(data);
    }
    compareStores(storeIds) {
        const ids = storeIds.split(',');
        return this.analyticsService.compareStores(ids);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('stores/:storeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get store analytics / Mağaza analitiğini getir' }),
    __param(0, (0, common_1.Param)('storeId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getStoreAnalytics", null);
__decorate([
    (0, common_1.Get)('portfolio'),
    (0, swagger_1.ApiOperation)({ summary: 'Get portfolio summary / Portföy özetini getir' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getPortfolioSummary", null);
__decorate([
    (0, common_1.Post)('calculate'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate analytics for period / Dönem için analitik hesapla' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "calculate", null);
__decorate([
    (0, common_1.Get)('compare'),
    (0, swagger_1.ApiOperation)({ summary: 'Compare stores / Mağazaları karşılaştır' }),
    __param(0, (0, common_1.Query)('storeIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "compareStores", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('analytics'),
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map