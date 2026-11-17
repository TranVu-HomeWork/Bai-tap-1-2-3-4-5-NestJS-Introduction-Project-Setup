import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { LoggerService } from './logger/logger.service.js';

@Module({
  imports: [DatabaseModule],
  providers: [LoggerService],
  exports: [LoggerService, DatabaseModule],
})
export class CoreModule {}