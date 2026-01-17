/**
 * Budget Controller
 * Budget yönetimi için HTTP endpoint'leri
 * 
 * Bütçe Controller
 * Bütçe yönetimi için HTTP endpoint'leri
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('budget')
@Controller('budget')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @ApiOperation({
    summary: 'Create budget / Bütçe oluştur',
    description: 'Create a new budget for the tenant / Tenant için yeni bütçe oluştur',
  })
  create(@CurrentUser() user: any, @Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(user.tenantId, createBudgetDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all budgets / Tüm bütçeleri getir',
    description: 'Returns all budgets for the authenticated tenant / Kimliği doğrulanmış tenant için tüm bütçeleri döndürür',
  })
  findAll(@CurrentUser() user: any, @Query() filters: any) {
    return this.budgetService.findAll(user.tenantId, filters);
  }

  @Get('statistics')
  @ApiOperation({
    summary: 'Get budget statistics / Bütçe istatistikleri getir',
    description: 'Returns aggregated budget statistics / Toplu bütçe istatistikleri döndürür',
  })
  getStatistics(@CurrentUser() user: any, @Query('year') year?: number) {
    return this.budgetService.getStatistics(user.tenantId, year ? parseInt(year.toString()) : undefined);
  }

  @Get('vs-actual')
  @ApiOperation({
    summary: 'Get budget vs actual comparison / Bütçe vs gerçekleşen karşılaştırması',
    description: 'Compare planned budget with actual expenses / Planlanan bütçe ile gerçekleşen giderleri karşılaştır',
  })
  getBudgetVsActual(
    @CurrentUser() user: any,
    @Query('year') year: number,
    @Query('quarter') quarter?: number,
  ) {
    return this.budgetService.getBudgetVsActual(
      user.tenantId,
      parseInt(year.toString()),
      quarter ? parseInt(quarter.toString()) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get budget by ID / ID ile bütçe getir',
    description: 'Returns a specific budget / Belirli bir bütçeyi döndürür',
  })
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.budgetService.findOne(user.tenantId, id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update budget / Bütçeyi güncelle',
    description: 'Update an existing budget / Mevcut bir bütçeyi güncelle',
  })
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetService.update(user.tenantId, id, updateBudgetDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete budget / Bütçeyi sil',
    description: 'Delete a budget / Bir bütçeyi sil',
  })
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.budgetService.remove(user.tenantId, id);
  }
}









