import { Module } from '@nestjs/common';
import { AiAssistantController } from './ai-assistant.controller';
import { AiAssistantService } from './ai-assistant.service';
import { LeasingManagerModule } from '../leasing-manager/leasing-manager.module';

@Module({
  imports: [LeasingManagerModule],
  controllers: [AiAssistantController],
  providers: [AiAssistantService],
})
export class AiAssistantModule {}



















