<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('danhmucsanpham', function (Blueprint $table) {
            $table->integer('danhmucSP_id', true);
            $table->string('tenDanhMuc', 100);
            $table->text('mo_ta')->nullable();
        });

        Schema::create('donvitinh', function (Blueprint $table) {
            $table->integer('donvitinh_id', true);
            $table->string('ten', 50)->nullable();
        });

        Schema::create('nhacungcap', function (Blueprint $table) {
            $table->integer('nhacungcap_id', true);
            $table->string('ten', 100)->nullable();
            $table->string('diachi', 255)->nullable();
            $table->string('sdt', 20)->nullable();
            $table->string('email', 100)->nullable();
        });

        Schema::create('nhaxuatban', function (Blueprint $table) {
            $table->integer('nhaxuatban_id', true);
            $table->string('ten', 100)->nullable();
            $table->string('diachi', 255)->nullable();
            $table->string('sdt', 20)->nullable();
            $table->string('email', 100)->nullable();
        });

        Schema::create('tacgia', function (Blueprint $table) {
            $table->integer('tacgia_id', true);
            $table->string('ho', 50);
            $table->string('tendem', 50)->nullable();
            $table->string('ten', 50);
            $table->string('diachi', 255)->nullable();
            $table->string('sdt', 15)->nullable();
            $table->string('email', 100)->nullable();
        });

        Schema::create('loaisach', function (Blueprint $table) {
            $table->enum('loaisach_code', ['vat_ly','hoahoc','giaokhoa','kythuat','kinhte','ngoaingu','phapluat','tudien','loaimoi','tinhoc','toanhoc','thethao_dulich','vanhoc','vanhoa_xahoi'])->primary();
            $table->string('tenLoaiSach', 100);
        });

        Schema::create('khachhang', function (Blueprint $table) {
            $table->integer('khachhang_id', true);
            $table->text('password')->nullable();
            $table->string('ho', 50);
            $table->string('tendem', 50)->nullable();
            $table->string('ten', 50);
            $table->date('ngaysinh')->nullable();
            $table->string('diachi', 255)->nullable();
            $table->string('sdt', 15)->nullable();
            $table->string('email', 100)->nullable();
            $table->enum('gioitinh', ['Nam', 'Nu', 'Khac'])->nullable();
            $table->timestamp('ngaythamgia')->useCurrent();
        });

        Schema::create('nhanvien', function (Blueprint $table) {
            $table->integer('nhanvien_id', true);
            $table->string('password', 255)->nullable();
            $table->string('ho', 50);
            $table->string('tendem', 50)->nullable();
            $table->string('ten', 50);
            $table->enum('gioitinh', ['Nam', 'Nu', 'Khac'])->nullable();
            $table->date('ngaysinh')->nullable();
            $table->string('diachi', 255)->nullable();
            $table->string('sdt', 15)->nullable();
            $table->string('email', 100)->nullable()->unique();
            $table->date('ngayvaolam')->nullable()->default(now());
            $table->enum('trangthai', ['dang_lam', 'nghi_viec', 'tam_nghi'])->default('dang_lam');
            $table->enum('role', ['admin', 'quanly', 'nhanvien'])->default('nhanvien');
            $table->text('ghichu')->nullable();
            $table->timestamps();
        });

        Schema::create('khuyenmai', function (Blueprint $table) {
            $table->integer('khuyenmai_id', true);
            $table->string('ten', 100)->nullable();
            $table->date('ngaybatdau')->nullable();
            $table->date('ngayketthuc')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('khuyenmai');
        Schema::dropIfExists('nhanvien');
        Schema::dropIfExists('khachhang');
        Schema::dropIfExists('loaisach');
        Schema::dropIfExists('tacgia');
        Schema::dropIfExists('nhaxuatban');
        Schema::dropIfExists('nhacungcap');
        Schema::dropIfExists('donvitinh');
        Schema::dropIfExists('danhmucsanpham');
    }
};
