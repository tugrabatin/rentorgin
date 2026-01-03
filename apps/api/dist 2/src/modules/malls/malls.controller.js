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
exports.MallsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const malls_service_1 = require("./malls.service");
let MallsController = class MallsController {
    constructor(mallsService) {
        this.mallsService = mallsService;
    }
    findAll() {
        return this.mallsService.findAll();
    }
    findOne(id) {
        return this.mallsService.findOne(id);
    }
    create(createDto) {
        return this.mallsService.create(createDto);
    }
    updateRelationship(id, body) {
        return this.mallsService.updateRelationship(id, body.quality);
    }
};
exports.MallsController = MallsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all malls / Tüm AVM\'leri getir' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MallsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get mall by ID / ID ile AVM getir' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MallsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new mall / Yeni AVM oluştur' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MallsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/relationship'),
    (0, swagger_1.ApiOperation)({ summary: 'Update relationship quality / İlişki kalitesini güncelle' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MallsController.prototype, "updateRelationship", null);
exports.MallsController = MallsController = __decorate([
    (0, swagger_1.ApiTags)('malls'),
    (0, common_1.Controller)('malls'),
    __metadata("design:paramtypes", [malls_service_1.MallsService])
], MallsController);
//# sourceMappingURL=malls.controller.js.map