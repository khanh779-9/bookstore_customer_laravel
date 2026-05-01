<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nhanvien', function (Blueprint $table) {
            $table->id('nhanvien_id');
            $table->string('password', 255)->nullable();
            $table->string('ho', 50);
            $table->string('tendem', 50)->nullable();
            $table->string('ten', 50);
            $table->enum('gioitinh', ['Nam', 'Nu', 'Khac'])->nullable();
            $table->date('ngaysinh')->nullable();
            $table->string('diachi', 255)->nullable();
            $table->string('sdt', 15)->nullable();
            $table->string('email', 100)->nullable()->unique();
            $table->date('ngayvaolam')->nullable();
            $table->enum('trangthai', ['dang_lam', 'nghi_viec', 'tam_nghi'])->default('dang_lam');
            $table->enum('role', ['admin', 'quanly', 'nhanvien'])->default('nhanvien');
            $table->text('ghichu')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nhanvien');
    }
};
