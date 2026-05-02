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
        $query = SanPham::with(['sach', 'danhMuc', 'donViTinh'])
            ->filter($filters);

        // Mặc định lọc bỏ hàng hết nếu không có yêu cầu xem toàn bộ (dùng cho Frontend)
        if (!isset($filters['show_all'])) {
            $query->where('soluongton', '>', 0);
        }

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
            'danhGia.khachHang',
            'nhaCungCap',
            'danhMuc'
        ])->findOrFail($id);

        if ($product->soluongton <= 0) {
             throw new \Illuminate\Database\Eloquent\ModelNotFoundException("Sản phẩm hiện đang hết hàng.");
        }
        
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
     * Submit a review for a product.
     */
    public function addReview(int $customerId, int $productId, array $data): DanhGia
    {
        $hasPurchased = \Illuminate\Support\Facades\DB::table('hoadon')
            ->join('chitiethoadon', 'chitiethoadon.hoadon_id', '=', 'hoadon.hoadon_id')
            ->where('hoadon.khachhang_id', $customerId)
            ->where('chitiethoadon.sanpham_id', $productId)
            ->exists();

        if (!$hasPurchased) {
            throw new \Exception('Bạn phải mua sản phẩm mới có thể đánh giá.');
        }

        $alreadyReviewed = DanhGia::where('khachhang_id', $customerId)->where('sanpham_id', $productId)->exists();
        if ($alreadyReviewed) {
            throw new \Exception('Bạn đã đánh giá sản phẩm này rồi.');
        }

        return DanhGia::create([
            'khachhang_id' => $customerId,
            'sanpham_id' => $productId,
            'rating' => $data['rating'],
            'noi_dung' => $data['noi_dung'] ?? null,
            'ngay_danh_gia' => now(),
        ]);
    }

    /**
     * Create a new product with its subtype details.
     */
    public function createProduct(array $data): SanPham
    {
        return \Illuminate\Support\Facades\DB::transaction(function() use ($data) {
            if (isset($data['attributes']) && is_array($data['attributes'])) {
                $data['data_json'] = $data['attributes'];
            }
            $product = SanPham::create($data);

            if ($data['type'] === 'book') {
                $product->sach()->create([
                    'tacgia_id' => $data['tacgia_id'] ?? null,
                    'nhaxuatban_id' => $data['nhaxuatban_id'] ?? null,
                    'namXB' => $data['namXB'] ?? null,
                    'loaisach_code' => $data['loaisach_code'] ?? null,
                ]);
            }

            return $product;
        });
    }

    /**
     * Update a product and its subtype details.
     */
    public function updateProduct(int $id, array $data): SanPham
    {
        return \Illuminate\Support\Facades\DB::transaction(function() use ($id, $data) {
            $product = SanPham::findOrFail($id);
            
            // Xử lý cập nhật/thêm mới các thuộc tính trong data_json mà không làm mất dữ liệu cũ
            if (isset($data['attributes']) && is_array($data['attributes'])) {
                $currentAttributes = $product->data_json ?? [];
                $product->data_json = array_merge($currentAttributes, $data['attributes']);
            }

            // Cập nhật các trường thông thường khác cho SanPham
            $product->fill($data);
            $product->save();

            if ($product->sach) {
                // Chỉ lấy các trường hợp lệ cho bảng 'sach'
                $bookData = \Illuminate\Support\Arr::only($data, [
                    'tacgia_id', 
                    'nhaxuatban_id', 
                    'namXB', 
                    'loaisach_code'
                ]);
                
                if (!empty($bookData)) {
                    $product->sach->update($bookData);
                }
            }

            return $product;
        });
    }

    /**
     * Delete a product and its related data.
     */
    public function deleteProduct(int $id): void
    {
        \Illuminate\Support\Facades\DB::transaction(function() use ($id) {
            $product = SanPham::findOrFail($id);
            $product->sach()?->delete();
            $product->delete();
        });
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
