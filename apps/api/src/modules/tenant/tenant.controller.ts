import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { UpdateSegmentDto } from './dto/update-segment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('tenant')
@Controller('tenant')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Get tenant profile / Tenant profilini getir',
    description: 'Returns the current tenant profile including customer segment / Müşteri segmenti dahil tenant profilini döndürür',
  })
  getProfile(@CurrentUser() user: any) {
    return this.tenantService.getProfile(user.tenantId);
  }

  @Patch('segment')
  @ApiOperation({
    summary: 'Update customer segment / Müşteri segmentini güncelle',
    description: 'Sets the customer segment for the current tenant. Requires ADMIN or SUPER_ADMIN role. / Mevcut tenant için müşteri segmentini ayarlar. ADMIN veya SUPER_ADMIN rolü gerektirir.',
  })
  updateSegment(
    @CurrentUser() user: any,
    @Body() dto: UpdateSegmentDto,
  ) {
    return this.tenantService.updateSegment(
      user.tenantId,
      dto.customerSegment,
      user.userId ?? user.sub ?? user.id,
      user.role,
    );
  }
}
