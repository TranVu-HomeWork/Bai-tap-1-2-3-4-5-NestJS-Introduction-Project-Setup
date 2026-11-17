import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    connect(applicationName: string): void {
        console.log(`[Database] ${applicationName} đang dùng datebase chung,`);
    }
}
