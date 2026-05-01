<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chitietgiohang', function (Blueprint $table) {
            $table->id('ctgh_id');
            $table->unsignedBigInteger('giohang_id')->nullable();
            $table->unsignedBigInteger('sanpham_id')->nullable();
            $table->integer('soluong')->nullable();
            $table->decimal('dongia', 9, 3);
            $table->decimal('thanhtien', 9, 3);
            $table->timestamps();

            $table->foreign('giohang_id')->references('giohang_id')->on('giohang')->onDelete('cascade');
            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chitietgiohang');
    }
};
