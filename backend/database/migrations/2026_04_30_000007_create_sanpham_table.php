<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sanpham', function (Blueprint $table) {
            $table->id('sanpham_id');
            $table->string('tenSP', 255);
            $table->unsignedBigInteger('danhmucSP_id')->nullable();
            $table->string('hinhanh', 255)->nullable();
            $table->text('mo_ta')->nullable();
            $table->integer('soluongton')->default(0);
            $table->unsignedBigInteger('donvitinh_id')->nullable();
            $table->integer('soluongban')->default(0);
            $table->decimal('gia', 9, 3);
            $table->unsignedBigInteger('nhacungcap_id');
            $table->timestamps();

            $table->foreign('danhmucSP_id')->references('danhmucSP_id')->on('danhmucsanpham')->onDelete('set null');
            $table->foreign('donvitinh_id')->references('donvitinh_id')->on('donvitinh')->onDelete('set null');
            $table->foreign('nhacungcap_id')->references('nhacungcap_id')->on('nhacungcap')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sanpham');
    }
};
