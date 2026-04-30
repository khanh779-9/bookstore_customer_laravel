<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('giohang', function (Blueprint $table) {
            $table->integer('giohang_id', true);
            $table->integer('khachhang_id')->nullable();
            $table->timestamp('ngaytao')->useCurrent();
            $table->integer('soluong');

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('chitietgiohang', function (Blueprint $table) {
            $table->integer('ctgh_id', true);
            $table->integer('giohang_id')->nullable();
            $table->integer('sanpham_id')->nullable();
            $table->integer('soluong')->nullable();
            $table->decimal('dongia', 9, 3);
            $table->decimal('thanhtien', 9, 3);

            $table->foreign('giohang_id')->references('giohang_id')->on('giohang')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('diachi_giaohang', function (Blueprint $table) {
            $table->integer('dcgh_id', true);
            $table->integer('khachhang_id');
            $table->text('diachi');

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('hoadon', function (Blueprint $table) {
            $table->integer('hoadon_id', true);
            $table->integer('khachhang_id')->nullable();
            $table->integer('nhanvien_id')->nullable();
            $table->integer('dcgh_id')->nullable();
            $table->timestamp('ngaytao')->useCurrent();
            $table->decimal('tongtien', 15, 2)->nullable();
            $table->enum('trangthai', ['cho_xac_nhan', 'da_xac_nhan', 'dang_giao_hang', 'da_giao_hang', 'da_huy'])->default('cho_xac_nhan');
            $table->enum('phuongthuc_thanhtoan', ['tien_mat', 'chuyen_khoan', 'vi_dien_tu'])->default('tien_mat');
            $table->text('ghichu')->nullable();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('nhanvien_id')->references('nhanvien_id')->on('nhanvien')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('dcgh_id')->references('dcgh_id')->on('diachi_giaohang')->onDelete('set null')->onUpdate('cascade');
        });

        Schema::create('chitiethoadon', function (Blueprint $table) {
            $table->integer('cthd_id', true);
            $table->integer('hoadon_id')->nullable();
            $table->integer('sanpham_id')->nullable();
            $table->integer('soluong')->nullable();
            $table->decimal('dongia', 15, 2)->nullable();
            $table->decimal('thanhtien', 15, 2)->nullable();

            $table->foreign('hoadon_id')->references('hoadon_id')->on('hoadon')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chitiethoadon');
        Schema::dropIfExists('hoadon');
        Schema::dropIfExists('diachi_giaohang');
        Schema::dropIfExists('chitietgiohang');
        Schema::dropIfExists('giohang');
    }
};
