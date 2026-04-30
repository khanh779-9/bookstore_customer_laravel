<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MiscSeeder extends Seeder
{
    public function run(): void
    {
        // Chi Tiết Khuyến Mãi
        DB::table('chitietkhuyenmai')->insert([
            ['ctkm_id' => 10, 'khuyenmai_id' => 1, 'sanpham_id' => 1, 'soluong' => 100, 'tilegiamgia' => 10.00],
            ['ctkm_id' => 11, 'khuyenmai_id' => 1, 'sanpham_id' => 5, 'soluong' => 200, 'tilegiamgia' => 15.00],
            ['ctkm_id' => 12, 'khuyenmai_id' => 2, 'sanpham_id' => 2, 'soluong' => 50, 'tilegiamgia' => 20.00],
            ['ctkm_id' => 13, 'khuyenmai_id' => 2, 'sanpham_id' => 6, 'soluong' => 150, 'tilegiamgia' => 25.00],
            ['ctkm_id' => 14, 'khuyenmai_id' => 3, 'sanpham_id' => 3, 'soluong' => 300, 'tilegiamgia' => 30.00],
            ['ctkm_id' => 15, 'khuyenmai_id' => 3, 'sanpham_id' => 7, 'soluong' => 100, 'tilegiamgia' => 18.00],
            ['ctkm_id' => 16, 'khuyenmai_id' => 3, 'sanpham_id' => 21, 'soluong' => 250, 'tilegiamgia' => 12.00],
            ['ctkm_id' => 17, 'khuyenmai_id' => 4, 'sanpham_id' => 4, 'soluong' => 120, 'tilegiamgia' => 15.00],
            ['ctkm_id' => 18, 'khuyenmai_id' => 4, 'sanpham_id' => 24, 'soluong' => 200, 'tilegiamgia' => 22.00],
            ['ctkm_id' => 19, 'khuyenmai_id' => 9, 'sanpham_id' => 1, 'soluong' => 2, 'tilegiamgia' => 43.00],
            ['ctkm_id' => 20, 'khuyenmai_id' => 9, 'sanpham_id' => 2, 'soluong' => 2, 'tilegiamgia' => 33.00],
            ['ctkm_id' => 21, 'khuyenmai_id' => 10, 'sanpham_id' => 1, 'soluong' => 2, 'tilegiamgia' => 43.00],
            ['ctkm_id' => 22, 'khuyenmai_id' => 10, 'sanpham_id' => 2, 'soluong' => 2, 'tilegiamgia' => 33.00],
        ]);

        // Đánh Giá
        DB::table('danhgia')->insert([
            ['danhgia_id' => 1, 'khachhang_id' => 1, 'sanpham_id' => 1, 'rating' => 5, 'binhluan' => 'Sách đẹp, ok', 'ngaytao' => '2025-11-04 19:09:22'],
        ]);

        // Sản Phẩm Yêu Thích
        DB::table('sanphamyeuthich')->insert([
            ['spyt_id' => 2, 'khachhang_id' => 1, 'sanpham_id' => 7, 'ngaythem' => '2025-12-01 10:30:31'],
            ['spyt_id' => 3, 'khachhang_id' => 1, 'sanpham_id' => 1, 'ngaythem' => '2025-12-01 10:35:29'],
            ['spyt_id' => 5, 'khachhang_id' => 1, 'sanpham_id' => 21, 'ngaythem' => '2025-12-07 19:41:12'],
            ['spyt_id' => 6, 'khachhang_id' => 1, 'sanpham_id' => 4, 'ngaythem' => '2025-12-10 15:01:44'],
            ['spyt_id' => 7, 'khachhang_id' => 5, 'sanpham_id' => 24, 'ngaythem' => '2025-12-11 23:31:44'],
            ['spyt_id' => 8, 'khachhang_id' => 4, 'sanpham_id' => 3, 'ngaythem' => '2025-12-13 17:51:44'],
            ['spyt_id' => 9, 'khachhang_id' => 4, 'sanpham_id' => 2, 'ngaythem' => '2025-12-13 17:51:47'],
            ['spyt_id' => 10, 'khachhang_id' => 4, 'sanpham_id' => 42, 'ngaythem' => '2025-12-21 16:20:55'],
            ['spyt_id' => 11, 'khachhang_id' => 4, 'sanpham_id' => 21, 'ngaythem' => '2025-12-21 16:20:57'],
            ['spyt_id' => 12, 'khachhang_id' => 4, 'sanpham_id' => 39, 'ngaythem' => '2025-12-21 16:21:01'],
        ]);

        // Thông Báo
        DB::table('thongbao')->insert([
            ['thongbao_id' => 7, 'khachhang_id' => 1, 'tieu_de' => 'Đăng nhập tài khoản', 'noi_dung' => "Phát hiện lần đăng nhập mới nhất từ \nThiết bị: Desktop\nTrình duyệt: Chrome\nHệ điều hành: Windows 10", 'ngay_tao' => '2025-12-08 22:49:03', 'loai' => 'khach_hang', 'trang_thai' => 'chua_doc'],
            ['thongbao_id' => 8, 'khachhang_id' => 1, 'tieu_de' => 'Đăng nhập tài khoản', 'noi_dung' => "Phát hiện lần đăng nhập mới nhất từ \nThiết bị: Desktop\nTrình duyệt: Chrome\nHệ điều hành: Windows 10", 'ngay_tao' => '2025-12-10 07:20:21', 'loai' => 'khach_hang', 'trang_thai' => 'chua_doc'],
            ['thongbao_id' => 9, 'khachhang_id' => 1, 'tieu_de' => 'Đăng nhập tài khoản', 'noi_dung' => "Phát hiện lần đăng nhập mới nhất từ \nThiết bị: Desktop\nTrình duyệt: Chrome\nHệ điều hành: Windows 10", 'ngay_tao' => '2025-12-10 11:14:54', 'loai' => 'khach_hang', 'trang_thai' => 'chua_doc'],
            ['thongbao_id' => 10, 'khachhang_id' => 1, 'tieu_de' => 'Đăng nhập tài khoản', 'noi_dung' => "Phát hiện lần đăng nhập mới nhất từ \nThiết bị: Desktop\nTrình duyệt: Chrome\nHệ điều hành: Windows 10", 'ngay_tao' => '2025-12-10 13:18:31', 'loai' => 'khach_hang', 'trang_thai' => 'chua_doc'],
            ['thongbao_id' => 11, 'khachhang_id' => 1, 'tieu_de' => 'Đăng nhập tài khoản', 'noi_dung' => "Phát hiện lần đăng nhập mới nhất từ \nThiết bị: Desktop\nTrình duyệt: Chrome\nHệ điều hành: Windows 10", 'ngay_tao' => '2025-12-10 14:52:22', 'loai' => 'khach_hang', 'trang_thai' => 'da_doc'],
            // ... (adding a few more or group them)
        ]);
        
        // Simplified notifications for brevity in seeder, adding the rest
        $remaining_notifications = [
            [12, 1, 'Đăng nhập tài khoản', "Phát hiện lần đăng nhập mới nhất từ \nThiết bị: Desktop\nTrình duyệt: Chrome\nHệ điều hành: Windows 10", '2025-12-11 15:23:41', 'khach_hang', 'da_doc'],
            [20, 2, 'Đăng nhập tài khoản', "Phát hiện lần đăng nhập mới nhất từ \nThiết bị: Desktop\nTrình duyệt: Chrome\nHệ điều hành: Windows 10", '2025-12-10 22:12:12', 'khach_hang', 'chua_doc'],
            [21, 4, 'Đăng nhập tài khoản', "Phát hiện lần đăng nhập mới nhất từ \nThiết bị: Desktop\nTrình duyệt: Chrome\nHệ điều hành: Windows 10", '2025-12-11 08:40:53', 'khach_hang', 'chua_doc'],
            [26, 4, 'Đơn hàng', 'Đơn hàng #17 của bạn đã được tạo thành công.', '2025-12-13 11:25:37', 'khach_hang', 'chua_doc'],
            [32, 6, 'Đăng nhập qua Google', 'Phát hiện lần đăng nhập mới qua Google từ \nThiết bị: Desktop\nTrình duyệt: Chrome\nHệ điều hành: Windows 10', '2025-12-16 21:05:29', 'khach_hang', 'chua_doc'],
        ];

        foreach ($remaining_notifications as $notif) {
            DB::table('thongbao')->insert([
                'thongbao_id' => $notif[0],
                'khachhang_id' => $notif[1],
                'tieu_de' => $notif[2],
                'noi_dung' => $notif[3],
                'ngay_tao' => $notif[4],
                'loai' => $notif[5],
                'trang_thai' => $notif[6],
            ]);
        }
    }
}
