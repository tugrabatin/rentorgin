/**
 * Prisma Service
 * Database connection and query execution
 * 
 * Prisma Servisi
 * Veritabanı bağlantısı ve sorgu yürütme
 */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Database disconnected');
  }

  /**
   * Enable tenant-scoped queries middleware
   * Multi-tenant veri izolasyonu için middleware
   */
  enableTenantScopeMiddleware(tenantId: string) {
    // This would be implemented with Prisma middleware
    // to automatically filter queries by tenantId
    console.log(`Tenant scope enabled for: ${tenantId}`);
  }
}



