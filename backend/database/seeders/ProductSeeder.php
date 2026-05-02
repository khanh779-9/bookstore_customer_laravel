<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Sản phẩm
        DB::table('sanpham')->insert([
            ['sanpham_id' => 1, 'tenSP' => 'Sách giáo khoa Toán 10 – Bộ Cánh Diều (Tập 1)', 'danhmucSP_id' => 1, 'hinhanh' => 'toan10_canhdieu_tap_1.jpg', 'mo_ta' => 'Sách giáo khoa Toán 10 – Bộ Cánh Diều (Tập 1) là tài liệu chính thống...', 'soluongton' => 129, 'donvitinh_id' => 1, 'soluongban' => 47, 'gia' => 45000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 2, 'tenSP' => 'Ngữ văn 11 - Tập 1', 'danhmucSP_id' => 1, 'hinhanh' => 'Ngu-Van-11-Tap-1-600x853.jpg', 'mo_ta' => 'Ngữ văn 11 - Tập 1', 'soluongton' => 112, 'donvitinh_id' => 1, 'soluongban' => 33, 'gia' => 50000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 3, 'tenSP' => 'Tiếng Anh 12 - Sách học sinh', 'danhmucSP_id' => 1, 'hinhanh' => 'ta12-global.png', 'mo_ta' => 'Tiếng Anh 12 - Sách học sinh', 'soluongton' => 75, 'donvitinh_id' => 1, 'soluongban' => 23, 'gia' => 52000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 4, 'tenSP' => 'Tiếng Anh 12 - Sách bài tập', 'danhmucSP_id' => 1, 'hinhanh' => 'sach_ta_12_bt.jpg', 'mo_ta' => 'Tiếng Anh 12 - Sách bài tập', 'soluongton' => 195, 'donvitinh_id' => 1, 'soluongban' => 85, 'gia' => 98000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 5, 'tenSP' => 'Đắc Nhân Tâm - Dale Carnegie', 'danhmucSP_id' => 1, 'hinhanh' => 'dac-nhan-tam-1.jpg', 'mo_ta' => 'Đắc Nhân Tâm - Dale Carnegie', 'soluongton' => 298, 'donvitinh_id' => 1, 'soluongban' => 120, 'gia' => 85000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 6, 'tenSP' => 'Harry Potter và Hòn đá Phù Thủy', 'danhmucSP_id' => 1, 'hinhanh' => 'Sach-Noi-Harry-Potter-Tap-1-J-K-Rowling-audio-book-sachnoi.cc-4.jpg', 'mo_ta' => '“Harry Potter và Hòn đá Phù Thủy”...', 'soluongton' => 88, 'donvitinh_id' => 1, 'soluongban' => 61, 'gia' => 135000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 7, 'tenSP' => 'Vở hồng hà 96 trang', 'danhmucSP_id' => 2, 'hinhanh' => 'vo_hong_ha_96t.jpg', 'mo_ta' => 'Vở Hồng Hà 96 trang...', 'soluongton' => 300, 'donvitinh_id' => 2, 'soluongban' => 40, 'gia' => 82000.000, 'nhacungcap_id' => 3],
            ['sanpham_id' => 21, 'tenSP' => 'Thước nhôm 30cm', 'danhmucSP_id' => 2, 'hinhanh' => 'thuoc_nhom_30cm.jpg', 'mo_ta' => 'Thước nhôm 30cm...', 'soluongton' => 29, 'donvitinh_id' => 2, 'soluongban' => 44, 'gia' => 15000.000, 'nhacungcap_id' => 3],
            ['sanpham_id' => 24, 'tenSP' => 'Từ điển Y học – Sức khoẻ – Bệnh lý (Anh – Việt)', 'danhmucSP_id' => 1, 'hinhanh' => 'td04.jpg', 'mo_ta' => 'Từ điển Y học...', 'soluongton' => 1200, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 35000.000, 'nhacungcap_id' => 12],
            ['sanpham_id' => 26, 'tenSP' => 'Từ điển Mẫu câu tiếng Nhật', 'danhmucSP_id' => 1, 'hinhanh' => 'td01.jpg', 'mo_ta' => 'Từ điển Mẫu câu tiếng Nhật...', 'soluongton' => 600, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 54000.000, 'nhacungcap_id' => 11],
            ['sanpham_id' => 27, 'tenSP' => 'Kế toán Doanh nghiệp ACCESS', 'danhmucSP_id' => 1, 'hinhanh' => 'th12.jpg', 'mo_ta' => 'Cuốn sách “Kế toán Doanh nghiệp ACCESS”...', 'soluongton' => 700, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 70000.000, 'nhacungcap_id' => 16],
            ['sanpham_id' => 28, 'tenSP' => 'Hộp tập giấy A4 – 400 tờ', 'danhmucSP_id' => 2, 'hinhanh' => 'tap-giay-a4-400-to.jpg', 'mo_ta' => 'Hộp tập giấy A4 – 400 tờ...', 'soluongton' => 500, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 100000.000, 'nhacungcap_id' => 14],
            ['sanpham_id' => 29, 'tenSP' => 'Từ điển Kinh doanh – Tiếp thị Hiện đại', 'danhmucSP_id' => 1, 'hinhanh' => 'td02.gif', 'mo_ta' => 'Quyển sách “Từ điển Kinh doanh – Tiếp thị Hiện đại”...', 'soluongton' => 600, 'donvitinh_id' => 1, 'soluongban' => 23, 'gia' => 23000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 30, 'tenSP' => 'Đại từ điển tiếng Việt', 'danhmucSP_id' => 1, 'hinhanh' => 'td03.jpg', 'mo_ta' => 'Thêm yêu tiếng Việt...', 'soluongton' => 600, 'donvitinh_id' => 1, 'soluongban' => 23, 'gia' => 25000.000, 'nhacungcap_id' => 3],
            ['sanpham_id' => 31, 'tenSP' => 'Từ điển mới ...', 'danhmucSP_id' => 1, 'hinhanh' => 'td05.jpg', 'mo_ta' => 'Từ điển mới ...', 'soluongton' => 300, 'donvitinh_id' => 1, 'soluongban' => 12, 'gia' => 50000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 32, 'tenSP' => 'Từ điển địa danh hành chính Nam Bộ', 'danhmucSP_id' => 1, 'hinhanh' => 'td06.jpg', 'mo_ta' => 'Từ điển địa danh hành chính Nam Bộ...', 'soluongton' => 500, 'donvitinh_id' => 1, 'soluongban' => 50, 'gia' => 300000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 33, 'tenSP' => '100 thủ thuật ứng với 100 bài tập thực hành', 'danhmucSP_id' => 1, 'hinhanh' => 'th01.gif', 'mo_ta' => '100 thủ thuật...', 'soluongton' => 400, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 60000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 34, 'tenSP' => 'Lập trình Web bằng PHP 5.3 và cơ sở dữ liệu MySQL 5.1 - Tập 2', 'danhmucSP_id' => 1, 'hinhanh' => 'th02.jpg', 'mo_ta' => 'Tiếp theo tập 1...', 'soluongton' => 60, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 80000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 35, 'tenSP' => 'Lập trình Web bằng PHP 5.3 và cơ sở dữ liệu MySQL 5.1 - Tập 1', 'danhmucSP_id' => 1, 'hinhanh' => 'th03.jpg', 'mo_ta' => 'Tập 1...', 'soluongton' => 100, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 80000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 36, 'tenSP' => 'Tin học thực hành cơ bản', 'danhmucSP_id' => 1, 'hinhanh' => 'th04.jpg', 'mo_ta' => 'Ngày nay với sự phát triển không ngừng...', 'soluongton' => 100, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 35000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 37, 'tenSP' => 'Làm việc với máy tính qua desktop', 'danhmucSP_id' => 1, 'hinhanh' => 'th05.jpg', 'mo_ta' => 'Mục Lục...', 'soluongton' => 20, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 35000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 38, 'tenSP' => 'Windows Server 2008', 'danhmucSP_id' => 1, 'hinhanh' => 'th06.jpg', 'mo_ta' => 'Kế thừa những ưu điểm...', 'soluongton' => 23, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 65000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 39, 'tenSP' => 'Lập trình C nâng cao', 'danhmucSP_id' => 1, 'hinhanh' => 'th06.jpg', 'mo_ta' => 'Cuốn sách này gồm...', 'soluongton' => 100, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 80000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 40, 'tenSP' => 'Giáo trình học nhanh SQL Server 2008', 'danhmucSP_id' => 1, 'hinhanh' => 'th08.jpg', 'mo_ta' => 'Bộ sách...', 'soluongton' => 100, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 90000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 41, 'tenSP' => '160 Vấn Đề Cần Nên Biết Khi Sử Dụng Đồ Họa Máy Vi Tính', 'danhmucSP_id' => 1, 'hinhanh' => 'th09.jpg', 'mo_ta' => '“160 Vấn Đề...', 'soluongton' => 321, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 100000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 42, 'tenSP' => 'Giáo trình học nhanh SQL Server 2008', 'danhmucSP_id' => 1, 'hinhanh' => 'th10.jpg', 'mo_ta' => 'Bộ sách...', 'soluongton' => 500, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 70000.000, 'nhacungcap_id' => 2],
            ['sanpham_id' => 43, 'tenSP' => 'Microsoft Word 2007 thủ thuật', 'danhmucSP_id' => 1, 'hinhanh' => 'th11.jpg', 'mo_ta' => 'Microsoft Word 2007...', 'soluongton' => 100, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 75000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 44, 'tenSP' => '', 'danhmucSP_id' => 1, 'hinhanh' => 'th12.jpg', 'mo_ta' => '', 'soluongton' => 50, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 80000.000, 'nhacungcap_id' => 11],
            ['sanpham_id' => 45, 'tenSP' => 'C++ nâng cao', 'danhmucSP_id' => 1, 'hinhanh' => 'th13.gif', 'mo_ta' => 'Cuốn sách gồm 12 chương...', 'soluongton' => 200, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 83000.000, 'nhacungcap_id' => 11],
            ['sanpham_id' => 46, 'tenSP' => 'Thủ thuật thiết kế Web nhanh', 'danhmucSP_id' => 1, 'hinhanh' => 'th14.jpg', 'mo_ta' => 'Cuốn sách này sẽ cung cấp...', 'soluongton' => 200, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 100000.000, 'nhacungcap_id' => 12],
            ['sanpham_id' => 47, 'tenSP' => 'Tạo Website Hấp Dẫn Với HTML, XHTML Và CSS', 'danhmucSP_id' => 1, 'hinhanh' => 'th15.jpg', 'mo_ta' => 'Ngày nay, việc ứng dụng...', 'soluongton' => 200, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 90000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 48, 'tenSP' => 'Tuyển Tập Thủ Thuật Javascript', 'danhmucSP_id' => 1, 'hinhanh' => 'th16.jpg', 'mo_ta' => '“Tuyển Tập Thủ Thuật Javascript”...', 'soluongton' => 100, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 72000.000, 'nhacungcap_id' => 16],
            ['sanpham_id' => 49, 'tenSP' => 'Thiết Kế Web Với CSS', 'danhmucSP_id' => 1, 'hinhanh' => 'th17.jpg', 'mo_ta' => 'Từ khi được giới thiệu...', 'soluongton' => 100, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 90000.000, 'nhacungcap_id' => 12],
            ['sanpham_id' => 50, 'tenSP' => 'Thiết Kế Web Với JavaScript Và Dom', 'danhmucSP_id' => 1, 'hinhanh' => 'th18.jpg', 'mo_ta' => 'Nội dung cuốn sách...', 'soluongton' => 299, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 92000.000, 'nhacungcap_id' => 1],
            ['sanpham_id' => 51, 'tenSP' => 'sdsad', 'danhmucSP_id' => 2, 'hinhanh' => '51-2.jpg', 'mo_ta' => '', 'soluongton' => 1000, 'donvitinh_id' => 1, 'soluongban' => 0, 'gia' => 230000.000, 'nhacungcap_id' => 1],
        ]);

        // Sách
        DB::table('sach')->insert([
            ['sach_id' => 1, 'sanpham_id' => 1, 'tenSach' => 'Sách Toán 10 - Bộ Cánh Diều', 'nhaxuatban_id' => 1, 'namXB' => '2024', 'tacgia_id' => 1, 'loaisach_code' => 'giaokhoa'],
            ['sach_id' => 2, 'sanpham_id' => 2, 'tenSach' => 'Sách Ngữ văn 11 - Tập 1', 'nhaxuatban_id' => 1, 'namXB' => '2024', 'tacgia_id' => 1, 'loaisach_code' => 'giaokhoa'],
            ['sach_id' => 3, 'sanpham_id' => 3, 'tenSach' => 'Sách Tiếng Anh 12 - Sách học sinh', 'nhaxuatban_id' => 1, 'namXB' => '2024', 'tacgia_id' => 2, 'loaisach_code' => 'ngoaingu'],
            ['sach_id' => 4, 'sanpham_id' => 4, 'tenSach' => 'Sách Tiếng Anh 12 - Sách bài tập', 'nhaxuatban_id' => 3, 'namXB' => '2023', 'tacgia_id' => 2, 'loaisach_code' => 'vanhoc'],
            ['sach_id' => 5, 'sanpham_id' => 5, 'tenSach' => 'Sách Đắc Nhân Tâm', 'nhaxuatban_id' => 5, 'namXB' => '2022', 'tacgia_id' => 5, 'loaisach_code' => 'kinhte'],
            ['sach_id' => 6, 'sanpham_id' => 6, 'tenSach' => 'Sách Harry Potter và Hòn đá Phù triết gia - Tập 1', 'nhaxuatban_id' => 3, 'namXB' => '2021', 'tacgia_id' => 6, 'loaisach_code' => 'vanhoc'],
            ['sach_id' => 8, 'sanpham_id' => 23, 'tenSach' => 'fffff', 'nhaxuatban_id' => 22, 'namXB' => '2005', 'tacgia_id' => 20, 'loaisach_code' => 'vanhoc'],
            ['sach_id' => 9, 'sanpham_id' => 24, 'tenSach' => 'Từ điển y học sức khoẻ bệnh lý (Anh - Việt)', 'nhaxuatban_id' => 11, 'namXB' => '1998', 'tacgia_id' => 16, 'loaisach_code' => 'tudien'],
            ['sach_id' => 11, 'sanpham_id' => 26, 'tenSach' => 'Từ điển mẫu câu tiếng Nhật', 'nhaxuatban_id' => 23, 'namXB' => '1999', 'tacgia_id' => 27, 'loaisach_code' => 'ngoaingu'],
            ['sach_id' => 12, 'sanpham_id' => 27, 'tenSach' => 'Kế toán doanh nghiệp ACCESS', 'nhaxuatban_id' => 22, 'namXB' => '2003', 'tacgia_id' => 29, 'loaisach_code' => 'kinhte'],
            ['sach_id' => 13, 'sanpham_id' => 29, 'tenSach' => 'Từ Điển Kinh Doanh Và Tiếp Thị Hiện Đại', 'nhaxuatban_id' => 11, 'namXB' => '2003', 'tacgia_id' => 5, 'loaisach_code' => 'kinhte'],
            ['sach_id' => 14, 'sanpham_id' => 30, 'tenSach' => 'Đại Từ Điển Tiếng Việt (Bản mới 2010)', 'nhaxuatban_id' => 7, 'namXB' => '2010', 'tacgia_id' => 18, 'loaisach_code' => 'tudien'],
            ['sach_id' => 15, 'sanpham_id' => 31, 'tenSach' => 'Từ Điển Anh Việt - 75000 Từ', 'nhaxuatban_id' => 17, 'namXB' => '2010', 'tacgia_id' => 14, 'loaisach_code' => 'tudien'],
            ['sach_id' => 16, 'sanpham_id' => 32, 'tenSach' => 'Từ điển địa danh hành chính Nam Bộ', 'nhaxuatban_id' => 15, 'namXB' => '2010', 'tacgia_id' => 33, 'loaisach_code' => 'tudien'],
            ['sach_id' => 17, 'sanpham_id' => 33, 'tenSach' => 'Sách 100 thủ thuật với Excel 2010', 'nhaxuatban_id' => 6, 'namXB' => '2010', 'tacgia_id' => NULL, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 18, 'sanpham_id' => 34, 'tenSach' => 'Lập trình web bằng PHP 5.3 và cơ sở dữ liệu', 'nhaxuatban_id' => 1, 'namXB' => '2010', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 19, 'sanpham_id' => 35, 'tenSach' => 'Lập trình web bằng PHP 5.3 và cơ sở dữ liệu MySQL 5.1 (Tập1)', 'nhaxuatban_id' => 18, 'namXB' => '2010', 'tacgia_id' => NULL, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 20, 'sanpham_id' => 36, 'tenSach' => 'Làm Quen Với Internet', 'nhaxuatban_id' => 18, 'namXB' => '2010', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 21, 'sanpham_id' => 37, 'tenSach' => 'Từng Bước Làm Quen Với Máy Tính', 'nhaxuatban_id' => NULL, 'namXB' => '2008', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 22, 'sanpham_id' => 38, 'tenSach' => 'Quản Trị Windows Server 2008 - Tập 2', 'nhaxuatban_id' => 3, 'namXB' => '2007', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 23, 'sanpham_id' => 39, 'tenSach' => 'Kỹ Thuật Lập Trình C - Cơ Sở Và Nâng Cao', 'nhaxuatban_id' => NULL, 'namXB' => '2007', 'tacgia_id' => NULL, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 24, 'sanpham_id' => 40, 'tenSach' => 'Giáo Trình Học Nhanh SQL Server 2008 - Tập 2', 'nhaxuatban_id' => 3, 'namXB' => '2009', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 25, 'sanpham_id' => 41, 'tenSach' => '160 Vấn Đề Cần Nên Biết Khi Sử Dụng Đồ Họa Máy Vi Tính', 'nhaxuatban_id' => 3, 'namXB' => '2012', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 26, 'sanpham_id' => 42, 'tenSach' => 'Giáo Trình Học Nhanh SQL Server 2008 - Tập 1', 'nhaxuatban_id' => 3, 'namXB' => '2010', 'tacgia_id' => NULL, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 27, 'sanpham_id' => 43, 'tenSach' => 'Microsoft Word 2007 - Căn Bản Và Thủ Thuật', 'nhaxuatban_id' => 1, 'namXB' => '2010', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 28, 'sanpham_id' => 44, 'tenSach' => 'Kế Toán Doanh Nghiệp Với ACCESS', 'nhaxuatban_id' => 3, 'namXB' => '2007', 'tacgia_id' => 28, 'loaisach_code' => 'loaimoi'],
            ['sach_id' => 29, 'sanpham_id' => 45, 'tenSach' => 'Giáo Trình C++ & Lập Trình Hướng Đối Tượng', 'nhaxuatban_id' => 6, 'namXB' => '2010', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 30, 'sanpham_id' => 46, 'tenSach' => 'Các Thủ Thuật Trong HTML Và Thiết Kế Web', 'nhaxuatban_id' => 18, 'namXB' => '2010', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 31, 'sanpham_id' => 47, 'tenSach' => 'Tạo Website Hấp Dẫn Với HTML, XHTML Và CSS', 'nhaxuatban_id' => 18, 'namXB' => '2010', 'tacgia_id' => 17, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 32, 'sanpham_id' => 48, 'tenSach' => 'Tuyển Tập Thủ Thuật Javascript - Tập 1', 'nhaxuatban_id' => 18, 'namXB' => '2010', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 33, 'sanpham_id' => 49, 'tenSach' => 'Thiết Kế Web Với CSS', 'nhaxuatban_id' => 18, 'namXB' => '2010', 'tacgia_id' => 8, 'loaisach_code' => 'tinhoc'],
            ['sach_id' => 34, 'sanpham_id' => 50, 'tenSach' => 'Thiết Kế Web Với JavaScript Và Dom', 'nhaxuatban_id' => 6, 'namXB' => '2010', 'tacgia_id' => 28, 'loaisach_code' => 'tinhoc'],
        ]);


    }
}
