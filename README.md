# BookStore Customer

Ứng dụng web bán sách viết bằng Laravel (MVC).

## Yêu cầu

- PHP 8.2+
- Composer
- MySQL 8+

## Chạy nhanh

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Tạo database `db_nhasach`, import file `template_database/db_nhasach.sql`, rồi chạy:

```bash
php artisan serve
```

Mở: `http://127.0.0.1:8000`
