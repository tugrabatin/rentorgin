import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<{
        tenant: {
            id: string;
            status: import(".prisma/client").$Enums.TenantStatus;
            language: string;
            timezone: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            domain: string;
            plan: import(".prisma/client").$Enums.TenantPlan;
            currency: string;
            subscriptionStartDate: Date;
            subscriptionEndDate: Date | null;
            maxUsers: number;
            maxStores: number;
        };
    } & {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        tenantId: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        language: string;
        timezone: string;
        avatar: string | null;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: any): Promise<{
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            tenantId: any;
            tenant: {
                id: any;
                name: any;
                domain: any;
            };
        };
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
            tenantId: string;
        };
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    private generateTokens;
}
//# sourceMappingURL=auth.service.d.ts.map