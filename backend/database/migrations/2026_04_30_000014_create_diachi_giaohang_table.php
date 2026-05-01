<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('diachi_giaohang', function (Blueprint $table) {
            $table->id('dcgh_id');
            $table->unsignedBigInteger('khachhang_id');
            $table->text('diachi');
            $table->timestamps();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('diachi_giaohang');
    }
};
