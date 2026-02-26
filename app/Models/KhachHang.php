<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhachHang extends Model
{
    use HasFactory;

    protected $table = 'khachhang';
    protected $primaryKey = 'khachhang_id';
    public $timestamps = false;

    protected $fillable = [
        'password', 'ho', 'tendem', 'ten', 'ngaysinh', 'diachi', 'sdt', 'email', 'gioitinh', 'ngaythamgia',
    ];
}
