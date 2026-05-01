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
            $table->unsignedBigInteger('khachhang_id');
            $table->text('tieu_de');
            $table->text('noi_dung');
            $table->timestamp('ngay_tao')->useCurrent()->useCurrentOnUpdate();
            $table->enum('loai', ['khach_hang', 'don_hang', 'he_thong', 'khuyen_mai', ''])->default('');
            $table->enum('trang_thai', ['da_doc', 'chua_doc', 'luu_tru', '']).default('chua_doc');
            $table->timestamps();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('thongbao');
    }
};
