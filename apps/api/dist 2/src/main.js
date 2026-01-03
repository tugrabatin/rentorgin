"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const logger_service_1 = require("./common/logger.service");
const http_exception_filter_1 = require("./common/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = app.get(logger_service_1.LoggerService);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", 'data:', 'https:'],
            },
        },
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:3002',
        process.env.FRONTEND_URL,
    ].filter(Boolean);
    app.enableCors({
        origin: (origin, callback) => {
            if (process.env.NODE_ENV === 'development') {
                return callback(null, true);
            }
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                logger.warn(`Blocked CORS request from origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(logger));
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('RentOrgin API')
        .setDescription('Kurumsal Kiralama Yönetim Platformu API - Enterprise Rental Management Platform API')
        .setVersion('0.1.0')
        .addBearerAuth()
        .addTag('auth', 'Authentication / Kimlik Doğrulama')
        .addTag('stores', 'Store Management / Mağaza Yönetimi')
        .addTag('leases', 'Lease Management / Kira Sözleşme Yönetimi')
        .addTag('malls', 'Mall Relations / AVM İlişkileri')
        .addTag('analytics', 'Analytics / Analitik')
        .addTag('ai-assistant', 'AI Assistant / Yapay Zeka Asistanı')
        .addTag('translation', 'Translation Engine / Çeviri Motoru')
        .addTag('session', 'Session Management / Oturum Yönetimi')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.API_PORT || 3001;
    await app.listen(port);
    console.log(`
    🚀 RentOrgin API is running!
    📡 Port: ${port}
    📚 API Docs: http://localhost:${port}/api/docs
    🌍 Environment: ${process.env.NODE_ENV || 'development'}
    📦 Version: 0.1.0
  `);
}
bootstrap();
//# sourceMappingURL=main.js.map