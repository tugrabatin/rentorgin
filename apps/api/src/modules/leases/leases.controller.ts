/**
 * Leases Controller
 * HTTP endpoints for lease contract management
 * 
 * Kira Controller
 * Kira sözleşmesi yönetimi için HTTP endpoint'leri
 */

import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Param, 
  Body, 
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeasesService } from './leases.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('leases')
@Controller('leases')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all leases / Tüm sözleşmeleri getir' })
  findAll(@CurrentUser() user: any, @Query() filters: any) {
    return this.leasesService.findAll(user.tenantId, filters);
  }

  @Get('expiring')
  @ApiOperation({ summary: 'Get expiring leases / Süresi dolmak üzere olan sözleşmeler' })
  findExpiring(@CurrentUser() user: any, @Query('days') days?: number) {
    return this.leasesService.findExpiring(user.tenantId, days || 90);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lease by ID / ID ile sözleşme getir' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.leasesService.findOne(id, user.tenantId);
  }

  @Get(':id/current-rent')
  @ApiOperation({ summary: 'Calculate current rent / Mevcut kirayı hesapla' })
  getCurrentRent(@Param('id') id: string, @CurrentUser() user: any) {
    return this.leasesService.calculateCurrentRent(id, user.tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new lease / Yeni sözleşme oluştur' })
  create(@CurrentUser() user: any, @Body() createDto: CreateLeaseDto) {
    return this.leasesService.create(user.tenantId, createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update lease / Sözleşme güncelle' })
  update(@Param('id') id: string, @CurrentUser() user: any, @Body() updateDto: UpdateLeaseDto) {
    return this.leasesService.update(id, user.tenantId, updateDto);
  }

  @Post(':id/renew')
  @ApiOperation({ summary: 'Initiate lease renewal / Sözleşme yenileme başlat' })
  renew(@Param('id') id: string, @CurrentUser() user: any) {
    return this.leasesService.initiateRenewal(id, user.tenantId);
  }
}

