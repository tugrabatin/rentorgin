/**
 * Risk Controller
 * Risk yönetimi için HTTP endpoint'leri
 * 
 * Risk Controller
 * Risk yönetimi için HTTP endpoint'leri
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
import { RiskService } from './risk.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('risk')
@Controller('risk')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Post()
  @ApiOperation({
    summary: 'Create risk / Risk oluştur',
    description: 'Create a new risk for the tenant / Tenant için yeni risk oluştur',
  })
  create(@CurrentUser() user: any, @Body() createRiskDto: CreateRiskDto) {
    return this.riskService.create(user.tenantId, createRiskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all risks / Tüm riskleri getir',
    description: 'Returns all risks for the authenticated tenant / Kimliği doğrulanmış tenant için tüm riskleri döndürür',
  })
  findAll(@CurrentUser() user: any, @Query() filters: any) {
    return this.riskService.findAll(user.tenantId, filters);
  }

  @Get('statistics')
  @ApiOperation({
    summary: 'Get risk statistics / Risk istatistikleri getir',
    description: 'Returns aggregated risk statistics / Toplu risk istatistikleri döndürür',
  })
  getStatistics(@CurrentUser() user: any) {
    return this.riskService.getStatistics(user.tenantId);
  }

  @Get('score')
  @ApiOperation({
    summary: 'Get risk score / Risk skoru getir',
    description: 'Returns overall risk score (0-100) / Genel risk skoru döndürür (0-100)',
  })
  getRiskScore(@CurrentUser() user: any) {
    return this.riskService.getRiskScore(user.tenantId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get risk by ID / ID ile risk getir',
    description: 'Returns a specific risk / Belirli bir riski döndürür',
  })
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.riskService.findOne(user.tenantId, id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update risk / Risk\'i güncelle',
    description: 'Update an existing risk / Mevcut bir riski güncelle',
  })
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateRiskDto: UpdateRiskDto,
  ) {
    return this.riskService.update(user.tenantId, id, updateRiskDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete risk / Risk\'i sil',
    description: 'Delete a risk / Bir riski sil',
  })
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.riskService.remove(user.tenantId, id);
  }
}








