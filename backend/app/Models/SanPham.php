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
        'tenSP',
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

    public function danhMuc()
    {
        return $this->belongsTo(DanhMucSanPham::class, 'danhmucSP_id', 'danhmucSP_id');
    }

    public function donViTinh()
    {
        return $this->belongsTo(DonViTinh::class, 'donvitinh_id', 'donvitinh_id');
    }

    public function nhaCungCap()
    {
        return $this->belongsTo(NhaCungCap::class, 'nhacungcap_id', 'nhacungcap_id');
    }

    public function chiTietKhuyenMai()
    {
        return $this->hasMany(ChiTietKhuyenMai::class, 'sanpham_id', 'sanpham_id');
    }

    public function getActivePromotion()
    {
        return $this->chiTietKhuyenMai()
            ->whereHas('khuyenMai', fn($q) => $q->active())
            ->first();
    }

    public function getGiaKhuyenMaiAttribute(): float
    {
        $promo = $this->getActivePromotion();
        if ($promo) {
            return (float) ($this->gia * (1 - $promo->tilegiamgia / 100));
        }
        return (float) $this->gia;
    }

    public function getTenHienThiAttribute(): string
    {
        if ($this->tenSP) {
            return $this->tenSP;
        }

        if ($this->relationLoaded('sach') && $this->sach && $this->sach->tenSach) {
            return $this->sach->tenSach;
        }

        return 'Sản phẩm #' . $this->sanpham_id;
    }

    public function scopeFeatured($query, $limit = 8)
    {
        return $query->where('soluongton', '>', 0)
            ->orderByDesc('soluongban')
            ->limit($limit);
    }

    public function scopeNewArrivals($query, $limit = 8)
    {
        return $query->where('soluongton', '>', 0)
            ->orderByDesc('sanpham_id')
            ->limit($limit);
    }

    public function scopeBestSelling($query, $limit = 8)
    {
        return $query->where('soluongton', '>', 0)
            ->orderByDesc('soluongban')
            ->limit($limit);
    }

    public function scopeFilter($query, array $filters)
    {
        if (!empty($filters['q'])) {
            $keyword = $filters['q'];
            $query->where(function ($q) use ($keyword) {
                $q->where('tenSP', 'like', '%' . $keyword . '%')
                    ->orWhereHas('sach', fn($sq) => $sq->where('tenSach', 'like', '%' . $keyword . '%'));
            });
        }

        if (!empty($filters['danhmucSP_id'])) {
            $query->where('danhmucSP_id', $filters['danhmucSP_id']);
        }

        if (!empty($filters['provider_id'])) {
            $query->where('nhacungcap_id', $filters['provider_id']);
        }

        if (!empty($filters['publisher_id'])) {
            $query->whereHas('sach', fn($q) => $q->where('nhaxuatban_id', $filters['publisher_id']));
        }

        if (!empty($filters['min'])) {
            $query->where('gia', '>=', $filters['min']);
        }

        if (!empty($filters['max'])) {
            $query->where('gia', '<=', $filters['max']);
        }

        $sortBy = $filters['sort_by'] ?? 'newest';
        switch ($sortBy) {
            case 'price_asc': $query->orderBy('gia'); break;
            case 'price_desc': $query->orderByDesc('gia'); break;
            case 'best_selling': $query->orderByDesc('soluongban'); break;
            default: $query->orderByDesc('sanpham_id'); break;
        }

        return $query;
    }

    public function hasStock(int $quantity): bool
    {
        return $this->soluongton >= $quantity;
    }
}
