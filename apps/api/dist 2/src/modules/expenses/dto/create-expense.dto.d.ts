import { ExpenseType } from '@prisma/client';
export declare class CreateExpenseDto {
    storeId: string;
    type: ExpenseType;
    category?: string;
    description?: string;
    amount: number;
    currency?: string;
    dueDate: string;
    invoiceNumber?: string;
    invoiceUrl?: string;
}
//# sourceMappingURL=create-expense.dto.d.ts.map