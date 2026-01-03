/**
 * Stores Controller
 * HTTP endpoints for store management
 * 
 * Mağazalar Controller
 * Mağaza yönetimi için HTTP endpoint'leri
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
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('stores')
@Controller('stores')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get all stores / Tüm mağazaları getir',
    description: 'Returns all stores for the authenticated tenant / Kimliği doğrulanmış tenant için tüm mağazaları döndürür'
  })
  findAll(@CurrentUser() user: any, @Query() filters: any) {
    return this.storesService.findAll(user.tenantId, filters);
  }

  @Get('statistics')
  @ApiOperation({ 
    summary: 'Get store statistics / Mağaza istatistikleri getir',
    description: 'Returns aggregated statistics for stores / Mağazalar için toplu istatistikler döndürür'
  })
  getStatistics(@CurrentUser() user: any) {
    return this.storesService.getStatistics(user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get store by ID / ID ile mağaza getir',
    description: 'Returns detailed store information / Detaylı mağaza bilgilerini döndürür'
  })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.storesService.findOne(id, user.tenantId);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Create new store / Yeni mağaza oluştur',
    description: 'Creates a new store for the tenant / Tenant için yeni mağaza oluşturur'
  })
  create(@CurrentUser() user: any, @Body() createDto: CreateStoreDto) {
    return this.storesService.create(user.tenantId, createDto);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Update store / Mağaza güncelle',
    description: 'Updates store information / Mağaza bilgilerini günceller'
  })
  update(
    @Param('id') id: string, 
    @CurrentUser() user: any, 
    @Body() updateDto: UpdateStoreDto
  ) {
    return this.storesService.update(id, user.tenantId, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete store / Mağaza sil',
    description: 'Deletes a store (if no active leases) / Mağazayı siler (aktif kira yoksa)'
  })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.storesService.remove(id, user.tenantId);
  }
}

