import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { ConfigService } from './config/config.service.js';
import { APP_CONFIG, appConfig } from './config.constants.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: appConfig,
        },
        {
          provide: ConfigService,
          useValue: {
            getFolder: () => './configs/development',
            getFilePath: (fileName: string) =>
              `./configs/development/${fileName}`,
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('returns the custom application configuration', () => {
    expect(appController.getInfo()).toEqual(appConfig);
  });
});
