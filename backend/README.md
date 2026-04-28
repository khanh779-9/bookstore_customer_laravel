# Bookstore Customer Laravel

Ứng dụng web bán sách/văn phòng phẩm xây dựng bằng **Laravel 12** theo mô hình MVC.

## Yêu cầu môi trường

- PHP `>= 8.2`
- Composer
- Node.js `>= 18` + npm
- MySQL `>= 8.0`

## Cài đặt dự án

```bash
composer install
cp .env.example .env
php artisan key:generate
npm install
```

## Cấu hình cơ sở dữ liệu

1. Tạo database, ví dụ: `db_nhasach`.
2. Cập nhật thông tin DB trong file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_nhasach
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

3. Import dữ liệu mẫu từ file:

`template_database/db_nhasach.sql`

> Lưu ý: dự án hiện đang dùng dữ liệu mẫu SQL có sẵn; ưu tiên import file trên trước khi chạy.

## Chạy ứng dụng wweb

Terminal 1:

```bash
php artisan serve
```


Mở trình duyệt tại: `http://127.0.0.1:8000`

### Cách đầy đủ theo script Composer

```bash
composer run dev
```

Lệnh này chạy đồng thời server, queue listener, log viewer và Vite.

## Build assets cho production

```bash
npm run build
```

## Chạy test

```bash
composer test
```

hoặc:

```bash
php artisan test
```

## Một số lệnh khác

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

## Cấu trúc thư mục chính

- `app/Http/Controllers`: Controller xử lý request/response
- `app/Models`: Các model nghiệp vụ (Sách, Hóa đơn, Khuyến mãi...)
- `resources/views`: Giao diện Blade
- `routes/web.php`: Định nghĩa route web
- `template_database/db_nhasach.sql`: Dữ liệu mẫu ban đầu

## Note

- Nếu giao diện không có CSS/JS, kiểm tra lại `npm run dev` (hoặc đã `npm run build`).
- Nếu lỗi kết nối DB, kiểm tra lại thông số trong `.env` và quyền truy cập MySQL.
