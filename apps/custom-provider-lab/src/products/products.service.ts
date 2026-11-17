import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '../core/logger/logger.service.js';
import { DatabaseService } from '@app/database';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly databaseService: DatabaseService,
  ) {}

  onModuleInit(): void {
    this.loggerService.log('ProductsModule đã sử dụng LoggerService.');
    this.databaseService.connect('ProductsModule');
  }
}
