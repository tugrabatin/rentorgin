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
exports.SessionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const session_service_1 = require("./session.service");
let SessionController = class SessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    exportSession(data) {
        return this.sessionService.exportSession(data.userId, data.name);
    }
    importSession(data) {
        return this.sessionService.importSession(data.userId, data.sessionData);
    }
    getUserSessions(userId) {
        return this.sessionService.getUserSessions(userId);
    }
    getSession(sessionId) {
        return this.sessionService.getSession(sessionId);
    }
};
exports.SessionController = SessionController;
__decorate([
    (0, common_1.Post)('export'),
    (0, swagger_1.ApiOperation)({ summary: 'Export user session / Kullanıcı oturumunu dışa aktar' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "exportSession", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, swagger_1.ApiOperation)({ summary: 'Import user session / Kullanıcı oturumunu içe aktar' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "importSession", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user sessions / Kullanıcı oturumlarını getir' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "getUserSessions", null);
__decorate([
    (0, common_1.Get)(':sessionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get session by ID / ID ile oturum getir' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "getSession", null);
exports.SessionController = SessionController = __decorate([
    (0, swagger_1.ApiTags)('session'),
    (0, common_1.Controller)('session'),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionController);
//# sourceMappingURL=session.controller.js.map