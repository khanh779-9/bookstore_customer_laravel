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

    public function sanPham()
    {
        return $this->belongsTo(SanPham::class, 'sanpham_id', 'sanpham_id');
    }

    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'khachhang_id', 'khachhang_id');
    }

    public static function toggle(int $customerId, int $productId): string
    {
        $existing = self::where('khachhang_id', $customerId)->where('sanpham_id', $productId)->first();
        if ($existing) {
            $existing->delete();
            return 'removed';
        }

        self::create([
            'khachhang_id' => $customerId,
            'sanpham_id' => $productId,
            'ngaythem' => now(),
        ]);
        return 'added';
    }
}
