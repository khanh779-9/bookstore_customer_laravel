<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sanpham', function (Blueprint $table) {
            $table->integer('sanpham_id', true);
            $table->string('tenSP', 255);
            $table->integer('danhmucSP_id')->nullable();
            $table->string('hinhanh', 255)->nullable();
            $table->text('mo_ta')->nullable();
            $table->integer('soluongton')->default(0);
            $table->integer('donvitinh_id')->nullable();
            $table->integer('soluongban')->default(0);
            $table->decimal('gia', 9, 3);
            $table->integer('nhacungcap_id');

            $table->foreign('danhmucSP_id')->references('danhmucSP_id')->on('danhmucsanpham')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('donvitinh_id')->references('donvitinh_id')->on('donvitinh')->onDelete('set null')->onUpdate('cascade');
        });

        Schema::create('sach', function (Blueprint $table) {
            $table->integer('sach_id', true);
            $table->integer('sanpham_id')->nullable();
            $table->string('tenSach', 255)->nullable();
            $table->integer('nhaxuatban_id')->nullable();
            $table->year('namXB')->nullable();
            $table->integer('tacgia_id')->nullable();
            $table->enum('loaisach_code', ['giaokhoa','kythuat','kinhte','ngoaingu','phapluat','tudien','loaimoi','tinhoc','toanhoc','thethao_dulich','vanhoc','vanhoa_xahoi'])->nullable();

            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('nhaxuatban_id')->references('nhaxuatban_id')->on('nhaxuatban')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('tacgia_id')->references('tacgia_id')->on('tacgia')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('loaisach_code')->references('loaisach_code')->on('loaisach')->onDelete('set null')->onUpdate('cascade');
        });

        Schema::create('vanphongpham', function (Blueprint $table) {
            $table->integer('vpp_id', true);
            $table->integer('sanpham_id')->nullable();

            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vanphongpham');
        Schema::dropIfExists('sach');
        Schema::dropIfExists('sanpham');
    }
};
