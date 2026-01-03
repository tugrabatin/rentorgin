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
exports.CreateLeaseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateLeaseDto {
}
exports.CreateLeaseDto = CreateLeaseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'store-id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mall-id', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "mallId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user-id', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "assignedToId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CNT-2024-001' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "contractNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2029-12-31' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-12-15', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "signedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLeaseDto.prototype, "monthlyRent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TRY', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'INDEX_BASED', enum: ['NONE', 'FIXED_PERCENTAGE', 'INDEX_BASED', 'REVENUE_BASED', 'CUSTOM'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "escalationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLeaseDto.prototype, "escalationRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TUFE', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaseDto.prototype, "escalationIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLeaseDto.prototype, "renewalOptionMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLeaseDto.prototype, "renewalNoticeMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8000, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLeaseDto.prototype, "commonAreaCharges", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150000, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLeaseDto.prototype, "securityDeposit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLeaseDto.prototype, "fitOutPeriodDays", void 0);
//# sourceMappingURL=create-lease.dto.js.map