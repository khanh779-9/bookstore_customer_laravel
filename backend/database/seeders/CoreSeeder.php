<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoreSeeder extends Seeder
{
    public function run(): void
    {
        // Danh Mục Sản Phẩm
        DB::table('danhmucsanpham')->insert([
            ['danhmucSP_id' => 1, 'tenDanhMuc' => 'Sách', 'mo_ta' => 'Tất cả các thể loại sách: giáo khoa, tham khảo, văn học, thiếu nhi...'],
            ['danhmucSP_id' => 2, 'tenDanhMuc' => 'Văn phòng phẩm', 'mo_ta' => 'Bút, vở, băng keo, hồ, kéo, dụng cụ học tập...'],
            ['danhmucSP_id' => 3, 'tenDanhMuc' => 'Quà & phụ kiện', 'mo_ta' => 'Quà tặng, bookmark, card, set quà, lịch bàn, lịch treo tường và thiệp'],
        ]);

        // Đơn Vị Tính
        DB::table('donvitinh')->insert([
            ['donvitinh_id' => 1, 'ten' => 'Quyển'],
            ['donvitinh_id' => 2, 'ten' => 'Cái'],
            ['donvitinh_id' => 3, 'ten' => 'Hộp'],
        ]);

        // Loại Sách
        DB::table('loaisach')->insert([
            ['loaisach_code' => 'vat_ly', 'tenLoaiSach' => 'Vật lý'],
            ['loaisach_code' => 'hoahoc', 'tenLoaiSach' => 'Hóa học'],
            ['loaisach_code' => 'giaokhoa', 'tenLoaiSach' => 'Sách giáo khoa'],
            ['loaisach_code' => 'kythuat', 'tenLoaiSach' => 'Kỹ thuật'],
            ['loaisach_code' => 'kinhte', 'tenLoaiSach' => 'Kinh tế'],
            ['loaisach_code' => 'ngoaingu', 'tenLoaiSach' => 'Ngoại ngữ'],
            ['loaisach_code' => 'phapluat', 'tenLoaiSach' => 'Pháp luật'],
            ['loaisach_code' => 'tudien', 'tenLoaiSach' => 'Từ điển'],
            ['loaisach_code' => 'loaimoi', 'tenLoaiSach' => 'Sách mới/Hot'],
            ['loaisach_code' => 'tinhoc', 'tenLoaiSach' => 'Tin học - CNTT'],
            ['loaisach_code' => 'toanhoc', 'tenLoaiSach' => 'Toán học'],
            ['loaisach_code' => 'thethao_dulich', 'tenLoaiSach' => 'Thể thao & Du lịch'],
            ['loaisach_code' => 'vanhoc', 'tenLoaiSach' => 'Văn học'],
            ['loaisach_code' => 'vanhoa_xahoi', 'tenLoaiSach' => 'Văn hóa - Xã hội'],
        ]);

        // Khuyến Mãi
        DB::table('khuyenmai')->insert([
            ['khuyenmai_id' => 1, 'ten' => 'Giảm giá mùa tựu trường', 'ngaybatdau' => '2025-08-01', 'ngayketthuc' => '2025-09-30'],
            ['khuyenmai_id' => 2, 'ten' => 'Khuyến mãi Giáng Sinh', 'ngaybatdau' => '2025-12-01', 'ngayketthuc' => '2025-12-25'],
            ['khuyenmai_id' => 3, 'ten' => 'Khuyến mãi Tết Nguyên Đán', 'ngaybatdau' => '2026-01-15', 'ngayketthuc' => '2026-02-10'],
            ['khuyenmai_id' => 4, 'ten' => 'Giảm giá mùa hè', 'ngaybatdau' => '2026-06-01', 'ngayketthuc' => '2026-07-31'],
            ['khuyenmai_id' => 9, 'ten' => 'CMC', 'ngaybatdau' => '2025-12-17', 'ngayketthuc' => '2025-12-18'],
            ['khuyenmai_id' => 10, 'ten' => 'CMC', 'ngaybatdau' => '2025-12-17', 'ngayketthuc' => '2025-12-18'],
        ]);
    }
}
