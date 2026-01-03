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
exports.ExpensesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expenses_service_1 = require("./expenses.service");
const create_expense_dto_1 = require("./dto/create-expense.dto");
const update_expense_dto_1 = require("./dto/update-expense.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ExpensesController = class ExpensesController {
    constructor(expensesService) {
        this.expensesService = expensesService;
    }
    create(req, createExpenseDto) {
        return this.expensesService.create(req.user.tenantId, createExpenseDto);
    }
    findAll(req, storeId, type, status, startDate, endDate) {
        return this.expensesService.findAll(req.user.tenantId, {
            storeId,
            type,
            status,
            startDate,
            endDate,
        });
    }
    getStatistics(req, storeId, year, month) {
        return this.expensesService.getStatistics(req.user.tenantId, {
            storeId,
            year: year ? parseInt(year, 10) : undefined,
            month: month ? parseInt(month, 10) : undefined,
        });
    }
    getMonthlySummary(req, year, storeId) {
        return this.expensesService.getMonthlySummary(req.user.tenantId, parseInt(year, 10), storeId);
    }
    getOverdue(req) {
        return this.expensesService.getOverdue(req.user.tenantId);
    }
    findOne(req, id) {
        return this.expensesService.findOne(req.user.tenantId, id);
    }
    update(req, id, updateExpenseDto) {
        return this.expensesService.update(req.user.tenantId, id, updateExpenseDto);
    }
    markAsPaid(req, id) {
        return this.expensesService.markAsPaid(req.user.tenantId, id);
    }
    remove(req, id) {
        return this.expensesService.remove(req.user.tenantId, id);
    }
};
exports.ExpensesController = ExpensesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new expense' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Expense created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Store not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_expense_dto_1.CreateExpenseDto]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all expenses' }),
    (0, swagger_1.ApiQuery)({ name: 'storeId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expenses retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('storeId')),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('startDate')),
    __param(5, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get expense statistics' }),
    (0, swagger_1.ApiQuery)({ name: 'storeId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('storeId')),
    __param(2, (0, common_1.Query)('year')),
    __param(3, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('monthly-summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get monthly expenses summary' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'storeId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Monthly summary retrieved' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "getMonthlySummary", null);
__decorate([
    (0, common_1.Get)('overdue'),
    (0, swagger_1.ApiOperation)({ summary: 'Get overdue expenses' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Overdue expenses retrieved' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "getOverdue", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get expense by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expense retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Expense not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update expense' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expense updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Expense not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_expense_dto_1.UpdateExpenseDto]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/mark-paid'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark expense as paid' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expense marked as paid' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Expense not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "markAsPaid", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete expense' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expense deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Expense not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "remove", null);
exports.ExpensesController = ExpensesController = __decorate([
    (0, swagger_1.ApiTags)('Expenses'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('expenses'),
    __metadata("design:paramtypes", [expenses_service_1.ExpensesService])
], ExpensesController);
//# sourceMappingURL=expenses.controller.js.map