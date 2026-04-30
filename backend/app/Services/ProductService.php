<?php

namespace App\Services;

use App\Models\SanPham;
use App\Models\DanhGia;
use App\Models\SanPhamYeuThich;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    /**
     * Get filtered products with stats.
     */
    public function getFilteredProducts(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        $query = SanPham::with(['sach', 'vanPhongPham', 'danhMuc', 'donViTinh'])
            ->filter($filters);

        $products = $query->paginate($perPage);

        // Add review stats if any products found
        if ($products->count() > 0) {
            $productIds = $products->pluck('sanpham_id')->all();
            $stats = $this->getReviewStats($productIds);
            
            foreach ($products as $product) {
                if (isset($stats[$product->sanpham_id])) {
                    $product->avg_rating = $stats[$product->sanpham_id]['avg_rating'];
                    $product->total_reviews = $stats[$product->sanpham_id]['total_reviews'];
                }
            }
        }

        return $products;
    }

    /**
     * Get review statistics for a set of product IDs.
     */
    public function getReviewStats(array $productIds): array
    {
        return DanhGia::selectRaw('sanpham_id, COUNT(*) as total_reviews, AVG(rating) as avg_rating')
            ->whereIn('sanpham_id', $productIds)
            ->groupBy('sanpham_id')
            ->get()
            ->keyBy('sanpham_id')
            ->toArray();
    }

    /**
     * Get detailed product information.
     */
    public function getProductDetail(int $id): array
    {
        $product = SanPham::with([
            'sach.tacgia', 
            'sach.nhaxuatban', 
            'vanPhongPham', 
            'danhGia.khachHang',
            'nhaCungCap',
            'danhMuc'
        ])->findOrFail($id);
        
        $avgRating = (float) $product->danhGia()->avg('rating');
        $totalReviews = (int) $product->danhGia()->count();
        $reviews = $product->danhGia()->orderByDesc('danhgia_id')->limit(20)->get();

        return [
            'product' => $product,
            'avgRating' => $avgRating,
            'totalReviews' => $totalReviews,
            'reviews' => $reviews
        ];
    }

    /**
     * Get wishlist status for products.
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
