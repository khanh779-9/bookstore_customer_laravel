<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanPhamYeuThich extends Model
{
    use HasFactory;

    protected $table = 'sanphamyeuthich';
    protected $primaryKey = 'spyt_id';
    public $timestamps = false;

    protected $fillable = [
        'khachhang_id',
        'sanpham_id',
        'ngaythem',
    ];
}
