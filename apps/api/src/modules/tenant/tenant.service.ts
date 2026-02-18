import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CustomerSegmentEnum } from './dto/update-segment.dto';

const SEGMENT_ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN'];

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);

  constructor(private prisma: PrismaService) {}

  async getProfile(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: {
        id: true,
        name: true,
        domain: true,
        plan: true,
        status: true,
        customerSegment: true,
        segmentUpdatedAt: true,
        segmentUpdatedBy: true,
        currency: true,
        language: true,
        timezone: true,
        maxUsers: true,
        maxStores: true,
        createdAt: true,
      },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async updateSegment(
    tenantId: string,
    segment: CustomerSegmentEnum,
    userId: string,
    userRole: string,
  ) {
    if (!SEGMENT_ADMIN_ROLES.includes(userRole)) {
      throw new ForbiddenException('Only ADMIN or SUPER_ADMIN can change customer segment');
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    const previousSegment = tenant.customerSegment;

    const updated = await this.prisma.tenant.update({
      where: { id: tenantId },
      data: {
        customerSegment: segment,
        segmentUpdatedAt: new Date(),
        segmentUpdatedBy: userId,
      },
      select: {
        id: true,
        name: true,
        customerSegment: true,
        segmentUpdatedAt: true,
      },
    });

    this.logger.log(
      `Segment changed: tenant=${tenantId} from=${previousSegment} to=${segment} by=${userId}`,
    );

    return updated;
  }
}
