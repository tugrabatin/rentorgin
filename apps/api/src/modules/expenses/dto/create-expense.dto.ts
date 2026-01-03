import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsDateString, IsOptional, Min, MaxLength } from 'class-validator';
import { ExpenseType, ExpenseStatus } from '@prisma/client';

export class CreateExpenseDto {
  @ApiProperty({ description: 'Store ID' })
  @IsString()
  storeId: string;

  @ApiProperty({ enum: ExpenseType, description: 'Expense type' })
  @IsEnum(ExpenseType)
  type: ExpenseType;

  @ApiPropertyOptional({ description: 'Expense category (optional)' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  category?: string;

  @ApiPropertyOptional({ description: 'Expense description' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ description: 'Expense amount', example: 10000.50 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({ description: 'Currency code', default: 'TRY' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ description: 'Due date (ISO format)', example: '2025-01-15' })
  @IsDateString()
  dueDate: string;

  @ApiPropertyOptional({ description: 'Invoice number' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  invoiceNumber?: string;

  @ApiPropertyOptional({ description: 'Invoice file URL' })
  @IsString()
  @IsOptional()
  invoiceUrl?: string;
}

