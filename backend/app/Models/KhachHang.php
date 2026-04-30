<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class KhachHang extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'khachhang';
    protected $primaryKey = 'khachhang_id';
    public $timestamps = false;

    protected $fillable = [
        'password', 
        'ho', 
        'tendem', 
        'ten', 
        'ngaysinh', 
        'diachi', 
        'sdt', 
        'email', 
        'gioitinh', 
        'ngaythamgia',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'ngaysinh' => 'date',
        'ngaythamgia' => 'datetime',
    ];

    // ── Relationships ────────────────────────────────────

    public function hoaDon(): HasMany
    {
        return $this->hasMany(HoaDon::class, 'khachhang_id', 'khachhang_id');
    }

    public function diaChiGiaoHang(): HasMany
    {
        return $this->hasMany(DiaChiGiaoHang::class, 'khachhang_id', 'khachhang_id');
    }

    public function danhGia(): HasMany
    {
        return $this->hasMany(DanhGia::class, 'khachhang_id', 'khachhang_id');
    }

    public function sanPhamYeuThich(): HasMany
    {
        return $this->hasMany(SanPhamYeuThich::class, 'khachhang_id', 'khachhang_id');
    }

    // ── Accessors ────────────────────────────────────────

    public function getHoTenAttribute(): string
    {
        return trim("{$this->ho} {$this->tendem} {$this->ten}");
    }

    public function getTenHienThiAttribute(): string
    {
        return $this->ten ?: $this->email;
    }
}
