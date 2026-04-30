<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AuthorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tacgia')->insert([
            ['tacgia_id' => 1, 'ho' => '-', 'tendem' => ' -', 'ten' => '[Tác giả không xác định]', 'diachi' => 'Hà Nội', 'sdt' => '0912345001', 'email' => 'tg.an01@example.com'],
            ['tacgia_id' => 2, 'ho' => 'Trần', 'tendem' => 'Thị', 'ten' => 'Bích', 'diachi' => 'Hồ Chí Minh', 'sdt' => '0912345002', 'email' => 'tg.bich02@example.com'],
            ['tacgia_id' => 3, 'ho' => 'Lê', 'tendem' => 'Văn', 'ten' => 'Cường', 'diachi' => 'Đà Nẵng', 'sdt' => '0912345003', 'email' => 'tg.cuong03@example.com'],
            ['tacgia_id' => 4, 'ho' => 'Phạm', 'tendem' => 'Thị', 'ten' => 'Duyên', 'diachi' => 'Hải Phòng', 'sdt' => '0912345004', 'email' => 'tg.duyen04@example.com'],
            ['tacgia_id' => 5, 'ho' => 'Hoàng', 'tendem' => 'Văn', 'ten' => 'Em', 'diachi' => 'Cần Thơ', 'sdt' => '0912345005', 'email' => 'tg.em05@example.com'],
            ['tacgia_id' => 6, 'ho' => 'Vũ', 'tendem' => 'Minh', 'ten' => 'Hùng', 'diachi' => 'Hà Nội', 'sdt' => '0912345006', 'email' => 'tg.hung06@example.com'],
            ['tacgia_id' => 7, 'ho' => 'Đặng', 'tendem' => 'Thị', 'ten' => 'Hạnh', 'diachi' => 'Huế', 'sdt' => '0912345007', 'email' => 'tg.hanh07@example.com'],
            ['tacgia_id' => 8, 'ho' => 'Bùi', 'tendem' => 'Văn', 'ten' => 'Khoa', 'diachi' => 'Bắc Ninh', 'sdt' => '0912345008', 'email' => 'tg.khoa08@example.com'],
            ['tacgia_id' => 9, 'ho' => 'Ngô', 'tendem' => 'Thị', 'ten' => 'Lan', 'diachi' => 'Hồ Chí Minh', 'sdt' => '0912345009', 'email' => 'tg.lan09@example.com'],
            ['tacgia_id' => 10, 'ho' => 'Phan', 'tendem' => 'Văn', 'ten' => 'Long', 'diachi' => 'Hải Phòng', 'sdt' => '0912345010', 'email' => 'tg.long10@example.com'],
            ['tacgia_id' => 11, 'ho' => 'Trương', 'tendem' => 'Thị', 'ten' => 'Mai', 'diachi' => 'Hà Nội', 'sdt' => '0912345011', 'email' => 'tg.mai11@example.com'],
            ['tacgia_id' => 12, 'ho' => 'Đỗ', 'tendem' => 'Văn', 'ten' => 'Nam', 'diachi' => 'Đà Nẵng', 'sdt' => '0912345012', 'email' => 'tg.nam12@example.com'],
            ['tacgia_id' => 13, 'ho' => 'Dương', 'tendem' => 'Thị', 'ten' => 'Nga', 'diachi' => 'Hồ Chí Minh', 'sdt' => '0912345013', 'email' => 'tg.nga13@example.com'],
            ['tacgia_id' => 14, 'ho' => 'Lâm', 'tendem' => 'Minh', 'ten' => 'Phúc', 'diachi' => 'Nha Trang', 'sdt' => '0912345014', 'email' => 'tg.phuc14@example.com'],
            ['tacgia_id' => 15, 'ho' => 'Phùng', 'tendem' => 'Văn', 'ten' => 'Quân', 'diachi' => 'Hà Nội', 'sdt' => '0912345015', 'email' => 'tg.quan15@example.com'],
            ['tacgia_id' => 16, 'ho' => 'Võ', 'tendem' => 'Thị', 'ten' => 'Quỳnh', 'diachi' => 'Cần Thơ', 'sdt' => '0912345016', 'email' => 'tg.quynh16@example.com'],
            ['tacgia_id' => 17, 'ho' => 'Cao', 'tendem' => 'Văn', 'ten' => 'Sơn', 'diachi' => 'Thanh Hóa', 'sdt' => '0912345017', 'email' => 'tg.son17@example.com'],
            ['tacgia_id' => 18, 'ho' => 'Hà', 'tendem' => 'Thị', 'ten' => 'Thảo', 'diachi' => 'Hà Nội', 'sdt' => '0912345018', 'email' => 'tg.thao18@example.com'],
            ['tacgia_id' => 19, 'ho' => 'Thái', 'tendem' => 'Văn', 'ten' => 'Tiến', 'diachi' => 'Hồ Chí Minh', 'sdt' => '0912345019', 'email' => 'tg.tien19@example.com'],
            ['tacgia_id' => 20, 'ho' => 'Mai', 'tendem' => 'Thị', 'ten' => 'Trang', 'diachi' => 'Đà Nẵng', 'sdt' => '0912345020', 'email' => 'tg.trang20@example.com'],
            ['tacgia_id' => 21, 'ho' => 'Phó', 'tendem' => 'Văn', 'ten' => 'Trung', 'diachi' => 'Hải Phòng', 'sdt' => '0912345021', 'email' => 'tg.trung21@example.com'],
            ['tacgia_id' => 22, 'ho' => 'Lý', 'tendem' => 'Thị', 'ten' => 'Uyên', 'diachi' => 'Hà Nội', 'sdt' => '0912345022', 'email' => 'tg.uyen22@example.com'],
            ['tacgia_id' => 23, 'ho' => 'Hồ', 'tendem' => 'Văn', 'ten' => 'Việt', 'diachi' => 'TP. HCM', 'sdt' => '0912345023', 'email' => 'tg.viet23@example.com'],
            ['tacgia_id' => 24, 'ho' => 'Nguyễn', 'tendem' => 'Thị', 'ten' => 'Xuyến', 'diachi' => 'Bình Dương', 'sdt' => '0912345024', 'email' => 'tg.xuyen24@example.com'],
            ['tacgia_id' => 25, 'ho' => 'Trần', 'tendem' => 'Văn', 'ten' => 'Yên', 'diachi' => 'Hà Nội', 'sdt' => '0912345025', 'email' => 'tg.yen25@example.com'],
            ['tacgia_id' => 26, 'ho' => 'Phạm', 'tendem' => 'Minh', 'ten' => 'Zê', 'diachi' => 'Cần Thơ', 'sdt' => '0912345026', 'email' => 'tg.ze26@example.com'],
            ['tacgia_id' => 27, 'ho' => 'Lê', 'tendem' => 'Thị', 'ten' => 'Ánh', 'diachi' => 'Hòa Bình', 'sdt' => '0912345027', 'email' => 'tg.anh27@example.com'],
            ['tacgia_id' => 28, 'ho' => 'Bùi', 'tendem' => 'Minh', 'ten' => 'Bảo', 'diachi' => 'Huế', 'sdt' => '0912345028', 'email' => 'tg.bao28@example.com'],
            ['tacgia_id' => 29, 'ho' => 'Đặng', 'tendem' => 'Thị', 'ten' => 'Chi', 'diachi' => 'Hải Phòng', 'sdt' => '0912345029', 'email' => 'tg.chi29@example.com'],
            ['tacgia_id' => 30, 'ho' => 'Ngô', 'tendem' => 'Văn', 'ten' => 'Đạt', 'diachi' => 'Đà Nẵng', 'sdt' => '0912345030', 'email' => 'tg.dat30@example.com'],
            ['tacgia_id' => 31, 'ho' => 'Phan', 'tendem' => 'Thị', 'ten' => 'Gấm', 'diachi' => 'Quảng Ninh', 'sdt' => '0912345031', 'email' => 'tg.gam31@example.com'],
            ['tacgia_id' => 32, 'ho' => 'Cung', 'tendem' => 'Kim', 'ten' => 'Tiến', 'diachi' => 'Hồ Chí Minh', 'sdt' => '0912345032', 'email' => 'tg.tien32@example.com'],
            ['tacgia_id' => 33, 'ho' => 'Nguyễn', 'tendem' => 'Như', 'ten' => 'Ý', 'diachi' => 'Hà Nội', 'sdt' => '0912345033', 'email' => 'tg.y33@example.com'],
            ['tacgia_id' => 34, 'ho' => 'Nguyễn', 'tendem' => 'Đình', 'ten' => 'Tư', 'diachi' => 'Hồ Chí Minh', 'sdt' => '0912345034', 'email' => 'tg.tu34@example.com'],
        ]);
    }
}
