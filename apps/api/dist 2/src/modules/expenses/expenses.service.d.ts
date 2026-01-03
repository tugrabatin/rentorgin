import { PrismaService } from '../../database/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(tenantId: string, createExpenseDto: CreateExpenseDto): Promise<{
        store: {
            id: string;
            name: string;
            code: string;
            city: string;
        };
    } & {
        description: string | null;
        type: import(".prisma/client").$Enums.ExpenseType;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        storeId: string;
        category: string | null;
        dueDate: Date;
        amount: number;
        invoiceNumber: string | null;
        invoiceUrl: string | null;
        paidDate: Date | null;
        isDisputed: boolean;
        disputeReason: string | null;
        disputeResolvedAt: Date | null;
    }>;
    findAll(tenantId: string, filters?: {
        storeId?: string;
        type?: string;
        status?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<({
        store: {
            id: string;
            name: string;
            code: string;
            city: string;
        };
    } & {
        description: string | null;
        type: import(".prisma/client").$Enums.ExpenseType;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        storeId: string;
        category: string | null;
        dueDate: Date;
        amount: number;
        invoiceNumber: string | null;
        invoiceUrl: string | null;
        paidDate: Date | null;
        isDisputed: boolean;
        disputeReason: string | null;
        disputeResolvedAt: Date | null;
    })[]>;
    findOne(tenantId: string, id: string): Promise<{
        store: {
            id: string;
            name: string;
            code: string;
            brand: string;
            city: string;
        };
    } & {
        description: string | null;
        type: import(".prisma/client").$Enums.ExpenseType;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        storeId: string;
        category: string | null;
        dueDate: Date;
        amount: number;
        invoiceNumber: string | null;
        invoiceUrl: string | null;
        paidDate: Date | null;
        isDisputed: boolean;
        disputeReason: string | null;
        disputeResolvedAt: Date | null;
    }>;
    update(tenantId: string, id: string, updateExpenseDto: UpdateExpenseDto): Promise<{
        store: {
            id: string;
            name: string;
            code: string;
            city: string;
        };
    } & {
        description: string | null;
        type: import(".prisma/client").$Enums.ExpenseType;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        storeId: string;
        category: string | null;
        dueDate: Date;
        amount: number;
        invoiceNumber: string | null;
        invoiceUrl: string | null;
        paidDate: Date | null;
        isDisputed: boolean;
        disputeReason: string | null;
        disputeResolvedAt: Date | null;
    }>;
    remove(tenantId: string, id: string): Promise<{
        description: string | null;
        type: import(".prisma/client").$Enums.ExpenseType;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        storeId: string;
        category: string | null;
        dueDate: Date;
        amount: number;
        invoiceNumber: string | null;
        invoiceUrl: string | null;
        paidDate: Date | null;
        isDisputed: boolean;
        disputeReason: string | null;
        disputeResolvedAt: Date | null;
    }>;
    getStatistics(tenantId: string, filters?: {
        storeId?: string;
        year?: number;
        month?: number;
    }): Promise<{
        totalAmount: number;
        paidAmount: number;
        pendingAmount: number;
        overdueAmount: number;
        totalCount: number;
        byType: Record<string, number>;
        byStatus: Record<string, number>;
        currency: string;
    }>;
    getMonthlySummary(tenantId: string, year: number, storeId?: string): Promise<{
        year: number;
        storeId: string;
        months: any[];
        yearTotal: any;
    }>;
    markAsPaid(tenantId: string, id: string): Promise<{
        store: {
            id: string;
            name: string;
            code: string;
            city: string;
        };
    } & {
        description: string | null;
        type: import(".prisma/client").$Enums.ExpenseType;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        storeId: string;
        category: string | null;
        dueDate: Date;
        amount: number;
        invoiceNumber: string | null;
        invoiceUrl: string | null;
        paidDate: Date | null;
        isDisputed: boolean;
        disputeReason: string | null;
        disputeResolvedAt: Date | null;
    }>;
    getOverdue(tenantId: string): Promise<({
        store: {
            id: string;
            name: string;
            code: string;
            city: string;
        };
    } & {
        description: string | null;
        type: import(".prisma/client").$Enums.ExpenseType;
        tenantId: string;
        id: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        storeId: string;
        category: string | null;
        dueDate: Date;
        amount: number;
        invoiceNumber: string | null;
        invoiceUrl: string | null;
        paidDate: Date | null;
        isDisputed: boolean;
        disputeReason: string | null;
        disputeResolvedAt: Date | null;
    })[]>;
}
//# sourceMappingURL=expenses.service.d.ts.map