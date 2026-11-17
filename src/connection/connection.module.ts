import { Module } from '@nestjs/common';

export const THIRD_PARTY_CONNECTION = 'THIRD_PARTY_CONNECTION';

function delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}


@Module({
      providers: [
    {
      provide: THIRD_PARTY_CONNECTION,
      useFactory: async () => {
        console.log('[Connection] Đang kết nối dịch vụ bên thứ 3...');

        await delay(3000);

        const connectionConfig = {
          host: 'api.example.com',
          connected: true,
        };

        console.log('[Connection] Kết nối thành công.');
        return connectionConfig;
      },
    },
  ],
  exports: [THIRD_PARTY_CONNECTION],
})
export class ConnectionModule {}
