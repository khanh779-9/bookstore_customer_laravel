<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nhacungcap', function (Blueprint $table) {
            $table->id('nhacungcap_id');
            $table->string('ten', 100)->nullable();
            $table->string('diachi', 255)->nullable();
            $table->string('sdt', 20)->nullable();
            $table->string('email', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nhacungcap');
    }
};
