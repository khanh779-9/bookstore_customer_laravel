<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        // Địa Chỉ Giao Hàng
        DB::table('diachi_giaohang')->insert([
            ['dcgh_id' => 1, 'khachhang_id' => 1, 'diachi' => 'Cổng trước STU - 180 Cao Lỗ, Phường 14, Quận 8'],
            ['dcgh_id' => 2, 'khachhang_id' => 1, 'diachi' => 'Cổng sau STU - Phạm Hùng, Quận 8'],
            ['dcgh_id' => 3, 'khachhang_id' => 2, 'diachi' => '25 Nguyễn Thị Minh Khai, Quận 1, TP.HCM'],
            ['dcgh_id' => 4, 'khachhang_id' => 2, 'diachi' => '90 Trần Hưng Đạo, Quận 5, TP.HCM'],
            ['dcgh_id' => 5, 'khachhang_id' => 3, 'diachi' => '88 Lê Văn Việt, Quận 9, TP.Thủ Đức'],
            ['dcgh_id' => 6, 'khachhang_id' => 4, 'diachi' => '12 Trần Hưng Đạo, Quận 5, TP.HCM'],
        ]);

        // Giỏ Hàng
        DB::table('giohang')->insert([
            ['giohang_id' => 1, 'khachhang_id' => 1, 'ngaytao' => '2025-11-02 21:32:45', 'soluong' => 1],
            ['giohang_id' => 2, 'khachhang_id' => 2, 'ngaytao' => '2025-12-10 22:17:28', 'soluong' => 0],
            ['giohang_id' => 3, 'khachhang_id' => 5, 'ngaytao' => '2025-12-11 21:43:33', 'soluong' => 2],
            ['giohang_id' => 4, 'khachhang_id' => 4, 'ngaytao' => '2025-12-12 22:20:37', 'soluong' => 2],
        ]);

        // Chi tiết Giỏ Hàng
        DB::table('chitietgiohang')->insert([
            ['ctgh_id' => 7, 'giohang_id' => 1, 'sanpham_id' => 1, 'soluong' => 1, 'dongia' => 45000.000, 'thanhtien' => 45000.000],
            ['ctgh_id' => 20, 'giohang_id' => 3, 'sanpham_id' => 3, 'soluong' => 1, 'dongia' => 52000.000, 'thanhtien' => 52000.000],
            ['ctgh_id' => 21, 'giohang_id' => 3, 'sanpham_id' => 7, 'soluong' => 1, 'dongia' => 82000.000, 'thanhtien' => 82000.000],
            ['ctgh_id' => 27, 'giohang_id' => 4, 'sanpham_id' => 2, 'soluong' => 2, 'dongia' => 50000.000, 'thanhtien' => 100000.000],
        ]);

        // Hóa Đơn
        DB::table('hoadon')->insert([
            ['hoadon_id' => 1, 'khachhang_id' => 1, 'nhanvien_id' => NULL, 'dcgh_id' => 1, 'ngaytao' => '2025-12-10 17:25:01', 'tongtien' => 117000.00, 'trangthai' => 'dang_giao_hang', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => 'Giao hàng ngoài giờ hành chính'],
            ['hoadon_id' => 2, 'khachhang_id' => 2, 'nhanvien_id' => 1, 'dcgh_id' => 1, 'ngaytao' => '2025-12-10 10:24:31', 'tongtien' => 239000.00, 'trangthai' => 'da_xac_nhan', 'phuongthuc_thanhtoan' => 'chuyen_khoan', 'ghichu' => 'Giao vào buổi sáng các ngày trong tuần'],
            ['hoadon_id' => 3, 'khachhang_id' => 1, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-10 18:37:08', 'tongtien' => 458000.00, 'trangthai' => 'da_xac_nhan', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
            ['hoadon_id' => 4, 'khachhang_id' => 1, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-10 14:35:01', 'tongtien' => 183000.00, 'trangthai' => 'da_xac_nhan', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
            ['hoadon_id' => 5, 'khachhang_id' => 2, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-10 22:17:40', 'tongtien' => 0.00, 'trangthai' => 'da_xac_nhan', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
            ['hoadon_id' => 6, 'khachhang_id' => 1, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-11 08:41:02', 'tongtien' => 45000.00, 'trangthai' => 'da_giao_hang', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
            ['hoadon_id' => 7, 'khachhang_id' => 1, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-11 08:43:23', 'tongtien' => 45000.00, 'trangthai' => 'da_giao_hang', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
            ['hoadon_id' => 14, 'khachhang_id' => 5, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-11 16:28:52', 'tongtien' => 97000.00, 'trangthai' => 'da_giao_hang', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
            ['hoadon_id' => 15, 'khachhang_id' => 5, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-11 16:29:06', 'tongtien' => 246000.00, 'trangthai' => 'da_giao_hang', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
            ['hoadon_id' => 16, 'khachhang_id' => 4, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-12 15:20:43', 'tongtien' => 142000.00, 'trangthai' => 'da_giao_hang', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
            ['hoadon_id' => 17, 'khachhang_id' => 4, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-13 04:25:37', 'tongtien' => 196000.00, 'trangthai' => 'da_giao_hang', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
            ['hoadon_id' => 18, 'khachhang_id' => 4, 'nhanvien_id' => NULL, 'dcgh_id' => NULL, 'ngaytao' => '2025-12-13 10:52:27', 'tongtien' => 285000.00, 'trangthai' => 'da_xac_nhan', 'phuongthuc_thanhtoan' => 'tien_mat', 'ghichu' => NULL],
        ]);

        // Chi tiết Hóa Đơn
        DB::table('chitiethoadon')->insert([
            ['cthd_id' => 1, 'hoadon_id' => 1, 'sanpham_id' => 1, 'soluong' => 1, 'dongia' => 45000.00, 'thanhtien' => 45000.00],
            ['cthd_id' => 2, 'hoadon_id' => 1, 'sanpham_id' => 21, 'soluong' => 2, 'dongia' => 15000.00, 'thanhtien' => 30000.00],
            ['cthd_id' => 3, 'hoadon_id' => 1, 'sanpham_id' => 7, 'soluong' => 1, 'dongia' => 42000.00, 'thanhtien' => 42000.00],
            ['cthd_id' => 4, 'hoadon_id' => 2, 'sanpham_id' => 3, 'soluong' => 2, 'dongia' => 52000.00, 'thanhtien' => 104000.00],
            ['cthd_id' => 5, 'hoadon_id' => 2, 'sanpham_id' => 6, 'soluong' => 1, 'dongia' => 135000.00, 'thanhtien' => 135000.00],
            ['cthd_id' => 11, 'hoadon_id' => 4, 'sanpham_id' => 4, 'soluong' => 1, 'dongia' => 98000.00, 'thanhtien' => 98000.00],
            ['cthd_id' => 12, 'hoadon_id' => 4, 'sanpham_id' => 5, 'soluong' => 1, 'dongia' => 85000.00, 'thanhtien' => 85000.00],
            ['cthd_id' => 14, 'hoadon_id' => 6, 'sanpham_id' => 1, 'soluong' => 1, 'dongia' => 45000.00, 'thanhtien' => 45000.00],
            ['cthd_id' => 15, 'hoadon_id' => 7, 'sanpham_id' => 1, 'soluong' => 1, 'dongia' => 45000.00, 'thanhtien' => 45000.00],
            ['cthd_id' => 18, 'hoadon_id' => 14, 'sanpham_id' => 1, 'soluong' => 1, 'dongia' => 45000.00, 'thanhtien' => 45000.00],
            ['cthd_id' => 19, 'hoadon_id' => 14, 'sanpham_id' => 3, 'soluong' => 1, 'dongia' => 52000.00, 'thanhtien' => 52000.00],
            ['cthd_id' => 20, 'hoadon_id' => 15, 'sanpham_id' => 2, 'soluong' => 1, 'dongia' => 50000.00, 'thanhtien' => 50000.00],
            ['cthd_id' => 21, 'hoadon_id' => 15, 'sanpham_id' => 4, 'soluong' => 2, 'dongia' => 98000.00, 'thanhtien' => 196000.00],
            ['cthd_id' => 22, 'hoadon_id' => 16, 'sanpham_id' => 1, 'soluong' => 2, 'dongia' => 45000.00, 'thanhtien' => 90000.00],
            ['cthd_id' => 23, 'hoadon_id' => 16, 'sanpham_id' => 3, 'soluong' => 1, 'dongia' => 52000.00, 'thanhtien' => 52000.00],
            ['cthd_id' => 24, 'hoadon_id' => 17, 'sanpham_id' => 4, 'soluong' => 2, 'dongia' => 98000.00, 'thanhtien' => 196000.00],
            ['cthd_id' => 25, 'hoadon_id' => 18, 'sanpham_id' => 2, 'soluong' => 3, 'dongia' => 50000.00, 'thanhtien' => 150000.00],
            ['cthd_id' => 26, 'hoadon_id' => 18, 'sanpham_id' => 6, 'soluong' => 1, 'dongia' => 135000.00, 'thanhtien' => 135000.00],
        ]);
    }
}
