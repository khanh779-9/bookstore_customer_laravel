<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chitietkhuyenmai', function (Blueprint $table) {
            $table->integer('ctkm_id', true);
            $table->integer('khuyenmai_id')->nullable();
            $table->integer('sanpham_id')->nullable();
            $table->integer('soluong')->nullable();
            $table->decimal('tilegiamgia', 5, 2)->nullable();

            $table->foreign('khuyenmai_id')->references('khuyenmai_id')->on('khuyenmai')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('danhgia', function (Blueprint $table) {
            $table->integer('danhgia_id', true);
            $table->integer('khachhang_id');
            $table->integer('sanpham_id');
            $table->tinyInteger('rating');
            $table->text('binhluan')->nullable();
            $table->timestamp('ngaytao')->useCurrent();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('sanphamyeuthich', function (Blueprint $table) {
            $table->integer('spyt_id', true);
            $table->integer('khachhang_id');
            $table->integer('sanpham_id');
            $table->timestamp('ngaythem')->useCurrent();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('thongbao', function (Blueprint $table) {
            $table->integer('thongbao_id', true);
            $table->integer('khachhang_id');
            $table->text('tieu_de');
            $table->text('noi_dung');
            $table->timestamp('ngay_tao')->useCurrent()->useCurrentOnUpdate();
            $table->enum('loai', ['khach_hang', 'don_hang', 'he_thong', 'khuyen_mai', ''])->default('');
            $table->enum('trang_thai', ['da_doc', 'chua_doc', 'luu_tru', ''])->default('chua_doc');

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('token', 64)->unique();
            $table->text('abilities')->nullable();
            $table->unsignedBigInteger('tokenable_id');
            $table->string('tokenable_type');
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->index(['tokenable_id', 'tokenable_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('personal_access_tokens');
        Schema::dropIfExists('thongbao');
        Schema::dropIfExists('sanphamyeuthich');
        Schema::dropIfExists('danhgia');
        Schema::dropIfExists('chitietkhuyenmai');
    }
};
