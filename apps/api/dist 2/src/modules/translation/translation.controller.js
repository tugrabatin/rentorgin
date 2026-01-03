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
exports.TranslationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const translation_service_1 = require("./translation.service");
let TranslationController = class TranslationController {
    constructor(translationService) {
        this.translationService = translationService;
    }
    startTranslation(data) {
        return this.translationService.startTranslation(data);
    }
    getJobStatus(jobId) {
        return this.translationService.getJobStatus(jobId);
    }
    getProgress(jobId) {
        return this.translationService.getProgress(jobId);
    }
};
exports.TranslationController = TranslationController;
__decorate([
    (0, common_1.Post)('start'),
    (0, swagger_1.ApiOperation)({ summary: 'Start translation job / Çeviri işini başlat' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TranslationController.prototype, "startTranslation", null);
__decorate([
    (0, common_1.Get)('jobs/:jobId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get translation job status / Çeviri iş durumunu getir' }),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TranslationController.prototype, "getJobStatus", null);
__decorate([
    (0, common_1.Get)('jobs/:jobId/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Get translation progress / Çeviri ilerlemesini getir' }),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TranslationController.prototype, "getProgress", null);
exports.TranslationController = TranslationController = __decorate([
    (0, swagger_1.ApiTags)('translation'),
    (0, common_1.Controller)('translation'),
    __metadata("design:paramtypes", [translation_service_1.TranslationService])
], TranslationController);
//# sourceMappingURL=translation.controller.js.map