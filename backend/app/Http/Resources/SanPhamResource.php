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
            'hinhanh' => $this->resolveImageUrl(),
            'image' => $this->resolveImageUrl(),
            'image_url' => $this->resolveImageUrl(),
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

    /**
     * Resolve the full image URL.
     * - OCI path (e.g. "products/xxx.jpg") → OCI public URL
     * - Full URL already → return as-is
     * - Local storage path → asset URL
     */
    private function resolveImageUrl(): ?string
    {
        if (!$this->hinhanh) return null;

        // Already a full URL
        if (filter_var($this->hinhanh, FILTER_VALIDATE_URL)) {
            return $this->hinhanh;
        }

        // OCI file path
        if (str_starts_with($this->hinhanh, 'products/')) {
            try {
                return \Illuminate\Support\Facades\Storage::disk('oci')->url($this->hinhanh);
            } catch (\Exception) {
                // Fallback
            }
        }

        // Local storage
        return asset('storage/' . $this->hinhanh);
    }
    }
}
