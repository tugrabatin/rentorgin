/**
 * Leasing Manager Module
 * Module for leasing manager features
 * 
 * Kiralama Yöneticisi Modülü
 * Kiralama yöneticisi özellikleri için modül
 */

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { LeasingManagerController } from './leasing-manager.controller';
import { LeasingTasksService } from './leasing-tasks.service';
import { FranchiseProjectsService } from './franchise-projects.service';
import { LeasingRequestsService } from './leasing-requests.service';
import { JobDescriptionsService } from './job-descriptions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LeasingManagerController],
  providers: [
    LeasingTasksService,
    FranchiseProjectsService,
    LeasingRequestsService,
    JobDescriptionsService,
  ],
  exports: [
    LeasingTasksService,
    FranchiseProjectsService,
    LeasingRequestsService,
    JobDescriptionsService,
  ],
})
export class LeasingManagerModule {}
