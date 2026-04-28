<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietGioHang extends Model
{
    use HasFactory;

    protected $table = 'chitietgiohang';
    protected $primaryKey = 'ctgh_id';
    public $timestamps = false;

    protected $fillable = [
        'giohang_id',
        'sanpham_id',
        'soluong',
        'dongia',
        'thanhtien',
    ];

    public function gioHang()
    {
        return $this->belongsTo(GioHang::class, 'giohang_id', 'giohang_id');
    }

    public function sanPham()
    {
        return $this->belongsTo(SanPham::class, 'sanpham_id', 'sanpham_id');
    }
}
