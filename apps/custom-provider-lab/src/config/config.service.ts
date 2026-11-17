import { Inject, Injectable } from '@nestjs/common';
import {
  CONFIG_OPTIONS,
  type ConfigModuleOptions,
} from './config.module.js';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: ConfigModuleOptions,
  ) {}

  getFolder(): string {
    return this.options.folder;
  }

  getFilePath(fileName: string): string {
    return `${this.options.folder}/${fileName}`;
  }
}
