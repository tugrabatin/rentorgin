import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MallsService } from './malls.service';

@ApiTags('malls')
@Controller('malls')
export class MallsController {
  constructor(private readonly mallsService: MallsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all malls / Tüm AVM\'leri getir' })
  findAll() {
    return this.mallsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get mall by ID / ID ile AVM getir' })
  findOne(@Param('id') id: string) {
    return this.mallsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new mall / Yeni AVM oluştur' })
  create(@Body() createDto: any) {
    return this.mallsService.create(createDto);
  }

  @Put(':id/relationship')
  @ApiOperation({ summary: 'Update relationship quality / İlişki kalitesini güncelle' })
  updateRelationship(@Param('id') id: string, @Body() body: { quality: string }) {
    return this.mallsService.updateRelationship(id, body.quality);
  }
}



















