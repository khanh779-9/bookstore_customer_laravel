<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HoaDon extends Model
{
    use HasFactory;

    protected $table = 'hoadon';

    protected $primaryKey = 'hoadon_id';

    public $timestamps = false;

    protected $fillable = [
        'khachhang_id',
        'nhanvien_id',
        'dcgh_id',
        'ngaytao',
        'tongtien',
        'trangthai',
        'phuongthuc_thanhtoan',
        'ghichu',
    ];

    protected $casts = [
        'tongtien' => 'decimal:2',
    ];

    public function chiTiet(): HasMany
    {
        return $this->hasMany(ChiTietHoaDon::class, 'hoadon_id', 'hoadon_id');
    }
}
