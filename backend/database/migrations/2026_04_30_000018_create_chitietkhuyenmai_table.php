<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chitietkhuyenmai', function (Blueprint $table) {
            $table->id('ctkm_id');
            $table->unsignedBigInteger('khuyenmai_id')->nullable();
            $table->unsignedBigInteger('sanpham_id')->nullable();
            $table->integer('soluong')->nullable();
            $table->decimal('tilegiamgia', 5, 2)->nullable();
            $table->timestamps();

            $table->foreign('khuyenmai_id')->references('khuyenmai_id')->on('khuyenmai')->onDelete('cascade');
            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chitietkhuyenmai');
    }
};
