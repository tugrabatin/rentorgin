/**
 * Leasing Manager Controller
 * HTTP endpoints for leasing manager features
 * 
 * Kiralama Yöneticisi Controller
 * Kiralama yöneticisi özellikleri için HTTP uç noktaları
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LeasingTasksService } from './leasing-tasks.service';
import { FranchiseProjectsService } from './franchise-projects.service';
import { LeasingRequestsService } from './leasing-requests.service';
import { JobDescriptionsService } from './job-descriptions.service';
import { CreateLeasingTaskDto } from './dto/create-leasing-task.dto';
import { UpdateLeasingTaskDto } from './dto/update-leasing-task.dto';
import { CreateFranchiseProjectDto } from './dto/create-franchise-project.dto';
import { UpdateFranchiseProjectDto } from './dto/update-franchise-project.dto';
import { CreateLeasingRequestDto } from './dto/create-leasing-request.dto';
import { UpdateLeasingRequestDto } from './dto/update-leasing-request.dto';
import { CreateJobDescriptionDto } from './dto/create-job-description.dto';

@Controller('leasing-manager')
@UseGuards(JwtAuthGuard)
export class LeasingManagerController {
  constructor(
    private readonly leasingTasksService: LeasingTasksService,
    private readonly franchiseProjectsService: FranchiseProjectsService,
    private readonly leasingRequestsService: LeasingRequestsService,
    private readonly jobDescriptionsService: JobDescriptionsService,
  ) {}

  // ==================== LEASING TASKS ====================

  @Get('tasks')
  findAllTasks(@Req() req: any, @Query() filters: any) {
    return this.leasingTasksService.findAll(req.user.tenantId, filters);
  }

  @Get('tasks/statistics')
  getTaskStatistics(@Req() req: any) {
    return this.leasingTasksService.getStatistics(req.user.tenantId);
  }

  @Get('tasks/:id')
  findOneTask(@Param('id') id: string, @Req() req: any) {
    return this.leasingTasksService.findOne(id, req.user.tenantId);
  }

  @Post('tasks')
  createTask(@Body() createDto: CreateLeasingTaskDto, @Req() req: any) {
    return this.leasingTasksService.create(req.user.tenantId, createDto);
  }

  @Put('tasks/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateDto: UpdateLeasingTaskDto,
    @Req() req: any,
  ) {
    return this.leasingTasksService.update(id, req.user.tenantId, updateDto);
  }

  @Delete('tasks/:id')
  removeTask(@Param('id') id: string, @Req() req: any) {
    return this.leasingTasksService.remove(id, req.user.tenantId);
  }

  // ==================== FRANCHISE PROJECTS ====================

  @Get('franchise-projects')
  findAllProjects(@Req() req: any, @Query() filters: any) {
    return this.franchiseProjectsService.findAll(req.user.tenantId, filters);
  }

  @Get('franchise-projects/statistics')
  getProjectStatistics(@Req() req: any) {
    return this.franchiseProjectsService.getStatistics(req.user.tenantId);
  }

  @Get('franchise-projects/:id')
  findOneProject(@Param('id') id: string, @Req() req: any) {
    return this.franchiseProjectsService.findOne(id, req.user.tenantId);
  }

  @Post('franchise-projects')
  createProject(@Body() createDto: CreateFranchiseProjectDto, @Req() req: any) {
    return this.franchiseProjectsService.create(req.user.tenantId, createDto);
  }

  @Put('franchise-projects/:id')
  updateProject(
    @Param('id') id: string,
    @Body() updateDto: UpdateFranchiseProjectDto,
    @Req() req: any,
  ) {
    return this.franchiseProjectsService.update(id, req.user.tenantId, updateDto);
  }

  @Delete('franchise-projects/:id')
  removeProject(@Param('id') id: string, @Req() req: any) {
    return this.franchiseProjectsService.remove(id, req.user.tenantId);
  }

  // ==================== LEASING REQUESTS ====================

  @Get('requests')
  findAllRequests(@Req() req: any, @Query() filters: any) {
    return this.leasingRequestsService.findAll(req.user.tenantId, filters);
  }

  @Get('requests/statistics')
  getRequestStatistics(@Req() req: any) {
    return this.leasingRequestsService.getStatistics(req.user.tenantId);
  }

  @Get('requests/:id')
  findOneRequest(@Param('id') id: string, @Req() req: any) {
    return this.leasingRequestsService.findOne(id, req.user.tenantId);
  }

  @Post('requests')
  createRequest(@Body() createDto: CreateLeasingRequestDto, @Req() req: any) {
    return this.leasingRequestsService.create(
      req.user.tenantId,
      req.user.userId,
      createDto,
    );
  }

  @Put('requests/:id')
  updateRequest(
    @Param('id') id: string,
    @Body() updateDto: UpdateLeasingRequestDto,
    @Req() req: any,
  ) {
    return this.leasingRequestsService.update(id, req.user.tenantId, updateDto);
  }

  @Post('requests/:id/resolve')
  resolveRequest(
    @Param('id') id: string,
    @Body('resolution') resolution: string,
    @Req() req: any,
  ) {
    return this.leasingRequestsService.resolve(
      id,
      req.user.tenantId,
      req.user.userId,
      resolution,
    );
  }

  @Post('requests/:id/reject')
  rejectRequest(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Req() req: any,
  ) {
    return this.leasingRequestsService.reject(
      id,
      req.user.tenantId,
      req.user.userId,
      reason,
    );
  }

  @Delete('requests/:id')
  removeRequest(@Param('id') id: string, @Req() req: any) {
    return this.leasingRequestsService.remove(id, req.user.tenantId);
  }

  // ==================== JOB DESCRIPTIONS ====================

  @Get('job-descriptions')
  findAllJobDescriptions(@Req() req: any, @Query() filters: any) {
    return this.jobDescriptionsService.findAll(req.user.tenantId, filters);
  }

  @Get('job-descriptions/default-template')
  getDefaultTemplate() {
    return this.jobDescriptionsService.getDefaultLeasingManagerTemplate();
  }

  @Get('job-descriptions/:id')
  findOneJobDescription(@Param('id') id: string, @Req() req: any) {
    return this.jobDescriptionsService.findOne(id, req.user.tenantId);
  }

  @Get('job-descriptions/:id/export')
  exportJobDescription(
    @Param('id') id: string,
    @Query('language') language: 'TR' | 'EN',
    @Req() req: any,
  ) {
    return this.jobDescriptionsService.exportToPosting(
      id,
      req.user.tenantId,
      language || 'TR',
    );
  }

  @Post('job-descriptions')
  createJobDescription(@Body() createDto: CreateJobDescriptionDto, @Req() req: any) {
    return this.jobDescriptionsService.create(
      req.user.tenantId,
      req.user.userId,
      createDto,
    );
  }

  @Post('job-descriptions/generate-from-template')
  generateFromTemplate(@Body('companyContext') companyContext: any, @Req() req: any) {
    return this.jobDescriptionsService.generateFromLeasingManagerTemplate(
      req.user.tenantId,
      req.user.userId,
      companyContext,
    );
  }

  @Put('job-descriptions/:id')
  updateJobDescription(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateJobDescriptionDto>,
    @Req() req: any,
  ) {
    return this.jobDescriptionsService.update(id, req.user.tenantId, updateDto);
  }

  @Post('job-descriptions/:id/publish')
  publishJobDescription(@Param('id') id: string, @Req() req: any) {
    return this.jobDescriptionsService.publish(id, req.user.tenantId);
  }

  @Post('job-descriptions/:id/unpublish')
  unpublishJobDescription(@Param('id') id: string, @Req() req: any) {
    return this.jobDescriptionsService.unpublish(id, req.user.tenantId);
  }

  @Delete('job-descriptions/:id')
  removeJobDescription(@Param('id') id: string, @Req() req: any) {
    return this.jobDescriptionsService.remove(id, req.user.tenantId);
  }

  // ==================== DASHBOARD DATA ====================

  @Get('dashboard')
  async getDashboardData(@Req() req: any) {
    const [taskStats, projectStats, requestStats] = await Promise.all([
      this.leasingTasksService.getStatistics(req.user.tenantId),
      this.franchiseProjectsService.getStatistics(req.user.tenantId),
      this.leasingRequestsService.getStatistics(req.user.tenantId),
    ]);

    return {
      tasks: taskStats,
      projects: projectStats,
      requests: requestStats,
    };
  }
}
