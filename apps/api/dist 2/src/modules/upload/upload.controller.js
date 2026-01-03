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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const upload_service_1 = require("./upload.service");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    uploadContract(file, user) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        return this.uploadService.saveFileMetadata({
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            path: file.path,
            tenantId: user.tenantId,
            uploadedBy: user.userId,
        });
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('contract'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload contract document / Sözleşme dokümanı yükle' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './storage/uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        limits: {
            fileSize: 50 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            const allowedExtensions = ['.pdf', '.doc', '.docx'];
            const ext = (0, path_1.extname)(file.originalname).toLowerCase();
            const allowedMimeTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];
            if (!allowedExtensions.includes(ext)) {
                cb(new common_1.BadRequestException('Invalid file extension. Only PDF, DOC, DOCX allowed.'), false);
                return;
            }
            if (!allowedMimeTypes.includes(file.mimetype)) {
                cb(new common_1.BadRequestException('Invalid file type. MIME type check failed.'), false);
                return;
            }
            const sanitized = file.originalname
                .replace(/[^a-zA-Z0-9.-]/g, '_')
                .replace(/\.{2,}/g, '.');
            file.originalname = sanitized;
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadContract", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('upload'),
    (0, common_1.Controller)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map