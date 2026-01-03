import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(req: any, createExpenseDto: CreateExpenseDto): Promise<{
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
    findAll(req: any, storeId?: string, type?: string, status?: string, startDate?: string, endDate?: string): Promise<({
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
    getStatistics(req: any, storeId?: string, year?: string, month?: string): Promise<{
        totalAmount: number;
        paidAmount: number;
        pendingAmount: number;
        overdueAmount: number;
        totalCount: number;
        byType: Record<string, number>;
        byStatus: Record<string, number>;
        currency: string;
    }>;
    getMonthlySummary(req: any, year: string, storeId?: string): Promise<{
        year: number;
        storeId: string;
        months: any[];
        yearTotal: any;
    }>;
    getOverdue(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, updateExpenseDto: UpdateExpenseDto): Promise<{
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
    markAsPaid(req: any, id: string): Promise<{
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
    remove(req: any, id: string): Promise<{
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
}
//# sourceMappingURL=expenses.controller.d.ts.map