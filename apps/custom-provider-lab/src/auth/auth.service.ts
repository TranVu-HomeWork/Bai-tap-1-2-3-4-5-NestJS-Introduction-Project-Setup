import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';

interface UsersServiceContract {
  validatePassword(email: string, password: string): boolean;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersServiceContract,
  ) {}

  login(email: string, password: string): string {
    const isValid = this.usersService.validatePassword(email, password);

    if (!isValid) {
      return 'Mật khẩu không đúng';
    }

    return this.generateToken(1);
  }

  generateToken(userId: number): string {
    return `token-for-user-${userId}`;
  }
}