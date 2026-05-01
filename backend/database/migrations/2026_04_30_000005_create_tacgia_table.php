<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tacgia', function (Blueprint $table) {
            $table->id('tacgia_id');
            $table->string('ho', 50);
            $table->string('tendem', 50)->nullable();
            $table->string('ten', 50);
            $table->string('diachi', 255)->nullable();
            $table->string('sdt', 15)->nullable();
            $table->string('email', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tacgia');
    }
};
