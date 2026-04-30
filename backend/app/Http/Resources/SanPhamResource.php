<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SanPhamResource extends JsonResource
{
    /**
     * Cache wishlist IDs for the current request to avoid N+1.
     */
    protected static $wishlistIds = null;

    public function toArray(Request $request): array
    {
        if (self::$wishlistIds === null) {
            $user = $request->user() ?? auth('sanctum')->user();
            if ($user && $user->khachhang_id) {
                self::$wishlistIds = \Illuminate\Support\Facades\DB::table('sanphamyeuthich')
                    ->where('khachhang_id', $user->khachhang_id)
                    ->pluck('sanpham_id')
                    ->all();
            } else {
                self::$wishlistIds = [];
            }
        }

        return [
            'id' => $this->sanpham_id,
            'is_wishlisted' => in_array($this->sanpham_id, self::$wishlistIds),
            'name' => $this->tenSP ?: ($this->relationLoaded('sach') ? $this->sach->tenSach : null),
            'display_name' => $this->ten_hien_thi,
            'category_id' => $this->danhmucSP_id,
            'category_name' => $this->danhMuc->tenDanhMuc ?? null,
            'image' => $this->hinhanh,
            'description' => $this->mo_ta,
            'stock_quantity' => $this->soluongton,
            'sold_quantity' => $this->soluongban,
            'price' => (float) $this->gia,
            'promo_price' => (float) $this->gia_khuyen_mai,
            'unit' => $this->donViTinh->ten ?? null,
            'provider' => $this->nhaCungCap->ten ?? null,
            
            // Relationships (conditional)
            'book_details' => new SachResource($this->whenLoaded('sach')),
            'stationery_details' => $this->whenLoaded('vanPhongPham'),
            
            // Stats
            'avg_rating' => (float) ($this->avg_rating ?? 0),
            'total_reviews' => (int) ($this->total_reviews ?? 0),
        ];
    }
}
