import { PrismaService } from '../../database/prisma.service';
import { CreateLeasingTaskDto } from './dto/create-leasing-task.dto';
import { UpdateLeasingTaskDto } from './dto/update-leasing-task.dto';
export declare class LeasingTasksService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, filters?: any): Promise<{
        description: string | null;
        title: string;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        createdAt: Date;
        updatedAt: Date;
        mallId: string | null;
        storeId: string | null;
        assignedToId: string | null;
        leaseId: string | null;
        category: import(".prisma/client").$Enums.LeasingTaskCategory;
        priority: import(".prisma/client").$Enums.TaskPriority;
        franchiseProjectId: string | null;
        defaultSLA: number | null;
        riskLevel: import(".prisma/client").$Enums.RiskLevel;
        dueDate: Date | null;
        completedAt: Date | null;
    }[]>;
    findOne(id: string, tenantId: string): Promise<{
        description: string | null;
        title: string;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        createdAt: Date;
        updatedAt: Date;
        mallId: string | null;
        storeId: string | null;
        assignedToId: string | null;
        leaseId: string | null;
        category: import(".prisma/client").$Enums.LeasingTaskCategory;
        priority: import(".prisma/client").$Enums.TaskPriority;
        franchiseProjectId: string | null;
        defaultSLA: number | null;
        riskLevel: import(".prisma/client").$Enums.RiskLevel;
        dueDate: Date | null;
        completedAt: Date | null;
    }>;
    create(tenantId: string, createDto: CreateLeasingTaskDto): Promise<{
        description: string | null;
        title: string;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        createdAt: Date;
        updatedAt: Date;
        mallId: string | null;
        storeId: string | null;
        assignedToId: string | null;
        leaseId: string | null;
        category: import(".prisma/client").$Enums.LeasingTaskCategory;
        priority: import(".prisma/client").$Enums.TaskPriority;
        franchiseProjectId: string | null;
        defaultSLA: number | null;
        riskLevel: import(".prisma/client").$Enums.RiskLevel;
        dueDate: Date | null;
        completedAt: Date | null;
    }>;
    update(id: string, tenantId: string, updateDto: UpdateLeasingTaskDto): Promise<{
        description: string | null;
        title: string;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.TaskStatus;
        createdAt: Date;
        updatedAt: Date;
        mallId: string | null;
        storeId: string | null;
        assignedToId: string | null;
        leaseId: string | null;
        category: import(".prisma/client").$Enums.LeasingTaskCategory;
        priority: import(".prisma/client").$Enums.TaskPriority;
        franchiseProjectId: string | null;
        defaultSLA: number | null;
        riskLevel: import(".prisma/client").$Enums.RiskLevel;
        dueDate: Date | null;
        completedAt: Date | null;
    }>;
    remove(id: string, tenantId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getStatistics(tenantId: string): Promise<{
        total: number;
        pending: number;
        inProgress: number;
        completed: number;
        byCategory: {
            category: string;
            count: unknown;
        }[];
        byPriority: {
            priority: string;
            count: unknown;
        }[];
    }>;
    private getTasksByCategory;
    private getTasksByPriority;
}
//# sourceMappingURL=leasing-tasks.service.d.ts.map