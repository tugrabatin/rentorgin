import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MallsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.mall.findMany({
      include: { contacts: true, stores: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.mall.findUnique({
      where: { id },
      include: { contacts: true, stores: true, leases: true, negotiations: true },
    });
  }

  async create(data: any) {
    return this.prisma.mall.create({ data });
  }

  async updateRelationship(id: string, quality: string) {
    return this.prisma.mall.update({
      where: { id },
      data: { relationshipQuality: quality as any },
    });
  }
}




















