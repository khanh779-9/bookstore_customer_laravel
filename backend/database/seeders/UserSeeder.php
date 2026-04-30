<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Khách Hàng
        DB::table('khachhang')->insert([
            ['khachhang_id' => 1, 'password' => '$2y$10$8m4pKfrzVNu6randbO5/9er6cOAOjeRNMhm4S9xUDwDOrUVquUH66', 'ho' => 'Nguyen', 'tendem' => 'Van', 'ten' => 'An', 'ngaysinh' => '1990-01-01', 'diachi' => 'Hanoi', 'sdt' => '0987654321', 'email' => 'nguyenvanA@example.com', 'gioitinh' => 'Nam', 'ngaythamgia' => '2025-11-02 11:13:51'],
            ['khachhang_id' => 2, 'password' => '$2y$10$yTLModrZ9oltLvL2H292TOiHyQ0gVAfE/f6.wuQuriM3b0E4FSRti', 'ho' => 'Tran', 'tendem' => 'Thi', 'ten' => 'Binh', 'ngaysinh' => '1985-05-12', 'diachi' => 'Ho Chi Minh', 'sdt' => '0912345678', 'email' => 'tranthiB@example.com', 'gioitinh' => 'Nu', 'ngaythamgia' => '2025-11-02 11:13:51'],
            ['khachhang_id' => 3, 'password' => 'xyz789', 'ho' => 'Le', 'tendem' => NULL, 'ten' => 'Cuong', 'ngaysinh' => '2000-07-20', 'diachi' => 'Da Nang', 'sdt' => '0905123456', 'email' => 'levanC@example.com', 'gioitinh' => 'Nam', 'ngaythamgia' => '2025-11-02 11:13:51'],
            ['khachhang_id' => 4, 'password' => '$2y$10$t1Xl0SIkhwgQ0HkflVBGAerSOwo24ERyZnNAJC0wRr6rg2YpvIvfS', 'ho' => 'Trần', 'tendem' => 'Quốc', 'ten' => 'Khánh', 'ngaysinh' => '2025-12-12', 'diachi' => '', 'sdt' => '0329675483', 'email' => 'du122o@maily.org', 'gioitinh' => NULL, 'ngaythamgia' => '2025-12-11 08:40:42'],
            ['khachhang_id' => 5, 'password' => '$2y$10$juKMi7ZEbdrbvZyTDrDDu.bI5FUITrPtQkHP1OS8cOefT4D9yBSl2', 'ho' => 'Nguyễn', 'tendem' => 'Thị Tuyết', 'ten' => 'Nhi', 'ngaysinh' => NULL, 'diachi' => 'sdasdasd', 'sdt' => '02938475', 'email' => 'nhixinh.slurp285@passinbox.com', 'gioitinh' => NULL, 'ngaythamgia' => '2025-12-11 21:42:26'],
            ['khachhang_id' => 6, 'password' => '$2y$10$.Rug8xdaOKJsqlco0iG3yO.X6BdZWWUNpDWJzc546HRg8GYxqIroS', 'ho' => 'Khanh', 'tendem' => '', 'ten' => 'T', 'ngaysinh' => NULL, 'diachi' => NULL, 'sdt' => NULL, 'email' => 'qkhanh3921@gmail.com', 'gioitinh' => NULL, 'ngaythamgia' => '2025-12-16 21:05:29'],
        ]);

        // Nhân Viên
        DB::table('nhanvien')->insert([
            ['nhanvien_id' => 1, 'password' => '$2y$10$dLXmUrmNDVQFXXXZYgxv1ODPRhJ0SWtAdydpzLFjf5GwLk6ykvRUe', 'ho' => 'Nguyễn', 'tendem' => 'Van', 'ten' => 'Xuan', 'gioitinh' => 'Nu', 'ngaysinh' => '1980-03-10', 'diachi' => 'Hanoi', 'sdt' => '0123456789', 'email' => 'xuan.nguyen@example.com', 'ngayvaolam' => '2020-01-01', 'trangthai' => 'dang_lam', 'role' => 'nhanvien', 'ghichu' => 'Phu tra viec', 'created_at' => '2025-11-02 04:13:51', 'updated_at' => '2025-12-13 10:30:39'],
            ['nhanvien_id' => 2, 'password' => '$2y$10$lvVMWAmLuIPA8a64jjeD/u7rFXkqejL3E9JaH9W8pbfTmSk/jgmfe', 'ho' => 'Tran', 'tendem' => 'Thi', 'ten' => 'Minh', 'gioitinh' => 'Nam', 'ngaysinh' => '1975-12-05', 'diachi' => 'Ho Chi Minh', 'sdt' => '0987654321', 'email' => 'tran.minh@example.com', 'ngayvaolam' => '2018-06-15', 'trangthai' => 'dang_lam', 'role' => 'nhanvien', 'ghichu' => 'Quan ly phong', 'created_at' => '2025-11-02 04:13:51', 'updated_at' => '2025-12-19 17:25:01'],
            ['nhanvien_id' => 3, 'password' => '$2y$10$14TzzgK9p6mkF9uEpp3Ok.Gv1uMZCW1cxXcnKvJFdqVWhp3ruqoD.', 'ho' => 'Trần', 'tendem' => 'Quốc', 'ten' => 'Khánh', 'gioitinh' => 'Nam', 'ngaysinh' => '2004-09-02', 'diachi' => 'STU 180 Cao Lỗ, Quận 8', 'sdt' => '0124456', 'email' => 'du122o@maily.org', 'ngayvaolam' => '2025-12-10', 'trangthai' => 'dang_lam', 'role' => 'admin', 'ghichu' => '4444', 'created_at' => '2025-12-10 04:17:10', 'updated_at' => '2025-12-13 09:40:23'],
            ['nhanvien_id' => 4, 'password' => '$2y$10$9r.i.KweRIKcnttc7Dv7OugPiRtHYaGa9fE16N6efmi3q.WAAeJPC', 'ho' => 'sà', 'tendem' => 'sfds', 'ten' => 'fdsf', 'gioitinh' => 'Nam', 'ngaysinh' => '2025-12-05', 'diachi' => 'ddđ', 'sdt' => '243254', 'email' => 'qkhanh12.duration060@passinbox.com', 'ngayvaolam' => '2025-12-26', 'trangthai' => 'dang_lam', 'role' => 'nhanvien', 'ghichu' => NULL, 'created_at' => '2025-12-10 04:17:10', 'updated_at' => '2025-12-10 10:18:41'],
            ['nhanvien_id' => 5, 'password' => '$2y$10$gtS3Zx7jgreuG1qOKw1TZOPoTKbIoGLEad/gFeqBQONT/.h6Vrga2', 'ho' => '343', 'tendem' => '5345', 'ten' => '5345435', 'gioitinh' => 'Nu', 'ngaysinh' => '2025-12-22', 'diachi' => '324', 'sdt' => '345435', 'email' => 'nhixinh.traps404@passfwd.com', 'ngayvaolam' => '2025-12-13', 'trangthai' => 'dang_lam', 'role' => 'nhanvien', 'ghichu' => '34', 'created_at' => '2025-12-13 09:43:43', 'updated_at' => '2025-12-13 09:43:43'],
        ]);
    }
}
