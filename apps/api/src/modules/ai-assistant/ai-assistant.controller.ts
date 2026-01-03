import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiAssistantService } from './ai-assistant.service';

@ApiTags('ai-assistant')
@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private readonly aiService: AiAssistantService) {}

  @Post('execute')
  @ApiOperation({ summary: 'Execute AI prompt / AI prompt çalıştır' })
  executePrompt(@Body() data: { promptId: string; context: any; userInput: string }) {
    return this.aiService.executePrompt(data.promptId, data.context, data.userInput);
  }

  @Post('feedback')
  @ApiOperation({ summary: 'Submit feedback / Geri bildirim gönder' })
  submitFeedback(@Body() data: { interactionId: string; feedback: any }) {
    return this.aiService.logFeedback(data.interactionId, data.feedback);
  }
}


















