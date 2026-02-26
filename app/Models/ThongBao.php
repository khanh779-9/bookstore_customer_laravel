<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThongBao extends Model
{
    use HasFactory;

    protected $table = 'thongbao';
    protected $primaryKey = 'thongbao_id';
    public $timestamps = false;

    protected $fillable = [
        'khachhang_id', 'tieu_de', 'noi_dung', 'ngay_tao', 'loai', 'trang_thai',
    ];
}
