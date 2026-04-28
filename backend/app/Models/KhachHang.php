<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class KhachHang extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'khachhang';
    protected $primaryKey = 'khachhang_id';
    public $timestamps = false;

    protected $fillable = [
        'password', 'ho', 'tendem', 'ten', 'ngaysinh', 'diachi', 'sdt', 'email', 'gioitinh', 'ngaythamgia',
    ];

    protected $hidden = [
        'password',
    ];

    public function getHoTenAttribute(): string
    {
        return trim("{$this->ho} {$this->tendem} {$this->ten}");
    }

    public function getTenHienThiAttribute(): string
    {
        return $this->ten ?: $this->email;
    }

    public function scopeByEmail($query, string $email)
    {
        return $query->where('email', $email);
    }
}
