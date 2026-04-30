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

    const STATUS_PENDING_PAYMENT = 'cho_thanh_toan';
    const STATUS_PENDING_CONFIRMATION = 'cho_xac_nhan';
    const STATUS_CONFIRMED = 'da_xac_nhan';
    const STATUS_SHIPPING = 'dang_giao_hang';
    const STATUS_DELIVERED = 'da_giao_hang';
    const STATUS_CANCELLED = 'da_huy';

    public function chiTiet(): HasMany
    {
        return $this->hasMany(ChiTietHoaDon::class, 'hoadon_id', 'hoadon_id');
    }

    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'khachhang_id', 'khachhang_id');
    }

    public function diaChi()
    {
        return $this->belongsTo(DiaChiGiaoHang::class, 'dcgh_id', 'dcgh_id');
    }

    public function nhanVien()
    {
        return $this->belongsTo(NhanVien::class, 'nhanvien_id', 'nhanvien_id');
    }
}
