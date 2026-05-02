<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('thongbao', function (Blueprint $table) {
            $table->id('thongbao_id');
            $table->unsignedBigInteger('khachhang_id')->nullable();
            $table->unsignedBigInteger('nhanvien_id')->nullable();
            $table->text('tieu_de');
            $table->text('noi_dung');
            $table->timestamp('ngay_tao')->useCurrent()->useCurrentOnUpdate();
            $table->enum('loai', ['khach_hang', 'don_hang', 'he_thong', 'noi_bo', ''])->default('');
            $table->enum('trang_thai', ['da_doc', 'chua_doc', 'luu_tru', ''])->default('chua_doc');
            $table->timestamps();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade');
            $table->foreign('nhanvien_id')->references('nhanvien_id')->on('nhanvien')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('thongbao');
    }
};
