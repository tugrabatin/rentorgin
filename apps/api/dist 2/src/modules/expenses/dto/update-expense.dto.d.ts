import { ExpenseStatus } from '@prisma/client';
import { CreateExpenseDto } from './create-expense.dto';
declare const UpdateExpenseDto_base: import("@nestjs/common").Type<Partial<CreateExpenseDto>>;
export declare class UpdateExpenseDto extends UpdateExpenseDto_base {
    status?: ExpenseStatus;
    paidDate?: string;
    isDisputed?: boolean;
    disputeReason?: string;
}
export {};
//# sourceMappingURL=update-expense.dto.d.ts.map