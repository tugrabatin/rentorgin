"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const database_module_1 = require("./database/database.module");
const logger_service_1 = require("./common/logger.service");
const auth_module_1 = require("./modules/auth/auth.module");
const stores_module_1 = require("./modules/stores/stores.module");
const leases_module_1 = require("./modules/leases/leases.module");
const malls_module_1 = require("./modules/malls/malls.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const ai_assistant_module_1 = require("./modules/ai-assistant/ai-assistant.module");
const translation_module_1 = require("./modules/translation/translation.module");
const session_module_1 = require("./modules/session/session.module");
const upload_module_1 = require("./modules/upload/upload.module");
const expenses_module_1 = require("./modules/expenses/expenses.module");
const leasing_manager_module_1 = require("./modules/leasing-manager/leasing-manager.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            stores_module_1.StoresModule,
            leases_module_1.LeasesModule,
            malls_module_1.MallsModule,
            analytics_module_1.AnalyticsModule,
            ai_assistant_module_1.AiAssistantModule,
            translation_module_1.TranslationModule,
            session_module_1.SessionModule,
            upload_module_1.UploadModule,
            expenses_module_1.ExpensesModule,
            leasing_manager_module_1.LeasingManagerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            logger_service_1.LoggerService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map