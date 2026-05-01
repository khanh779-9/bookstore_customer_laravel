<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vanphongpham', function (Blueprint $table) {
            $table->id('vpp_id');
            $table->unsignedBigInteger('sanpham_id')->nullable();
            $table->timestamps();

            $table->foreign('sanpham_id')->references('sanpham_id')->on('sanpham')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vanphongpham');
    }
};
