import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    connect(moduleName: string): void {
        console.log(`[DatabaseService] ${moduleName} Đã kết nối thành công.`);
    }
}
