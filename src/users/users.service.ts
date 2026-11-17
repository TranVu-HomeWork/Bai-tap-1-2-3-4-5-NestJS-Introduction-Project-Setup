import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AuthService } from '../auth/auth.service.js';
import { LoggerService } from '../core/logger/logger.service.js';
import { DatabaseService } from '../core/database/database.service.js';

interface AuthServiceContract {
  generateToken(userId: number): string;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly databaseService: DatabaseService,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthServiceContract,
  ) {}

  validatePassword(email: string, password: string): boolean {
    this.loggerService.log(`Đang kiểm tra mật khẩu cho: ${email}`);
    return password === '123456';
  }

  requestToken(userId: number): string {
    return this.authService.generateToken(userId);
  }
}