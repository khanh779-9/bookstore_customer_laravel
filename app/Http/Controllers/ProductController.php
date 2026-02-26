<?php

namespace App\Http\Controllers;

use App\Models\DanhGia;
use App\Models\DanhMucSanPham;
use App\Models\NhaCungCap;
use App\Models\NhaXuatBan;
use App\Models\SanPham;
use App\Models\SanPhamYeuThich;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $keyword = trim((string) $request->query('q', ''));
        $categoryId = (int) $request->query('danhmucSP_id', 0);
        $providerId = (int) $request->query('provider_id', 0);
        $publisherId = (int) $request->query('publisher_id', 0);
        $minPrice = (float) $request->query('min', 0);
        $maxPrice = (float) $request->query('max', 0);
        $sortBy = (string) $request->query('sort_by', 'newest');

        $query = SanPham::with(['sach', 'vanPhongPham'])
            ->where('soluongton', '>', 0)
            ->orderByDesc('sanpham_id');

        if ($categoryId > 0) {
            $query->where('danhmucSP_id', $categoryId);
        }

        if ($providerId > 0) {
            $query->where('nhacungcap_id', $providerId);
        }

        if ($publisherId > 0) {
            $query->whereHas('sach', function ($bookQuery) use ($publisherId) {
                $bookQuery->where('nhaxuatban_id', $publisherId);
            });
        }

        if ($minPrice > 0) {
            $query->where('gia', '>=', $minPrice);
        }

        if ($maxPrice > 0) {
            $query->where('gia', '<=', $maxPrice);
        }

        if ($keyword !== '') {
            $query->where(function ($innerQuery) use ($keyword) {
                $innerQuery->whereHas('sach', function ($bookQuery) use ($keyword) {
                    $bookQuery->where('tenSach', 'like', '%' . $keyword . '%');
                })->orWhereHas('vanPhongPham', function ($stationeryQuery) use ($keyword) {
                    $stationeryQuery->where('tenVPP', 'like', '%' . $keyword . '%');
                });
            });
        }

        if ($sortBy === 'price_asc') {
            $query->orderBy('gia');
        } elseif ($sortBy === 'price_desc') {
            $query->orderByDesc('gia');
        } elseif ($sortBy === 'best_selling') {
            $query->orderByDesc('soluongban');
        } else {
            $query->orderByDesc('sanpham_id');
        }

        try {
            $products = $query->paginate(12)->withQueryString();
            $providers = NhaCungCap::orderBy('ten')->get();
            $publishers = NhaXuatBan::orderBy('ten')->get();
            $categories = DanhMucSanPham::orderBy('tenDanhMuc')->get();

            $productIds = $products->getCollection()->pluck('sanpham_id')->all();
            $reviewStats = [];
            if (! empty($productIds)) {
                $reviewStats = DanhGia::query()
                    ->selectRaw('sanpham_id, COUNT(*) as total_reviews, AVG(rating) as avg_rating')
                    ->whereIn('sanpham_id', $productIds)
                    ->groupBy('sanpham_id')
                    ->get()
                    ->keyBy('sanpham_id')
                    ->toArray();
            }

            $wishlistedIds = [];
            $customerId = (int) (session('customer.id') ?? 0);
            if ($customerId > 0 && ! empty($productIds)) {
                $wishlistedIds = SanPhamYeuThich::query()
                    ->where('khachhang_id', $customerId)
                    ->whereIn('sanpham_id', $productIds)
                    ->pluck('sanpham_id')
                    ->all();
            }
        } catch (QueryException) {
            return redirect()->route('customer.home')->with('error', 'Chưa có dữ liệu sản phẩm. Hãy import CSDL db_nhasach.sql.');
        }

        return view('products.index', [
            'products' => $products,
            'keyword' => $keyword,
            'categoryId' => $categoryId,
            'providerId' => $providerId,
            'publisherId' => $publisherId,
            'minPrice' => $minPrice,
            'maxPrice' => $maxPrice,
            'sortBy' => $sortBy,
            'providers' => $providers,
            'publishers' => $publishers,
            'categories' => $categories,
            'reviewStats' => $reviewStats,
            'wishlistedIds' => $wishlistedIds,
        ]);
    }

    public function show(int $id)
    {
        try {
            $product = SanPham::with(['sach', 'vanPhongPham'])
                ->where('sanpham_id', $id)
                ->firstOrFail();

            $reviews = DanhGia::where('sanpham_id', $id)
                ->orderByDesc('danhgia_id')
                ->limit(20)
                ->get();

            $avgRating = (float) DanhGia::where('sanpham_id', $id)->avg('rating');
            $totalReviews = (int) DanhGia::where('sanpham_id', $id)->count();

            $customerId = (int) (session('customer.id') ?? 0);
            $isWishlisted = false;
            $canReview = false;
            $alreadyReviewed = false;
            if ($customerId > 0) {
                $isWishlisted = SanPhamYeuThich::where('khachhang_id', $customerId)
                    ->where('sanpham_id', $id)
                    ->exists();

                $alreadyReviewed = DanhGia::where('khachhang_id', $customerId)
                    ->where('sanpham_id', $id)
                    ->exists();

                $hasPurchased = DB::table('hoadon')
                    ->join('chitiethoadon', 'chitiethoadon.hoadon_id', '=', 'hoadon.hoadon_id')
                    ->where('hoadon.khachhang_id', $customerId)
                    ->where('chitiethoadon.sanpham_id', $id)
                    ->exists();

                $canReview = $hasPurchased && ! $alreadyReviewed;
            }

            $relatedProducts = SanPham::with(['sach', 'vanPhongPham'])
                ->where('danhmucSP_id', $product->danhmucSP_id)
                ->where('sanpham_id', '!=', $product->sanpham_id)
                ->where('soluongton', '>', 0)
                ->limit(8)
                ->get();
        } catch (QueryException) {
            return redirect()->route('customer.products.index')->with('error', 'Chưa có dữ liệu sản phẩm. Hãy import CSDL db_nhasach.sql.');
        }

        return view('products.show', [
            'product' => $product,
            'reviews' => $reviews,
            'avgRating' => $avgRating,
            'totalReviews' => $totalReviews,
            'isWishlisted' => $isWishlisted,
            'canReview' => $canReview,
            'alreadyReviewed' => $alreadyReviewed,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    public function toggleWishlist(Request $request): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);
        if ($customerId <= 0) {
            return redirect()->route('customer.login')->with('error', 'Vui lòng đăng nhập để dùng yêu thích.');
        }

        $validated = $request->validate([
            'sanpham_id' => ['required', 'integer'],
        ]);

        $query = SanPhamYeuThich::where('khachhang_id', $customerId)
            ->where('sanpham_id', (int) $validated['sanpham_id']);

        if ($query->exists()) {
            $query->delete();

            return back()->with('success', 'Đã xóa khỏi danh sách yêu thích.');
        }

        SanPhamYeuThich::create([
            'khachhang_id' => $customerId,
            'sanpham_id' => (int) $validated['sanpham_id'],
        ]);

        return back()->with('success', 'Đã thêm vào danh sách yêu thích.');
    }

    public function wishlist()
    {
        $customerId = (int) (session('customer.id') ?? 0);
        if ($customerId <= 0) {
            return redirect()->route('customer.login')->with('error', 'Vui lòng đăng nhập để xem danh sách yêu thích.');
        }

        $wishlist = SanPhamYeuThich::query()
            ->where('khachhang_id', $customerId)
            ->orderByDesc('spyt_id')
            ->pluck('sanpham_id')
            ->all();

        $products = SanPham::with(['sach', 'vanPhongPham'])
            ->whereIn('sanpham_id', $wishlist)
            ->paginate(12);

        return view('products.wishlist', [
            'products' => $products,
        ]);
    }

    public function submitReview(Request $request, int $id): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);
        if ($customerId <= 0) {
            return redirect()->route('customer.login')->with('error', 'Vui lòng đăng nhập để đánh giá sản phẩm.');
        }

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'binhluan' => ['nullable', 'string', 'max:2000'],
        ]);

        $alreadyReviewed = DanhGia::where('khachhang_id', $customerId)
            ->where('sanpham_id', $id)
            ->exists();

        if ($alreadyReviewed) {
            return back()->with('error', 'Bạn đã đánh giá sản phẩm này rồi.');
        }

        $hasPurchased = DB::table('hoadon')
            ->join('chitiethoadon', 'chitiethoadon.hoadon_id', '=', 'hoadon.hoadon_id')
            ->where('hoadon.khachhang_id', $customerId)
            ->where('chitiethoadon.sanpham_id', $id)
            ->exists();

        if (! $hasPurchased) {
            return back()->with('error', 'Bạn chỉ có thể đánh giá sau khi đã mua sản phẩm này.');
        }

        DanhGia::create([
            'khachhang_id' => $customerId,
            'sanpham_id' => $id,
            'rating' => (int) $validated['rating'],
            'binhluan' => $validated['binhluan'] ?? null,
        ]);

        return back()->with('success', 'Đánh giá của bạn đã được ghi nhận.');
    }
}
