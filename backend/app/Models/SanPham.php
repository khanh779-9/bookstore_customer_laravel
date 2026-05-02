<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'data_json',
    ];

    protected $casts = [
        'gia' => 'decimal:3',
        'soluongton' => 'integer',
        'soluongban' => 'integer',
        'danhmucSP_id' => 'integer',
        'donvitinh_id' => 'integer',
        'nhacungcap_id' => 'integer',
        'data_json' => 'array',
    ];

    protected $appends = [
        'ten_hien_thi',
    ];

    // ── Relationships ────────────────────────────────────

    public function sach(): HasOne
    {
        return $this->hasOne(Sach::class, 'sanpham_id', 'sanpham_id');
    }



    public function danhMuc(): BelongsTo
    {
        return $this->belongsTo(DanhMucSanPham::class, 'danhmucSP_id', 'danhmucSP_id');
    }

    public function donViTinh(): BelongsTo
    {
        return $this->belongsTo(DonViTinh::class, 'donvitinh_id', 'donvitinh_id');
    }

    public function nhaCungCap(): BelongsTo
    {
        return $this->belongsTo(NhaCungCap::class, 'nhacungcap_id', 'nhacungcap_id');
    }

    public function chiTietKhuyenMai(): HasMany
    {
        return $this->hasMany(ChiTietKhuyenMai::class, 'sanpham_id', 'sanpham_id');
    }

    public function danhGia(): HasMany
    {
        return $this->hasMany(DanhGia::class, 'sanpham_id', 'sanpham_id');
    }

    // ── Accessors ────────────────────────────────────────

    public function getGiaKhuyenMaiAttribute(): float
    {
        $promo = $this->chiTietKhuyenMai()
            ->whereHas('khuyenMai', function($query) {
                $query->where('ngaybatdau', '<=', now())
                      ->where('ngayketthuc', '>=', now());
            })
            ->first();

        if ($promo) {
            return (float) ($this->gia * (1 - $promo->tilegiamgia / 100));
        }

        return (float) $this->gia;
    }

    public function getTenHienThiAttribute(): string
    {
        return $this->tenSP ?: 'Sản phẩm #' . $this->sanpham_id;
    }

    // ── Scopes ───────────────────────────────────────────

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

        if (!empty($filters['loaisach_code'])) {
            $query->whereHas('sach', fn($q) => $q->where('loaisach_code', $filters['loaisach_code']));
        }

        if (!empty($filters['min'])) {
            $query->where('gia', '>=', $filters['min']);
        }

        if (!empty($filters['max'])) {
            $query->where('gia', '<=', $filters['max']);
        }

        // Lọc theo các thuộc tính trong data_json
        if (!empty($filters['attr']) && is_array($filters['attr'])) {
            foreach ($filters['attr'] as $key => $value) {
                if ($value !== null && $value !== '') {
                    $query->where("data_json->$key", $value);
                }
            }
        }

        $sortBy = $filters['sort_by'] ?? 'newest';
        switch ($sortBy) {
            case 'price_asc': $query->orderBy('gia'); break;
            case 'price_desc': $query->orderByDesc('gia'); break;
            case 'best_selling': $query->orderByDesc('soluongban'); break;
            default: $query->orderByDesc('sanpham_id'); break;
        }

        if (!empty($filters['promoted_only'])) {
            $query->whereHas('chiTietKhuyenMai', function($q) {
                $q->whereHas('khuyenMai', function($kq) {
                    $kq->where('ngaybatdau', '<=', now())
                       ->where('ngayketthuc', '>=', now());
                });
            });
        }

        if (!empty($filters['in_stock_only'])) {
            $query->where('soluongton', '>', 0);
        }

        return $query;
    }

    // ── Helpers ──────────────────────────────────────────

    public function hasStock(int $quantity): bool
    {
        return $this->soluongton >= $quantity;
    }
}
