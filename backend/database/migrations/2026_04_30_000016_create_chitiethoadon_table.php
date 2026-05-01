<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chitiethoadon', function (Blueprint $table) {
            $table->id('cthd_id');
            $table->unsignedBigInteger('hoadon_id')->nullable();
            $table->unsignedBigInteger('sanpham_id')->nullable();
            $table->integer('soluong')->nullable();
            $table->decimal('dongia', 15, 2)->nullable();
            $table->decimal('thanhtien', 15, 2)->nullable();
            $table->timestamps();

            $table->foreign('hoadon_id')->references('hoadon_id')->on('hoadon')->onDelete('cascade');
            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chitiethoadon');
    }
};
