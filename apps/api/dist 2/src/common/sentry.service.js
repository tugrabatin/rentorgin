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
exports.SentryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SentryService = class SentryService {
    constructor(configService) {
        this.configService = configService;
        this.sentryDsn = this.configService.get('SENTRY_DSN') || '';
        this.enabled = !!this.sentryDsn && process.env.NODE_ENV === 'production';
    }
    captureException(error, context) {
        if (this.enabled) {
            console.error('[SENTRY]', error.message, context);
        }
        else {
            console.error('[ERROR]', error.message, context);
        }
    }
    captureMessage(message, level = 'info') {
        if (this.enabled) {
            console.log(`[SENTRY][${level.toUpperCase()}]`, message);
        }
    }
    setUser(user) {
        if (this.enabled) {
            console.log('[SENTRY] User context set:', user.id);
        }
    }
};
exports.SentryService = SentryService;
exports.SentryService = SentryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SentryService);
//# sourceMappingURL=sentry.service.js.map