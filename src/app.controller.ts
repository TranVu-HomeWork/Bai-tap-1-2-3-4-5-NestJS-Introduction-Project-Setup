import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from './config/config.service.js';
import { APP_CONFIG, type AppConfig } from './config.constants.js';

@Controller()
export class AppController {
  constructor(
    @Inject(APP_CONFIG)
    private readonly config: AppConfig,
    private readonly configService: ConfigService,
  ) {}

  @Get('info')
  getInfo(): AppConfig {
    return this.config;
  }

  @Get('config-folder')
  getConfigFolder() {
    return {
      folder: this.configService.getFolder(),
      exampleFile: this.configService.getFilePath('app.json'),
    };
  }
}
