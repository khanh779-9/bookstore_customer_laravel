<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhanVien extends Model
{
    use HasFactory;

    protected $table = 'nhanvien';
    protected $primaryKey = 'nhanvien_id';
    public $timestamps = false;

    protected $fillable = [
        'password', 'ho', 'tendem', 'ten', 'gioitinh', 'ngaysinh', 'diachi', 'sdt', 'email',
        'ngayvaolam', 'trangthai', 'role', 'ghichu',
    ];
}
