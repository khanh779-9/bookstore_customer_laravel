<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductSearchRequest;
use App\Http\Requests\Product\ReviewRequest;
use App\Http\Resources\SanPhamResource;
use App\Http\Resources\DanhMucResource;
use App\Http\Resources\NhaXuatBanResource;
use App\Http\Resources\NhaCungCapResource;
use App\Models\DanhMucSanPham;
use App\Models\NhaCungCap;
use App\Models\NhaXuatBan;
use App\Models\SanPham;
use App\Models\DanhGia;
use App\Services\ProductService;
use App\Services\WishlistService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    protected $productService;
    protected $wishlistService;

    public function __construct(ProductService $productService, WishlistService $wishlistService)
    {
        $this->productService = $productService;
        $this->wishlistService = $wishlistService;
    }

    /**
     * Display a listing of the products.
     */
    public function home(Request $request)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            $products = SanPham::orderByDesc('sanpham_id')->paginate(12);
            return SanPhamResource::collection($products);
        }

        return redirect('/');
    }

    /**
     * Display a listing of the products.
     */
    public function index(ProductSearchRequest $request)
    {
        $products = $this->productService->getFilteredProducts($request->validated());

        if ($request->expectsJson() || $request->is('api/*')) {
            return SanPhamResource::collection($products);
        }

        // Web view data
        $providers = NhaCungCap::orderBy('ten')->get();
        $publishers = NhaXuatBan::orderBy('ten')->get();
        $categories = DanhMucSanPham::orderBy('tenDanhMuc')->get();
        
        $customerId = $this->getCustomerId();
        $wishlistedIds = $this->wishlistService->getWishlistStatus($customerId, $products->pluck('sanpham_id')->all());

        return view('products.index', compact('products', 'providers', 'publishers', 'categories', 'wishlistedIds'));
    }

    /**
     * Search products (alias for index).
     */
    public function search(ProductSearchRequest $request)
    {
        return $this->index($request);
    }

    /**
     * Display the specified product.
     */
    public function show(Request $request, int $id)
    {
        $data = $this->productService->getProductDetail($id);
        $product = $data['product'];

        if ($request->expectsJson() || $request->is('api/*')) {
            return (new SanPhamResource($product))->additional([
                'meta' => [
                    'avg_rating' => $data['avgRating'],
                    'total_reviews' => $data['totalReviews'],
                    'reviews' => $data['reviews'],
                ]
            ]);
        }

        $customerId = $this->getCustomerId();
        $wishlistedIds = $this->wishlistService->getWishlistStatus($customerId, [$id]);
        $isWishlisted = in_array($id, $wishlistedIds);
        
        $canReview = false;
        $alreadyReviewed = false;
        if ($customerId > 0) {
            $alreadyReviewed = DanhGia::where('khachhang_id', $customerId)->where('sanpham_id', $id)->exists();
            $hasPurchased = DB::table('hoadon')
                ->join('chitiethoadon', 'chitiethoadon.hoadon_id', '=', 'hoadon.hoadon_id')
                ->where('hoadon.khachhang_id', $customerId)
                ->where('chitiethoadon.sanpham_id', $id)
                ->exists();
            $canReview = $hasPurchased && !$alreadyReviewed;
        }

        return view('products.show', array_merge($data, compact('isWishlisted', 'canReview', 'alreadyReviewed')));
    }

    /**
     * Wishlist logic.
     */
    public function wishlist(Request $request)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleFailure($request, 'Vui lòng đăng nhập.', 401);

        $products = $this->wishlistService->getWishlist($customerId);

        if ($request->expectsJson()) return SanPhamResource::collection($products);
        return view('products.wishlist', compact('products'));
    }

    public function toggleWishlist(Request $request)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleFailure($request, 'Vui lòng đăng nhập.', 401);

        $validated = $request->validate(['sanpham_id' => ['required', 'integer']]);
        try {
            $result = $this->wishlistService->toggle($customerId, (int)$validated['sanpham_id']);
            return $this->handleSuccess($request, $result['message'], ['added' => $result['added']]);
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }

    /**
     * Submit a review.
     */
    public function submitReview(ReviewRequest $request, int $id)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleFailure($request, 'Vui lòng đăng nhập.', 401);

        try {
            $review = $this->productService->addReview($customerId, $id, $request->validated());
            return $this->handleSuccess($request, 'Cảm ơn bạn đã đánh giá!', $review);
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage(), 403);
        }
    }

    public function categories() { return DanhMucResource::collection(DanhMucSanPham::orderBy('tenDanhMuc')->get()); }
    public function publishers() { return NhaXuatBanResource::collection(NhaXuatBan::orderBy('ten')->get()); }
    public function providers() { return NhaCungCapResource::collection(NhaCungCap::orderBy('ten')->get()); }
}
