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
exports.LeasingManagerController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const leasing_tasks_service_1 = require("./leasing-tasks.service");
const franchise_projects_service_1 = require("./franchise-projects.service");
const leasing_requests_service_1 = require("./leasing-requests.service");
const job_descriptions_service_1 = require("./job-descriptions.service");
const create_leasing_task_dto_1 = require("./dto/create-leasing-task.dto");
const update_leasing_task_dto_1 = require("./dto/update-leasing-task.dto");
const create_franchise_project_dto_1 = require("./dto/create-franchise-project.dto");
const update_franchise_project_dto_1 = require("./dto/update-franchise-project.dto");
const create_leasing_request_dto_1 = require("./dto/create-leasing-request.dto");
const update_leasing_request_dto_1 = require("./dto/update-leasing-request.dto");
const create_job_description_dto_1 = require("./dto/create-job-description.dto");
let LeasingManagerController = class LeasingManagerController {
    constructor(leasingTasksService, franchiseProjectsService, leasingRequestsService, jobDescriptionsService) {
        this.leasingTasksService = leasingTasksService;
        this.franchiseProjectsService = franchiseProjectsService;
        this.leasingRequestsService = leasingRequestsService;
        this.jobDescriptionsService = jobDescriptionsService;
    }
    findAllTasks(req, filters) {
        return this.leasingTasksService.findAll(req.user.tenantId, filters);
    }
    getTaskStatistics(req) {
        return this.leasingTasksService.getStatistics(req.user.tenantId);
    }
    findOneTask(id, req) {
        return this.leasingTasksService.findOne(id, req.user.tenantId);
    }
    createTask(createDto, req) {
        return this.leasingTasksService.create(req.user.tenantId, createDto);
    }
    updateTask(id, updateDto, req) {
        return this.leasingTasksService.update(id, req.user.tenantId, updateDto);
    }
    removeTask(id, req) {
        return this.leasingTasksService.remove(id, req.user.tenantId);
    }
    findAllProjects(req, filters) {
        return this.franchiseProjectsService.findAll(req.user.tenantId, filters);
    }
    getProjectStatistics(req) {
        return this.franchiseProjectsService.getStatistics(req.user.tenantId);
    }
    findOneProject(id, req) {
        return this.franchiseProjectsService.findOne(id, req.user.tenantId);
    }
    createProject(createDto, req) {
        return this.franchiseProjectsService.create(req.user.tenantId, createDto);
    }
    updateProject(id, updateDto, req) {
        return this.franchiseProjectsService.update(id, req.user.tenantId, updateDto);
    }
    removeProject(id, req) {
        return this.franchiseProjectsService.remove(id, req.user.tenantId);
    }
    findAllRequests(req, filters) {
        return this.leasingRequestsService.findAll(req.user.tenantId, filters);
    }
    getRequestStatistics(req) {
        return this.leasingRequestsService.getStatistics(req.user.tenantId);
    }
    findOneRequest(id, req) {
        return this.leasingRequestsService.findOne(id, req.user.tenantId);
    }
    createRequest(createDto, req) {
        return this.leasingRequestsService.create(req.user.tenantId, req.user.userId, createDto);
    }
    updateRequest(id, updateDto, req) {
        return this.leasingRequestsService.update(id, req.user.tenantId, updateDto);
    }
    resolveRequest(id, resolution, req) {
        return this.leasingRequestsService.resolve(id, req.user.tenantId, req.user.userId, resolution);
    }
    rejectRequest(id, reason, req) {
        return this.leasingRequestsService.reject(id, req.user.tenantId, req.user.userId, reason);
    }
    removeRequest(id, req) {
        return this.leasingRequestsService.remove(id, req.user.tenantId);
    }
    findAllJobDescriptions(req, filters) {
        return this.jobDescriptionsService.findAll(req.user.tenantId, filters);
    }
    getDefaultTemplate() {
        return this.jobDescriptionsService.getDefaultLeasingManagerTemplate();
    }
    findOneJobDescription(id, req) {
        return this.jobDescriptionsService.findOne(id, req.user.tenantId);
    }
    exportJobDescription(id, language, req) {
        return this.jobDescriptionsService.exportToPosting(id, req.user.tenantId, language || 'TR');
    }
    createJobDescription(createDto, req) {
        return this.jobDescriptionsService.create(req.user.tenantId, req.user.userId, createDto);
    }
    generateFromTemplate(companyContext, req) {
        return this.jobDescriptionsService.generateFromLeasingManagerTemplate(req.user.tenantId, req.user.userId, companyContext);
    }
    updateJobDescription(id, updateDto, req) {
        return this.jobDescriptionsService.update(id, req.user.tenantId, updateDto);
    }
    publishJobDescription(id, req) {
        return this.jobDescriptionsService.publish(id, req.user.tenantId);
    }
    unpublishJobDescription(id, req) {
        return this.jobDescriptionsService.unpublish(id, req.user.tenantId);
    }
    removeJobDescription(id, req) {
        return this.jobDescriptionsService.remove(id, req.user.tenantId);
    }
    async getDashboardData(req) {
        const [taskStats, projectStats, requestStats] = await Promise.all([
            this.leasingTasksService.getStatistics(req.user.tenantId),
            this.franchiseProjectsService.getStatistics(req.user.tenantId),
            this.leasingRequestsService.getStatistics(req.user.tenantId),
        ]);
        return {
            tasks: taskStats,
            projects: projectStats,
            requests: requestStats,
        };
    }
};
exports.LeasingManagerController = LeasingManagerController;
__decorate([
    (0, common_1.Get)('tasks'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "findAllTasks", null);
__decorate([
    (0, common_1.Get)('tasks/statistics'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "getTaskStatistics", null);
__decorate([
    (0, common_1.Get)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "findOneTask", null);
__decorate([
    (0, common_1.Post)('tasks'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leasing_task_dto_1.CreateLeasingTaskDto, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "createTask", null);
__decorate([
    (0, common_1.Put)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leasing_task_dto_1.UpdateLeasingTaskDto, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "removeTask", null);
__decorate([
    (0, common_1.Get)('franchise-projects'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "findAllProjects", null);
__decorate([
    (0, common_1.Get)('franchise-projects/statistics'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "getProjectStatistics", null);
__decorate([
    (0, common_1.Get)('franchise-projects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "findOneProject", null);
__decorate([
    (0, common_1.Post)('franchise-projects'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_franchise_project_dto_1.CreateFranchiseProjectDto, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "createProject", null);
__decorate([
    (0, common_1.Put)('franchise-projects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_franchise_project_dto_1.UpdateFranchiseProjectDto, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)('franchise-projects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "removeProject", null);
__decorate([
    (0, common_1.Get)('requests'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "findAllRequests", null);
__decorate([
    (0, common_1.Get)('requests/statistics'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "getRequestStatistics", null);
__decorate([
    (0, common_1.Get)('requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "findOneRequest", null);
__decorate([
    (0, common_1.Post)('requests'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leasing_request_dto_1.CreateLeasingRequestDto, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Put)('requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leasing_request_dto_1.UpdateLeasingRequestDto, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "updateRequest", null);
__decorate([
    (0, common_1.Post)('requests/:id/resolve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('resolution')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "resolveRequest", null);
__decorate([
    (0, common_1.Post)('requests/:id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.Delete)('requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "removeRequest", null);
__decorate([
    (0, common_1.Get)('job-descriptions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "findAllJobDescriptions", null);
__decorate([
    (0, common_1.Get)('job-descriptions/default-template'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "getDefaultTemplate", null);
__decorate([
    (0, common_1.Get)('job-descriptions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "findOneJobDescription", null);
__decorate([
    (0, common_1.Get)('job-descriptions/:id/export'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('language')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "exportJobDescription", null);
__decorate([
    (0, common_1.Post)('job-descriptions'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_description_dto_1.CreateJobDescriptionDto, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "createJobDescription", null);
__decorate([
    (0, common_1.Post)('job-descriptions/generate-from-template'),
    __param(0, (0, common_1.Body)('companyContext')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "generateFromTemplate", null);
__decorate([
    (0, common_1.Put)('job-descriptions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "updateJobDescription", null);
__decorate([
    (0, common_1.Post)('job-descriptions/:id/publish'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "publishJobDescription", null);
__decorate([
    (0, common_1.Post)('job-descriptions/:id/unpublish'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "unpublishJobDescription", null);
__decorate([
    (0, common_1.Delete)('job-descriptions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeasingManagerController.prototype, "removeJobDescription", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeasingManagerController.prototype, "getDashboardData", null);
exports.LeasingManagerController = LeasingManagerController = __decorate([
    (0, common_1.Controller)('leasing-manager'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [leasing_tasks_service_1.LeasingTasksService,
        franchise_projects_service_1.FranchiseProjectsService,
        leasing_requests_service_1.LeasingRequestsService,
        job_descriptions_service_1.JobDescriptionsService])
], LeasingManagerController);
//# sourceMappingURL=leasing-manager.controller.js.map