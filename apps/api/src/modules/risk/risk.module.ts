/**
 * Risk Module
 * Risk yönetimi modülü
 * 
 * Risk Modülü
 * Risk yönetimi modülü
 */

import { Module } from '@nestjs/common';
import { RiskController } from './risk.controller';
import { RiskService } from './risk.service';

@Module({
  controllers: [RiskController],
  providers: [RiskService],
  exports: [RiskService],
})
export class RiskModule {}









