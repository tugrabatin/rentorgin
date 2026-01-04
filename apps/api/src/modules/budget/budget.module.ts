/**
 * Budget Module
 * Budget yönetimi modülü
 * 
 * Bütçe Modülü
 * Bütçe yönetimi modülü
 */

import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}








