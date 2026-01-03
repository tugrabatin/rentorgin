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
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stores_service_1 = require("./stores.service");
const create_store_dto_1 = require("./dto/create-store.dto");
const update_store_dto_1 = require("./dto/update-store.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let StoresController = class StoresController {
    constructor(storesService) {
        this.storesService = storesService;
    }
    findAll(user, filters) {
        return this.storesService.findAll(user.tenantId, filters);
    }
    getStatistics(user) {
        return this.storesService.getStatistics(user.tenantId);
    }
    findOne(id, user) {
        return this.storesService.findOne(id, user.tenantId);
    }
    create(user, createDto) {
        return this.storesService.create(user.tenantId, createDto);
    }
    update(id, user, updateDto) {
        return this.storesService.update(id, user.tenantId, updateDto);
    }
    remove(id, user) {
        return this.storesService.remove(id, user.tenantId);
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all stores / Tüm mağazaları getir',
        description: 'Returns all stores for the authenticated tenant / Kimliği doğrulanmış tenant için tüm mağazaları döndürür'
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get store statistics / Mağaza istatistikleri getir',
        description: 'Returns aggregated statistics for stores / Mağazalar için toplu istatistikler döndürür'
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get store by ID / ID ile mağaza getir',
        description: 'Returns detailed store information / Detaylı mağaza bilgilerini döndürür'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create new store / Yeni mağaza oluştur',
        description: 'Creates a new store for the tenant / Tenant için yeni mağaza oluşturur'
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_store_dto_1.CreateStoreDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update store / Mağaza güncelle',
        description: 'Updates store information / Mağaza bilgilerini günceller'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_store_dto_1.UpdateStoreDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete store / Mağaza sil',
        description: 'Deletes a store (if no active leases) / Mağazayı siler (aktif kira yoksa)'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "remove", null);
exports.StoresController = StoresController = __decorate([
    (0, swagger_1.ApiTags)('stores'),
    (0, common_1.Controller)('stores'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
//# sourceMappingURL=stores.controller.js.map