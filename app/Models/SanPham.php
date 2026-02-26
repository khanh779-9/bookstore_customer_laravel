<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SanPham extends Model
{
    use HasFactory;

    protected $table = 'sanpham';

    protected $primaryKey = 'sanpham_id';

    public $timestamps = false;

    protected $fillable = [
        'danhmucSP_id',
        'hinhanh',
        'mo_ta',
        'soluongton',
        'donvitinh_id',
        'soluongban',
        'gia',
        'nhacungcap_id',
    ];

    protected $casts = [
        'gia' => 'decimal:3',
    ];

    protected $appends = [
        'ten_hien_thi',
    ];

    public function sach(): HasOne
    {
        return $this->hasOne(Sach::class, 'sanpham_id', 'sanpham_id');
    }

    public function vanPhongPham(): HasOne
    {
        return $this->hasOne(VanPhongPham::class, 'sanpham_id', 'sanpham_id');
    }

    public function getTenHienThiAttribute(): string
    {
        if ($this->relationLoaded('sach') && $this->sach && $this->sach->tenSach) {
            return $this->sach->tenSach;
        }

        if ($this->relationLoaded('vanPhongPham') && $this->vanPhongPham && $this->vanPhongPham->tenVPP) {
            return $this->vanPhongPham->tenVPP;
        }

        return 'Sản phẩm #' . $this->sanpham_id;
    }
}
