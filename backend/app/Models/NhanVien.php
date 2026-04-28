<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class NhanVien extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'nhanvien';
    protected $primaryKey = 'nhanvien_id';
    public $timestamps = false;

    protected $fillable = [
        'password', 'ho', 'tendem', 'ten', 'gioitinh', 'ngaysinh', 'diachi', 'sdt', 'email',
        'ngayvaolam', 'trangthai', 'role', 'ghichu',
    ];

    protected $hidden = [
        'password',
    ];
}
