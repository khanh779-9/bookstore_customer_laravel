<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('khuyenmai', function (Blueprint $table) {
            $table->id('khuyenmai_id');
            $table->string('ten', 100)->nullable();
            $table->date('ngaybatdau')->nullable();
            $table->date('ngayketthuc')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('khuyenmai');
    }
};
