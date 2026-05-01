<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hoadon', function (Blueprint $table) {
            $table->id('hoadon_id');
            $table->unsignedBigInteger('khachhang_id')->nullable();
            $table->unsignedBigInteger('nhanvien_id')->nullable();
            $table->unsignedBigInteger('dcgh_id')->nullable();
            $table->timestamp('ngaytao')->useCurrent();
            $table->decimal('tongtien', 15, 2)->nullable();
            $table->enum('trangthai', ['cho_xac_nhan', 'da_xac_nhan', 'dang_giao_hang', 'da_giao_hang', 'da_huy'])->default('cho_xac_nhan');
            $table->enum('phuongthuc_thanhtoan', ['tien_mat', 'chuyen_khoan', 'vi_dien_tu'])->default('tien_mat');
            $table->text('ghichu')->nullable();
            $table->timestamps();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade');
            $table->foreign('nhanvien_id')->references('nhanvien_id')->on('nhanvien')->onDelete('set null');
            $table->foreign('dcgh_id')->references('dcgh_id')->on('diachi_giaohang')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hoadon');
    }
};
