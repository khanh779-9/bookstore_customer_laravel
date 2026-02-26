<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhGia extends Model
{
    use HasFactory;

    protected $table = 'danhgia';
    protected $primaryKey = 'danhgia_id';
    public $timestamps = false;

    protected $fillable = [
        'khachhang_id',
        'sanpham_id',
        'rating',
        'binhluan',
        'ngaytao',
    ];
}
