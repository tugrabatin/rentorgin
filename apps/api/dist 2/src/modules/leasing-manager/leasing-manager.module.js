"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeasingManagerModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const leasing_manager_controller_1 = require("./leasing-manager.controller");
const leasing_tasks_service_1 = require("./leasing-tasks.service");
const franchise_projects_service_1 = require("./franchise-projects.service");
const leasing_requests_service_1 = require("./leasing-requests.service");
const job_descriptions_service_1 = require("./job-descriptions.service");
let LeasingManagerModule = class LeasingManagerModule {
};
exports.LeasingManagerModule = LeasingManagerModule;
exports.LeasingManagerModule = LeasingManagerModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [leasing_manager_controller_1.LeasingManagerController],
        providers: [
            leasing_tasks_service_1.LeasingTasksService,
            franchise_projects_service_1.FranchiseProjectsService,
            leasing_requests_service_1.LeasingRequestsService,
            job_descriptions_service_1.JobDescriptionsService,
        ],
        exports: [
            leasing_tasks_service_1.LeasingTasksService,
            franchise_projects_service_1.FranchiseProjectsService,
            leasing_requests_service_1.LeasingRequestsService,
            job_descriptions_service_1.JobDescriptionsService,
        ],
    })
], LeasingManagerModule);
//# sourceMappingURL=leasing-manager.module.js.map