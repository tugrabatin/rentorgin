import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('stores/:storeId')
  @ApiOperation({ summary: 'Get store analytics / Mağaza analitiğini getir' })
  getStoreAnalytics(@Param('storeId') storeId: string, @Query() filters: any) {
    return this.analyticsService.getStoreAnalytics(storeId, filters);
  }

  @Get('portfolio')
  @ApiOperation({ summary: 'Get portfolio summary / Portföy özetini getir' })
  getPortfolioSummary(@Query() filters: any) {
    return this.analyticsService.getPortfolioSummary(filters);
  }

  @Post('calculate')
  @ApiOperation({ summary: 'Calculate analytics for period / Dönem için analitik hesapla' })
  calculate(@Body() data: any) {
    return this.analyticsService.calculate(data);
  }

  @Get('compare')
  @ApiOperation({ summary: 'Compare stores / Mağazaları karşılaştır' })
  compareStores(@Query('storeIds') storeIds: string) {
    const ids = storeIds.split(',');
    return this.analyticsService.compareStores(ids);
  }
}




















