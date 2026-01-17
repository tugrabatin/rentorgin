import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TranslationService } from './translation.service';

@ApiTags('translation')
@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start translation job / Çeviri işini başlat' })
  startTranslation(@Body() data: { documentUrl: string; sourceLang: string; targetLang: string }) {
    return this.translationService.startTranslation(data);
  }

  @Get('jobs/:jobId')
  @ApiOperation({ summary: 'Get translation job status / Çeviri iş durumunu getir' })
  getJobStatus(@Param('jobId') jobId: string) {
    return this.translationService.getJobStatus(jobId);
  }

  @Get('jobs/:jobId/progress')
  @ApiOperation({ summary: 'Get translation progress / Çeviri ilerlemesini getir' })
  getProgress(@Param('jobId') jobId: string) {
    return this.translationService.getProgress(jobId);
  }
}




















