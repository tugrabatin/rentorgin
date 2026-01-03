import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../database/prisma.service';
export interface JwtPayload {
    sub: string;
    email: string;
    tenantId: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: JwtPayload): Promise<{
        userId: string;
        email: string;
        tenantId: string;
        role: import(".prisma/client").$Enums.UserRole;
        firstName: string;
        lastName: string;
    }>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map