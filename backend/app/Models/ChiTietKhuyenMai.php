<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietKhuyenMai extends Model
{
    use HasFactory;

    protected $table = 'chitietkhuyenmai';
    protected $primaryKey = 'ctkm_id';
    protected $fillable = [
        'khuyenmai_id', 'sanpham_id', 'soluong', 'tilegiamgia',
    ];

    public function khuyenMai()
    {
        return $this->belongsTo(KhuyenMai::class, 'khuyenmai_id', 'khuyenmai_id');
    }

    public function sanPham()
    {
        return $this->belongsTo(SanPham::class, 'sanpham_id', 'sanpham_id');
    }
}
