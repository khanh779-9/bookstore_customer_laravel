<?php

namespace App\Http\Controllers;

use App\Models\DanhMucSanPham;
use App\Models\KhuyenMai;
use App\Models\SanPham;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        try {
            $featuredProducts = SanPham::with(['sach', 'vanPhongPham'])
                ->where('soluongton', '>', 0)
                ->orderByDesc('sanpham_id')
                ->limit(8)
                ->get();

            $bestSellers = SanPham::with(['sach', 'vanPhongPham'])
                ->where('soluongton', '>', 0)
                ->orderByDesc('soluongban')
                ->limit(8)
                ->get();

            $newArrivals = SanPham::with(['sach', 'vanPhongPham'])
                ->where('soluongton', '>', 0)
                ->orderByDesc('sanpham_id')
                ->limit(8)
                ->get();

            $activePromotionIds = KhuyenMai::whereDate('ngaybatdau', '<=', now()->toDateString())
                ->whereDate('ngayketthuc', '>=', now()->toDateString())
                ->pluck('khuyenmai_id');

            $promotedProducts = SanPham::query()
                ->select('sanpham.*', DB::raw('MAX(chitietkhuyenmai.tilegiamgia) as max_discount'))
                ->join('chitietkhuyenmai', 'chitietkhuyenmai.sanpham_id', '=', 'sanpham.sanpham_id')
                ->whereIn('chitietkhuyenmai.khuyenmai_id', $activePromotionIds)
                ->with(['sach', 'vanPhongPham'])
                ->groupBy('sanpham.sanpham_id')
                ->orderByDesc('max_discount')
                ->limit(8)
                ->get();

            $categories = DanhMucSanPham::orderBy('danhmucSP_id')->get();
        } catch (QueryException) {
            $featuredProducts = collect();
            $bestSellers = collect();
            $newArrivals = collect();
            $promotedProducts = collect();
            $categories = collect();
        }

        return view('home.index', [
            'featuredProducts' => $featuredProducts,
            'bestSellers' => $bestSellers,
            'newArrivals' => $newArrivals,
            'promotedProducts' => $promotedProducts,
            'categories' => $categories,
        ]);
    }

    public function contact()
    {
        return view('pages.contact');
    }

    public function about()
    {
        return view('pages.about');
    }

    public function privacyPolicy()
    {
        return view('pages.privacy-policy');
    }

    public function returnPolicy()
    {
        return view('pages.return-policy');
    }

    public function warrantyPolicy()
    {
        return view('pages.warranty-policy');
    }

    public function shippingDelivery()
    {
        return view('pages.shipping-delivery');
    }
}
