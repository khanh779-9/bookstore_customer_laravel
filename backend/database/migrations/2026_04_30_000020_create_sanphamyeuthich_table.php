<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sanphamyeuthich', function (Blueprint $table) {
            $table->id('spyt_id');
            $table->unsignedBigInteger('khachhang_id');
            $table->unsignedBigInteger('sanpham_id');
            $table->timestamp('ngaythem')->useCurrent();
            $table->timestamps();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade');
            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade');
            $table->unique(['khachhang_id', 'sanpham_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sanphamyeuthich');
    }
};
