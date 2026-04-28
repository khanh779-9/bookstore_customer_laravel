<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiaChiGiaoHang extends Model
{
    use HasFactory;

    protected $table = 'diachi_giaohang';
    protected $primaryKey = 'dcgh_id';
    public $timestamps = false;

    protected $fillable = [
        'khachhang_id',
        'diachi',
    ];

    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'khachhang_id', 'khachhang_id');
    }
}
