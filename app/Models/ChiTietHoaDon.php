<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietHoaDon extends Model
{
    use HasFactory;

    protected $table = 'chitiethoadon';

    protected $primaryKey = 'cthd_id';

    public $timestamps = false;

    protected $fillable = [
        'hoadon_id',
        'sanpham_id',
        'soluong',
        'dongia',
        'thanhtien',
    ];
}
