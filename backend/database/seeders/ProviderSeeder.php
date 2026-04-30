<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProviderSeeder extends Seeder
{
    public function run(): void
    {
        // Nhà Cung Cấp
        DB::table('nhacungcap')->insert([
            ['nhacungcap_id' => 1, 'ten' => '[Nhà cung cấp không xác định]', 'diachi' => '-', 'sdt' => '-', 'email' => 'unknown@unknown.u'],
            ['nhacungcap_id' => 2, 'ten' => 'Công ty Sách XYZ', 'diachi' => 'Số 22, Đường B, TP.HCM', 'sdt' => '0281234002', 'email' => 'contact@xyzbooks.vn'],
            ['nhacungcap_id' => 3, 'ten' => 'Nhà phân phối Sách LMN', 'diachi' => 'Số 5, Phố C, Đà Nẵng', 'sdt' => '02361234003', 'email' => 'info@lmn-distrib.vn'],
            ['nhacungcap_id' => 4, 'ten' => 'Công ty Văn Phòng Phẩm HN', 'diachi' => 'Số 8, Nguyễn Trãi, Hà Nội', 'sdt' => '0242233444', 'email' => 'sales@vpphn.vn'],
            ['nhacungcap_id' => 5, 'ten' => 'Công ty Thiết Bị Giáo Dục - Đào Tạo VN', 'diachi' => 'Số 12, Trần Hưng Đạo, Hà Nội', 'sdt' => '0243334005', 'email' => 'edu@devices.vn'],
            ['nhacungcap_id' => 6, 'ten' => 'Công ty Sách & VPP TPH', 'diachi' => 'Số 50, Lê Lợi, TP.HCM', 'sdt' => '0283344556', 'email' => 'support@sachvpp.vn'],
            ['nhacungcap_id' => 7, 'ten' => 'Công ty Phát Hành Sách Đông A', 'diachi' => 'Số 77, Hùng Vương, Đà Nẵng', 'sdt' => '0236399007', 'email' => 'info@donga-pub.vn'],
            ['nhacungcap_id' => 8, 'ten' => 'Nhà Cung Cấp Văn Phòng Phẩm Gia Đình', 'diachi' => 'Số 3, Đường D, Cần Thơ', 'sdt' => '0292388008', 'email' => 'hello@gd-vpp.vn'],
            ['nhacungcap_id' => 9, 'ten' => 'Công ty Sách Giáo Khoa Việt', 'diachi' => 'Số 99, Nguyễn Du, Hà Nội', 'sdt' => '0244455669', 'email' => 'gk@giaokhoavn.vn'],
            ['nhacungcap_id' => 10, 'ten' => 'Công ty Thiên Long', 'diachi' => 'KCN Thăng Long, Hà Nội', 'sdt' => '0245566770', 'email' => 'support@thienlong.vn'],
            ['nhacungcap_id' => 11, 'ten' => 'Công ty In Ấn FastPrint', 'diachi' => 'Số 18, Đường E, Hải Phòng', 'sdt' => '0225333441', 'email' => 'print@fastprint.vn'],
            ['nhacungcap_id' => 12, 'ten' => 'Công ty Đầu Tư Giáo Dục A+B', 'diachi' => 'Số 6, Phố F, Hà Nội', 'sdt' => '0246667002', 'email' => 'contact@eduab.vn'],
            ['nhacungcap_id' => 13, 'ten' => 'Công ty Sách Trung Nam', 'diachi' => 'Số 30, Quang Trung, TP.HCM', 'sdt' => '0287788993', 'email' => 'sales@trungnam.vn'],
            ['nhacungcap_id' => 14, 'ten' => 'Công ty Vật Tư Văn Phòng QN', 'diachi' => 'Số 2, Đường G, Quảng Ninh', 'sdt' => '0203334404', 'email' => 'vpp@quangninh.vn'],
            ['nhacungcap_id' => 15, 'ten' => 'Nhà cung cấp SGBooks', 'diachi' => 'Số 15, Phố H, Sài Gòn', 'sdt' => '0289990015', 'email' => 'info@sgbooks.vn'],
            ['nhacungcap_id' => 16, 'ten' => 'Công ty Phân Phối Minh An', 'diachi' => 'Số 21, Đường I, Đà Nẵng', 'sdt' => '0236699006', 'email' => 'minhan@dist.vn'],
            ['nhacungcap_id' => 17, 'ten' => 'Công ty Sách & Quà Tặng', 'diachi' => 'Số 7, Nguyễn Thái Học, Hà Nội', 'sdt' => '0247778007', 'email' => 'gifts@booksandgifts.vn'],
            ['nhacungcap_id' => 18, 'ten' => 'Công ty Thiết Bị Học Tập Pro', 'diachi' => 'Số 40, Lê Lợi, Thanh Hóa', 'sdt' => '0237366008', 'email' => 'pro@edu-supplies.vn'],
            ['nhacungcap_id' => 19, 'ten' => 'Nhà cung cấp Hồng Phát', 'diachi' => 'Số 11, Đường J, Huế', 'sdt' => '0237345009', 'email' => 'contact@hongphat.vn'],
            ['nhacungcap_id' => 20, 'ten' => 'Công ty Văn Phòng Phẩm Bình Minh', 'diachi' => 'Số 90, Đường K, Bình Dương', 'sdt' => '0274333440', 'email' => 'sales@binhminhvpp.vn'],
            ['nhacungcap_id' => 21, 'ten' => 'Công ty Sách Quốc Tế', 'diachi' => 'Số 60, Phố L, Hà Nội', 'sdt' => '0249988771', 'email' => 'intl@bookworld.vn'],
            ['nhacungcap_id' => 22, 'ten' => 'Nhà cung cấp Sách Trẻ', 'diachi' => 'Số 8, Đường M, TP.HCM', 'sdt' => '0281234762', 'email' => 'sales@nxbtree.vn'],
            ['nhacungcap_id' => 23, 'ten' => 'Công ty VPP Toàn Cầu', 'diachi' => 'Số 101, Đường N, Hà Nội', 'sdt' => '0241111223', 'email' => 'global@vpp.vn'],
            ['nhacungcap_id' => 24, 'ten' => 'Công ty Sách Minh Thành', 'diachi' => 'Số 45, Đường O, Hải Phòng', 'sdt' => '0225444335', 'email' => 'info@minhthanhbooks.vn'],
            ['nhacungcap_id' => 25, 'ten' => 'Nhà phân phối Văn Phòng Phẩm An Khang', 'diachi' => 'Số 4, Đường P, Cần Thơ', 'sdt' => '0292388776', 'email' => 'ankhang@dist.vn'],
            ['nhacungcap_id' => 26, 'ten' => 'Công ty Sách Giá Rẻ', 'diachi' => 'Số 33, Đường Q, Đà Nẵng', 'sdt' => '0236122117', 'email' => 'cheapbooks@vn.vn'],
            ['nhacungcap_id' => 27, 'ten' => 'Nhà cung cấp Thiết Bị Giáo Dục Tâm An', 'diachi' => 'Số 12, Đường R, Hà Nội', 'sdt' => '0242222338', 'email' => 'taman@edu.vn'],
            ['nhacungcap_id' => 28, 'ten' => 'Công ty Sách Long Phát', 'diachi' => 'Số 9, Đường S, TP.HCM', 'sdt' => '0282233449', 'email' => 'longphat@books.vn'],
            ['nhacungcap_id' => 30, 'ten' => 'Test2', 'diachi' => 'asd', 'sdt' => '234324', 'email' => 'sadasd@fmai.co'],
        ]);

        // Nhà Xuất Bản
        DB::table('nhaxuatban')->insert([
            ['nhaxuatban_id' => 1, 'ten' => '[NXB không xác định]', 'diachi' => '-', 'sdt' => '-', 'email' => '-'],
            ['nhaxuatban_id' => 2, 'ten' => 'NXB Văn Hóa - Văn Nghệ', 'diachi' => 'Số 12 Trần Hưng Đạo, Hà Nội', 'sdt' => '0243822333', 'email' => 'info@vanhoa-vn.vn'],
            ['nhaxuatban_id' => 3, 'ten' => 'NXB Tổng hợp TP. HCM', 'diachi' => 'Số 200 Lê Lợi, Quận 1, TP.HCM', 'sdt' => '0283922111', 'email' => 'support@tonghophcm.vn'],
            ['nhaxuatban_id' => 4, 'ten' => 'NXB Thanh Niên', 'diachi' => 'Số 7 Phạm Ngọc Thạch, Hà Nội', 'sdt' => '0243777888', 'email' => 'hello@nxbthanhnien.vn'],
            ['nhaxuatban_id' => 5, 'ten' => 'NXB Trẻ', 'diachi' => 'Số 18 Nguyễn Thái Học, TP.HCM', 'sdt' => '0283912345', 'email' => 'contact@nxbtre.vn'],
            ['nhaxuatban_id' => 6, 'ten' => 'NXB Khoa Học & Kỹ Thuật', 'diachi' => 'Số 8 Nguyễn Chí Thanh, Hà Nội', 'sdt' => '0243999000', 'email' => 'info@khoahockt.vn'],
            ['nhaxuatban_id' => 7, 'ten' => 'NXB Giáo Trình Đại Học', 'diachi' => 'Số 33 Hoàng Hoa Thám, Hà Nội', 'sdt' => '0243123456', 'email' => 'giao_trinh@dh.edu.vn'],
            ['nhaxuatban_id' => 8, 'ten' => 'NXB Văn Học', 'diachi' => 'Số 56 Nguyễn Văn Cừ, TP.HCM', 'sdt' => '0283765432', 'email' => 'vanhoc@books.vn'],
            ['nhaxuatban_id' => 9, 'ten' => 'NXB Kim Đồng', 'diachi' => 'Số 10 Hàng Bài, Hà Nội', 'sdt' => '0243944556', 'email' => 'contact@kimdong.vn'],
            ['nhaxuatban_id' => 10, 'ten' => 'NXB Phụ Nữ', 'diachi' => 'Số 22 Bà Triệu, Hà Nội', 'sdt' => '0243999888', 'email' => 'info@phunu.vn'],
            ['nhaxuatban_id' => 11, 'ten' => 'NXB Tri Thức', 'diachi' => 'Số 55 Lý Thường Kiệt, Hà Nội', 'sdt' => '0243567890', 'email' => 'support@trithuc.vn'],
            ['nhaxuatban_id' => 12, 'ten' => 'NXB Hội Nhà Văn', 'diachi' => 'Số 3 Quang Trung, Hà Nội', 'sdt' => '0243888777', 'email' => 'hnv@nhavan.vn'],
            ['nhaxuatban_id' => 13, 'ten' => 'NXB Văn Hóa - Xã Hội', 'diachi' => 'Số 77 Nguyễn Trãi, TP.HCM', 'sdt' => '0283999001', 'email' => 'vhxh@publish.vn'],
            ['nhaxuatban_id' => 14, 'ten' => 'NXB Nghệ Thuật', 'diachi' => 'Số 9 Phùng Hưng, Hà Nội', 'sdt' => '0243456000', 'email' => 'art@nxbanh.vn'],
            ['nhaxuatban_id' => 15, 'ten' => 'NXB chính trị quốc gia', 'diachi' => 'Số 6/86 Duy Tân, Cầu Giấy, Hà Nội', 'sdt' => '0236391234', 'email' => 'info@tonghopdn.vn'],
            ['nhaxuatban_id' => 16, 'ten' => 'NXB Kinh Tế', 'diachi' => 'Số 88 Hai Bà Trưng, Hà Nội', 'sdt' => '0243111222', 'email' => 'kinhte@nxbbusiness.vn'],
            ['nhaxuatban_id' => 17, 'ten' => 'NXB Thanh Hóa', 'diachi' => 'Số 5 Lê Lợi, Thanh Hóa', 'sdt' => '0237365432', 'email' => 'contact@nxbthanhhoa.vn'],
            ['nhaxuatban_id' => 18, 'ten' => 'NXB Cẩm Nang Sống', 'diachi' => 'Số 21 Nguyễn Thị Minh Khai, TP.HCM', 'sdt' => '0283911999', 'email' => 'info@camnang.vn'],
            ['nhaxuatban_id' => 19, 'ten' => 'NXB Sư Phạm', 'diachi' => 'Số 12 Trần Phú, Hà Nội', 'sdt' => '0243777666', 'email' => 'supham@edu.vn'],
            ['nhaxuatban_id' => 20, 'ten' => 'NXB Hồng Đức', 'diachi' => 'Số 44 Lê Lợi, Hà Nội', 'sdt' => '0243889000', 'email' => 'info@hongduc.vn'],
            ['nhaxuatban_id' => 21, 'ten' => 'NXB Văn Học Trẻ', 'diachi' => 'Số 3 Lý Thường Kiệt, TP.HCM', 'sdt' => '0283766000', 'email' => 'vhtre@books.vn'],
            ['nhaxuatban_id' => 22, 'ten' => 'NXB Tài Chính', 'diachi' => 'Số 18 Nguyễn Du, Hà Nội', 'sdt' => '0243991122', 'email' => 'finance@nxbtc.vn'],
            ['nhaxuatban_id' => 23, 'ten' => 'NXB Khoa Học Xã Hội', 'diachi' => 'Số 66 Phan Chu Trinh, Hà Nội', 'sdt' => '0243113344', 'email' => 'shs@nxb.vn'],
            ['nhaxuatban_id' => 24, 'ten' => 'NXB Đà Lạt', 'diachi' => 'Số 7 Trần Phú, Đà Lạt', 'sdt' => '0263388777', 'email' => 'dalat@nxb.vn'],
            ['nhaxuatban_id' => 25, 'ten' => 'NXB Sống Đẹp', 'diachi' => 'Số 90 Nguyễn Khánh Toàn, Hà Nội', 'sdt' => '0243451234', 'email' => 'songdep@nxb.vn'],
        ]);
    }
}
