<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sach', function (Blueprint $table) {
            $table->id('sach_id');
            $table->unsignedBigInteger('sanpham_id')->nullable();
            $table->string('tenSach', 255)->nullable();
            $table->unsignedBigInteger('nhaxuatban_id')->nullable();
            $table->year('namXB')->nullable();
            $table->unsignedBigInteger('tacgia_id')->nullable();
            $table->string('loaisach_code', 50)->nullable();
            $table->timestamps();

            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade');
            $table->foreign('nhaxuatban_id')->references('nhaxuatban_id')->on('nhaxuatban')->onDelete('set null');
            $table->foreign('tacgia_id')->references('tacgia_id')->on('tacgia')->onDelete('set null');
            $table->foreign('loaisach_code')->references('loaisach_code')->on('loaisach')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sach');
    }
};
