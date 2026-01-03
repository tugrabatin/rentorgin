import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any, loginDto: LoginDto): Promise<{
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
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    getProfile(user: any): Promise<{
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            tenantId: any;
        };
    }>;
    logout(): Promise<{
        message: string;
        success: boolean;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map