# Báo cáo thực hành NestJS - Session 2

## Thông tin project

- Tên project: `custom-provider-lab`
- Framework: NestJS 12, TypeScript và ESM
- Nội dung: Dependency Injection, Dynamic Module, Async Provider và Monorepo

## Bài 1 - Provider Custom với `useValue`

Đã tạo `config.constants.ts` với token `APP_CONFIG` và object cấu hình:

```ts
export const APP_CONFIG = 'APP_CONFIG';

export const appConfig = {
  appName: 'MyNestApp',
  version: '1.0',
};
```

`AppModule` đăng ký provider bằng `useValue`. `AppController` inject token bằng `@Inject(APP_CONFIG)` và cung cấp endpoint `GET /info`.

Kết quả mong đợi:

```json
{
  "appName": "MyNestApp",
  "version": "1.0"
}
```

## Bài 2 - Module Re-exporting

Đã xây dựng `CoreModule` để tập trung các provider dùng chung:

- `LoggerService` ghi log ứng dụng.
- `DatabaseService` được export thông qua `DatabaseModule`.
- `UsersModule` và `ProductsModule` chỉ cần import `CoreModule` để sử dụng các provider này.

Khi ứng dụng khởi động, `ProductsModule` ghi log xác nhận đã gọi thành công hai service dùng chung.

![Kết quả Bài 2](image/Screenshot%202026-11-16%20(bai-2).png)

## Bài 3 - Circular Dependency

Đã tạo phụ thuộc chéo giữa `UsersModule` và `AuthModule`:

- `UsersService` gọi `AuthService.generateToken()`.
- `AuthService` gọi `UsersService.validatePassword()`.
- Hai module dùng `forwardRef(() => ...)` trong `imports`.
- Hai service dùng `@Inject(forwardRef(() => ...))` để NestJS giải quyết vòng lặp dependency.

Kết quả: ứng dụng bootstrap thành công, không xuất hiện lỗi circular dependency.

![Kết quả Bài 3](image/Screenshot%202026-11-16%20(bai-3).png)

## Bài 4 - Dynamic Module

Đã tạo `ConfigModule` với method tĩnh `forRoot(options)` trả về `DynamicModule`.

```ts
ConfigModule.forRoot({
  folder: './configs/development',
});
```

`ConfigService` nhận options thông qua token `CONFIG_OPTIONS`, sau đó cung cấp hai hàm `getFolder()` và `getFilePath()`. Endpoint `GET /config-folder` trả về folder cấu hình và đường dẫn file ví dụ.

Ví dụ response:

```json
{
  "folder": "./configs/development",
  "exampleFile": "./configs/development/app.json"
}
```

## Bài 5 - Asynchronous Provider

Đã tạo `ConnectionModule` với provider `THIRD_PARTY_CONNECTION` dùng `useFactory` bất đồng bộ.

```ts
useFactory: async () => {
  await delay(3000);
  return { host: 'api.example.com', connected: true };
}
```

Provider mô phỏng kết nối tới dịch vụ bên thứ ba trong 3 giây. NestJS chỉ hoàn tất khởi động sau khi factory hoàn thành.

![Kết quả Bài 5](image/Screenshot%202026-11-17%20(bai-5).png)

## Bài 6 - Kiến trúc Monorepo

Project đã được chuyển sang NestJS Workspace/Monorepo bằng lệnh:

```bash
npx nest g app admin
npx nest g library database
```

Cấu trúc chính:

```text
apps/
  admin/                 # Ứng dụng quản trị, chạy cổng 3001
  custom-provider-lab/   # API chính, chạy cổng 3000
libs/
  database/              # Thư viện DatabaseModule dùng chung
```

`DatabaseModule` và `DatabaseService` nằm trong `libs/database`. Cả app API chính và app Admin đều import thư viện thông qua alias `@app/database`.

Hai ứng dụng đã được chạy riêng bằng:

```bash
npx nest start admin --watch
npx nest start custom-provider-lab --watch
```

## Kết luận

Qua sáu bài thực hành, project đã áp dụng được custom provider, chia sẻ service qua module, xử lý circular dependency, dynamic module, async factory provider và tổ chức kiến trúc monorepo với thư viện dùng chung.

## Lệnh Git đã sử dụng

```bash
git add .
git commit -m "Hoan thanh bai 1 den bai 5"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
git switch -c bai-6-monorepo
```
