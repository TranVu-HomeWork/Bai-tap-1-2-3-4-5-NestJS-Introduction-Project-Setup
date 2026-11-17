import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from './config/config.module.js';
import { APP_CONFIG, appConfig } from './config.constants.js';
import { CoreModule } from './core/core.module.js';
import { ProductsModule } from './products/products.module.js';
import { UsersModule } from './users/users.module.js';
import { ConnectionModule } from './connection/connection.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      folder: './configs/development',
    }),
    ConnectionModule,
    CoreModule,
    UsersModule,
    ProductsModule,
    AuthModule,
    ConnectionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_CONFIG,
      useValue: appConfig,
    },
  ],
})
export class AppModule {}
