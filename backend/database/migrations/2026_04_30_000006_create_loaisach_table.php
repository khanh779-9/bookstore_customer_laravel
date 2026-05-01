<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loaisach', function (Blueprint $table) {
            $table->string('loaisach_code', 50)->primary();
            $table->string('tenLoaiSach', 100);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loaisach');
    }
};
