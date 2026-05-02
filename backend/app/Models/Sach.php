<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sach extends Model
{
    use HasFactory;

    protected $table = 'sach';

    protected $primaryKey = 'sach_id';

    public $timestamps = false;

    protected $fillable = [
        'sanpham_id',
        'nhaxuatban_id',
        'namXB',
        'tacgia_id',
        'loaisach_code',
    ];

    public function sanpham()
    {
        return $this->belongsTo(SanPham::class, 'sanpham_id', 'sanpham_id');
    }

    public function tacgia()
    {
        return $this->belongsTo(TacGia::class, 'tacgia_id', 'tacgia_id');
    }

    public function loaisach()
    {
        return $this->belongsTo(LoaiSach::class, 'loaisach_code', 'loaisach_code');
    }

    public function nhaxuatban()
    {
        return $this->belongsTo(NhaXuatBan::class, 'nhaxuatban_id', 'nhaxuatban_id');
    }
}
