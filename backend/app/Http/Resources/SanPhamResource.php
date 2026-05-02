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
            'sanpham_id' => $this->sanpham_id,
            'id' => $this->sanpham_id,
            'is_wishlisted' => in_array($this->sanpham_id, self::$wishlistIds),
            'tenSP' => $this->tenSP,
            'name' => $this->tenSP ?: ($this->relationLoaded('sach') && $this->sach ? $this->sach->tenSach : null),
            'display_name' => $this->ten_hien_thi,
            'danhmucSP_id' => $this->danhmucSP_id,
            'category_id' => $this->danhmucSP_id,
            'category_name' => $this->danhMuc->tenDanhMuc ?? null,
            'hinhanh' => $this->hinhanh,
            'image' => $this->hinhanh,
            'mo_ta' => $this->mo_ta,
            'description' => $this->mo_ta,
            'soluongton' => $this->soluongton,
            'stock_quantity' => $this->soluongton,
            'soluongban' => $this->soluongban,
            'sold_quantity' => $this->soluongban,
            'gia' => (float) $this->gia,
            'price' => (float) $this->gia,
            'promo_price' => (float) $this->gia_khuyen_mai,
            'unit' => $this->donViTinh->ten ?? null,
            'provider' => $this->nhaCungCap->ten ?? null,
            
            // Relationships (conditional)
            'sach' => new SachResource($this->whenLoaded('sach')),
            'book_details' => new SachResource($this->whenLoaded('sach')),
            'metadata' => $this->data_json,
            'attributes' => $this->data_json,
            
            // Stats
            'avg_rating' => (float) ($this->avg_rating ?? 0),
            'total_reviews' => (int) ($this->total_reviews ?? 0),
        ];
    }
}
