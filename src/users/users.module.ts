import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service.js';
import {CoreModule} from '../core/core.module.js';
import {AuthModule} from '../auth/auth.module.js';

@Module({
  imports: [CoreModule, forwardRef(() => AuthModule)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
