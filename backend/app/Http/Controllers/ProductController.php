<?php

namespace App\Http\Controllers;

use App\Models\DanhGia;
use App\Models\DanhMucSanPham;
use App\Models\NhaCungCap;
use App\Models\NhaXuatBan;
use App\Models\SanPham;
use App\Models\SanPhamYeuThich;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        $products = SanPham::with(['sach', 'vanPhongPham'])
            ->filter($request->all())
            ->paginate(12)
            ->withQueryString();

        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json($products);
        }

        // Web view data
        $providers = NhaCungCap::orderBy('ten')->get();
        $publishers = NhaXuatBan::orderBy('ten')->get();
        $categories = DanhMucSanPham::orderBy('tenDanhMuc')->get();
        
        $productIds = $products->getCollection()->pluck('sanpham_id')->all();
        $reviewStats = [];
        if (!empty($productIds)) {
            $reviewStats = DanhGia::selectRaw('sanpham_id, COUNT(*) as total_reviews, AVG(rating) as avg_rating')
                ->whereIn('sanpham_id', $productIds)
                ->groupBy('sanpham_id')->get()->keyBy('sanpham_id')->toArray();
        }

        $customerId = $this->getCustomerId();
        $wishlistedIds = $customerId > 0 
            ? SanPhamYeuThich::where('khachhang_id', $customerId)->whereIn('sanpham_id', $productIds)->pluck('sanpham_id')->all() 
            : [];

        return view('products.index', compact('products', 'providers', 'publishers', 'categories', 'reviewStats', 'wishlistedIds'));
    }

    /**
     * Display the specified product.
     */
    public function show(Request $request, int $id)
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
        $relatedProducts = SanPham::with(['sach', 'vanPhongPham'])
            ->where('danhmucSP_id', $product->danhmucSP_id)
            ->where('sanpham_id', '!=', $product->sanpham_id)
            ->where('soluongton', '>', 0)
            ->limit(8)
            ->get();

        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'product' => $product,
                'avgRating' => $avgRating,
                'totalReviews' => $totalReviews,
                'reviews' => $reviews,
                'relatedProducts' => $relatedProducts
            ]);
        }

        $customerId = $this->getCustomerId();
        
        $isWishlisted = $customerId > 0 && SanPhamYeuThich::where('khachhang_id', $customerId)->where('sanpham_id', $id)->exists();
        
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

        return view('products.show', compact('product', 'reviews', 'avgRating', 'totalReviews', 'isWishlisted', 'canReview', 'alreadyReviewed', 'relatedProducts'));
    }

    /**
     * Display the wishlist for the current customer.
     */
    public function wishlist(Request $request)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleAuthFailure($request);

        $wishlistIds = SanPhamYeuThich::where('khachhang_id', $customerId)->pluck('sanpham_id')->all();
        $products = SanPham::with(['sach', 'vanPhongPham'])->whereIn('sanpham_id', $wishlistIds)->paginate(12);

        if ($request->expectsJson()) return response()->json($products);
        return view('products.wishlist', compact('products'));
    }

    /**
     * Toggle a product in the customer's wishlist.
     */
    public function toggleWishlist(Request $request)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleAuthFailure($request);

        $validated = $request->validate(['sanpham_id' => ['required', 'integer']]);
        $result = SanPhamYeuThich::toggle($customerId, (int)$validated['sanpham_id']);

        $msg = isset($result['message']) ? (string)$result['message'] : '';
        $added = isset($result['added']) ? (bool)$result['added'] : false;
        if ($request->expectsJson()) {
            return response()->json(['message' => $msg, 'added' => $added], 200);
        }
        return redirect()->back()->with('success', $msg);
    }

    /**
     * Submit a review for a product.
     */
    public function submitReview(Request $request, int $id)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleAuthFailure($request);

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'binhluan' => ['nullable', 'string', 'max:2000']
        ]);

        if (DanhGia::where('khachhang_id', $customerId)->where('sanpham_id', $id)->exists()) {
            return $this->handleError($request, 'Bạn đã đánh giá sản phẩm này rồi.');
        }

        $hasPurchased = DB::table('hoadon')
            ->join('chitiethoadon', 'chitiethoadon.hoadon_id', '=', 'hoadon.hoadon_id')
            ->where('hoadon.khachhang_id', $customerId)
            ->where('chitiethoadon.sanpham_id', $id)
            ->exists();

        if (!$hasPurchased) {
            return $this->handleError($request, 'Bạn chỉ có thể đánh giá sau khi đã mua sản phẩm.');
        }

        DanhGia::create([
            'khachhang_id' => $customerId,
            'sanpham_id' => $id,
            'rating' => $validated['rating'],
            'binhluan' => $validated['binhluan'] ?? null
        ]);

        $msg = 'Cảm ơn bạn đã đánh giá.';
        if ($request->expectsJson()) return response()->json(['message' => $msg]);
        return back()->with('success', $msg);
    }

    public function categories() { return response()->json(DanhMucSanPham::orderBy('tenDanhMuc')->get()); }
    public function publishers() { return response()->json(NhaXuatBan::orderBy('ten')->get()); }
    public function providers() { return response()->json(NhaCungCap::orderBy('ten')->get()); }

    private function getCustomerId(): int
    {
        // Kiểm tra nếu request có session (dành cho Web)
        if (request()->hasSession()) {
            $customerId = request()->session()->get('customer_id') ?? request()->session()->get('customer.id');
            if ($customerId) return (int)$customerId;
        }

        // Fallback dùng auth (dành cho API/Sanctum)
        return auth()->id() ?? 0;
    }

    private function handleAuthFailure(Request $request, string $msg = 'Vui lòng đăng nhập.')
    {
        if ($request->expectsJson()) return response()->json(['message' => $msg], 401);
        return redirect()->route('customer.login')->with('error', $msg);
    }

    private function handleError(Request $request, string $msg)
    {
        if ($request->expectsJson()) return response()->json(['message' => $msg], 422);
        return back()->with('error', $msg);
    }
}
