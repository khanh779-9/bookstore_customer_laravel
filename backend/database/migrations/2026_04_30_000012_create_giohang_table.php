<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('giohang', function (Blueprint $table) {
            $table->id('giohang_id');
            $table->unsignedBigInteger('khachhang_id')->nullable();
            $table->timestamp('ngaytao')->useCurrent();
            $table->integer('soluong');
            $table->timestamps();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('giohang');
    }
};
