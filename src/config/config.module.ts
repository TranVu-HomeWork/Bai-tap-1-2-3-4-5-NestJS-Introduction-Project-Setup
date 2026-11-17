import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service.js';

export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

export interface ConfigModuleOptions {
  folder: string;
}

@Module({})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
