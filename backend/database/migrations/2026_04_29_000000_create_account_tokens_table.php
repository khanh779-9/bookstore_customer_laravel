<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('account_tokens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('khachhang_id');
            $table->string('token', 255)->unique();
            $table->string('device')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->foreign('khachhang_id')->references('khachhang_id')->on('khachhang')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('account_tokens');
    }
};
