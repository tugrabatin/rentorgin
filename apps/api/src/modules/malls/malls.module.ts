import { Module } from '@nestjs/common';
import { MallsController } from './malls.controller';
import { MallsService } from './malls.service';

@Module({
  controllers: [MallsController],
  providers: [MallsService],
})
export class MallsModule {}




















