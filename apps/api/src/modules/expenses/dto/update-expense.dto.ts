import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsEnum, MaxLength, IsBoolean } from 'class-validator';
import { ExpenseStatus } from '@prisma/client';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional({ enum: ExpenseStatus, description: 'Expense status' })
  @IsEnum(ExpenseStatus)
  @IsOptional()
  status?: ExpenseStatus;

  @ApiPropertyOptional({ description: 'Paid date (ISO format)' })
  @IsDateString()
  @IsOptional()
  paidDate?: string;

  @ApiPropertyOptional({ description: 'Is disputed' })
  @IsBoolean()
  @IsOptional()
  isDisputed?: boolean;

  @ApiPropertyOptional({ description: 'Dispute reason' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  disputeReason?: string;
}

