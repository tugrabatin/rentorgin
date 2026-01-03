"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const prisma_service_1 = require("../../database/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
describe('AuthService', () => {
    let service;
    let prisma;
    let jwtService;
    const mockPrismaService = {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
        tenant: {
            create: jest.fn(),
        },
    };
    const mockJwtService = {
        sign: jest.fn(),
        verify: jest.fn(),
    };
    const mockConfigService = {
        get: jest.fn((key) => {
            if (key === 'JWT_SECRET')
                return 'test-secret';
            return null;
        }),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
                { provide: jwt_1.JwtService, useValue: mockJwtService },
                { provide: config_1.ConfigService, useValue: mockConfigService },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        prisma = module.get(prisma_service_1.PrismaService);
        jwtService = module.get(jwt_1.JwtService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('validateUser', () => {
        it('should return null if user not found', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            const result = await service.validateUser('test@test.com', 'password');
            expect(result).toBeNull();
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { email: 'test@test.com' },
                include: { tenant: true },
            });
        });
        it('should return null if password is invalid', async () => {
            const mockUser = {
                id: '1',
                email: 'test@test.com',
                password: await bcrypt.hash('correctpassword', 12),
                status: 'ACTIVE',
            };
            mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
            const result = await service.validateUser('test@test.com', 'wrongpassword');
            expect(result).toBeNull();
        });
        it('should return user if credentials are valid', async () => {
            const hashedPassword = await bcrypt.hash('password123', 12);
            const mockUser = {
                id: '1',
                email: 'test@test.com',
                password: hashedPassword,
                status: 'ACTIVE',
                tenant: { id: 't1', name: 'Test Tenant' },
            };
            mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
            const result = await service.validateUser('test@test.com', 'password123');
            expect(result).toEqual(mockUser);
        });
        it('should throw UnauthorizedException if user is not active', async () => {
            const hashedPassword = await bcrypt.hash('password123', 12);
            const mockUser = {
                id: '1',
                email: 'test@test.com',
                password: hashedPassword,
                status: 'INACTIVE',
            };
            mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
            await expect(service.validateUser('test@test.com', 'password123')).rejects.toThrow(common_1.UnauthorizedException);
        });
    });
    describe('register', () => {
        it('should throw ConflictException if user already exists', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue({ id: '1' });
            await expect(service.register({
                email: 'existing@test.com',
                password: 'password',
                firstName: 'Test',
                lastName: 'User',
            })).rejects.toThrow(common_1.ConflictException);
        });
        it('should create user with hashed password', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            mockPrismaService.tenant.create.mockResolvedValue({
                id: 't1',
                name: "Test's Organization",
            });
            mockPrismaService.user.create.mockResolvedValue({
                id: 'u1',
                email: 'new@test.com',
                firstName: 'Test',
                lastName: 'User',
                tenantId: 't1',
                role: 'USER',
                tenant: { id: 't1', name: "Test's Organization" },
            });
            mockJwtService.sign.mockReturnValue('mock-token');
            const result = await service.register({
                email: 'new@test.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            });
            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('refreshToken');
            expect(result).toHaveProperty('user');
            expect(prisma.user.create).toHaveBeenCalled();
            const createCall = prisma.user.create.mock.calls[0][0];
            expect(createCall.data.password).not.toBe('password123');
        });
    });
    describe('login', () => {
        it('should update lastLoginAt and return tokens', async () => {
            const mockUser = {
                id: 'u1',
                email: 'test@test.com',
                firstName: 'Test',
                lastName: 'User',
                role: 'USER',
                tenantId: 't1',
                tenant: { id: 't1', name: 'Test Tenant', domain: 'test' },
            };
            mockPrismaService.user.update.mockResolvedValue(mockUser);
            mockJwtService.sign.mockReturnValue('mock-token');
            const result = await service.login(mockUser);
            expect(prisma.user.update).toHaveBeenCalledWith({
                where: { id: 'u1' },
                data: { lastLoginAt: expect.any(Date) },
            });
            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('refreshToken');
            expect(result.user.email).toBe('test@test.com');
        });
    });
    describe('refreshToken', () => {
        it('should throw UnauthorizedException if token is invalid', async () => {
            mockJwtService.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });
            await expect(service.refreshToken('invalid-token')).rejects.toThrow(common_1.UnauthorizedException);
        });
        it('should return new tokens if refresh token is valid', async () => {
            const mockPayload = { sub: 'u1', email: 'test@test.com' };
            const mockUser = {
                id: 'u1',
                email: 'test@test.com',
                status: 'ACTIVE',
                tenantId: 't1',
            };
            mockJwtService.verify.mockReturnValue(mockPayload);
            mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
            mockJwtService.sign.mockReturnValue('new-token');
            const result = await service.refreshToken('valid-refresh-token');
            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('refreshToken');
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map