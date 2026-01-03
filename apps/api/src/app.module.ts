/**
 * Root Application Module
 * Imports all feature modules
 * 
 * Ana Uygulama Modülü
 * Tüm özellik modüllerini içe aktarır
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { LoggerService } from './common/logger.service';
import { AuthModule } from './modules/auth/auth.module';
import { StoresModule } from './modules/stores/stores.module';
import { LeasesModule } from './modules/leases/leases.module';
import { MallsModule } from './modules/malls/malls.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AiAssistantModule } from './modules/ai-assistant/ai-assistant.module';
import { TranslationModule } from './modules/translation/translation.module';
import { SessionModule } from './modules/session/session.module';
import { UploadModule } from './modules/upload/upload.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { LeasingManagerModule } from './modules/leasing-manager/leasing-manager.module';
import { BudgetModule } from './modules/budget/budget.module';
import { RiskModule } from './modules/risk/risk.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 seconds
      limit: 100, // 100 requests per minute
    }]),

    // Database
    DatabaseModule,

    // Feature Modules
    AuthModule,
    StoresModule,
    LeasesModule,
    MallsModule,
    AnalyticsModule,
    AiAssistantModule,
    TranslationModule,
    SessionModule,
    UploadModule,
    ExpensesModule,
    LeasingManagerModule,
    BudgetModule,
    RiskModule,
  ],
  controllers: [AppController],
  providers: [
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

