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
exports.LeasesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const leases_service_1 = require("./leases.service");
const create_lease_dto_1 = require("./dto/create-lease.dto");
const update_lease_dto_1 = require("./dto/update-lease.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let LeasesController = class LeasesController {
    constructor(leasesService) {
        this.leasesService = leasesService;
    }
    findAll(user, filters) {
        return this.leasesService.findAll(user.tenantId, filters);
    }
    findExpiring(user, days) {
        return this.leasesService.findExpiring(user.tenantId, days || 90);
    }
    findOne(id, user) {
        return this.leasesService.findOne(id, user.tenantId);
    }
    getCurrentRent(id, user) {
        return this.leasesService.calculateCurrentRent(id, user.tenantId);
    }
    create(user, createDto) {
        return this.leasesService.create(user.tenantId, createDto);
    }
    update(id, user, updateDto) {
        return this.leasesService.update(id, user.tenantId, updateDto);
    }
    renew(id, user) {
        return this.leasesService.initiateRenewal(id, user.tenantId);
    }
};
exports.LeasesController = LeasesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all leases / Tüm sözleşmeleri getir' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeasesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('expiring'),
    (0, swagger_1.ApiOperation)({ summary: 'Get expiring leases / Süresi dolmak üzere olan sözleşmeler' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], LeasesController.prototype, "findExpiring", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lease by ID / ID ile sözleşme getir' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/current-rent'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate current rent / Mevcut kirayı hesapla' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasesController.prototype, "getCurrentRent", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new lease / Yeni sözleşme oluştur' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_lease_dto_1.CreateLeaseDto]),
    __metadata("design:returntype", void 0)
], LeasesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update lease / Sözleşme güncelle' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_lease_dto_1.UpdateLeaseDto]),
    __metadata("design:returntype", void 0)
], LeasesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/renew'),
    (0, swagger_1.ApiOperation)({ summary: 'Initiate lease renewal / Sözleşme yenileme başlat' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasesController.prototype, "renew", null);
exports.LeasesController = LeasesController = __decorate([
    (0, swagger_1.ApiTags)('leases'),
    (0, common_1.Controller)('leases'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [leases_service_1.LeasesService])
], LeasesController);
//# sourceMappingURL=leases.controller.js.map