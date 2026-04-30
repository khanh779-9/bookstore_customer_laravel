<?php

namespace App\Services;

use App\Models\SanPhamYeuThich;
use App\Models\SanPham;
use Illuminate\Pagination\LengthAwarePaginator;

class WishlistService
{
    /**
     * Get customer wishlist with pagination.
     */
    public function getWishlist(int $customerId, int $perPage = 12): LengthAwarePaginator
    {
        $wishlistIds = SanPhamYeuThich::where('khachhang_id', $customerId)->pluck('sanpham_id')->all();
        return SanPham::with(['sach', 'vanPhongPham', 'danhMuc'])
            ->whereIn('sanpham_id', $wishlistIds)
            ->paginate($perPage);
    }

    /**
     * Toggle product in wishlist.
     */
    public function toggle(int $customerId, int $productId): array
    {
        return SanPhamYeuThich::toggle($customerId, $productId);
    }

    /**
     * Check if products are in wishlist.
     */
    public function getWishlistStatus(int $customerId, array $productIds): array
    {
        if ($customerId <= 0) return [];
        
        return SanPhamYeuThich::where('khachhang_id', $customerId)
            ->whereIn('sanpham_id', $productIds)
            ->pluck('sanpham_id')
            ->all();
    }
}
