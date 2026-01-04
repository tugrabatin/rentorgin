import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SessionService } from './session.service';

@ApiTags('session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('export')
  @ApiOperation({ summary: 'Export user session / Kullanıcı oturumunu dışa aktar' })
  exportSession(@Body() data: { userId: string; name: string }) {
    return this.sessionService.exportSession(data.userId, data.name);
  }

  @Post('import')
  @ApiOperation({ summary: 'Import user session / Kullanıcı oturumunu içe aktar' })
  importSession(@Body() data: { userId: string; sessionData: any }) {
    return this.sessionService.importSession(data.userId, data.sessionData);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user sessions / Kullanıcı oturumlarını getir' })
  getUserSessions(@Param('userId') userId: string) {
    return this.sessionService.getUserSessions(userId);
  }

  @Get(':sessionId')
  @ApiOperation({ summary: 'Get session by ID / ID ile oturum getir' })
  getSession(@Param('sessionId') sessionId: string) {
    return this.sessionService.getSession(sessionId);
  }
}



















