<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use App\Models\SanPham;
use App\Models\KhachHang;
use App\Models\HoaDon;
use App\Models\NhaXuatBan;
use App\Models\NhaCungCap;
use App\Models\DanhMucSanPham;
use App\Http\Resources\SanPhamResource;
use App\Http\Resources\KhachHangResource;
use App\Http\Resources\NhanVienResource;
use App\Http\Resources\NhaXuatBanResource;
use App\Http\Resources\NhaCungCapResource;
use App\Http\Resources\DanhMucResource;
use App\Http\Resources\HoaDonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EmployeeAccountController extends Controller
{
    // Login and Logout are handled by EmployeeAuthController

    public function dashboard(Request $request)
    {
        $stats = [
            'revenue' => (float) HoaDon::where('trangthai', '!=', 'da_huy')->sum('tongtien'),
            'orders' => HoaDon::count(),
            'products' => SanPham::count(),
            'customers' => KhachHang::count(),
        ];

        $recentOrders = HoaDon::with(['khachHang'])
            ->orderByDesc('hoadon_id')
            ->limit(5)
            ->get();

        return response()->json([
            'stats' => $stats,
            'recentOrders' => $recentOrders
        ]);
    }

    public function profile(Request $request)
    {
        $employee = $request->user();
        if (!$employee) return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
        return new NhanVienResource($employee);
    }

    public function products(Request $request)
    {
        $products = SanPham::with(['danhMuc', 'sach.nhaxuatban', 'nhaCungCap'])
            ->orderByDesc('sanpham_id')
            ->paginate(10);
        return SanPhamResource::collection($products);
    }

    public function customers(Request $request)
    {
        $customers = KhachHang::orderByDesc('khachhang_id')->paginate(10);
        return KhachHangResource::collection($customers);
    }

    public function employees(Request $request)
    {
        $employees = NhanVien::orderByDesc('nhanvien_id')->paginate(10);
        return NhanVienResource::collection($employees);
    }

    public function publishers(Request $request)
    {
        $publishers = NhaXuatBan::orderBy('ten')->paginate(10);
        return NhaXuatBanResource::collection($publishers);
    }

    public function providers(Request $request)
    {
        $providers = NhaCungCap::orderBy('ten')->paginate(10);
        return NhaCungCapResource::collection($providers);
    }

    public function categories(Request $request)
    {
        $categories = DanhMucSanPham::orderBy('tenDanhMuc')->paginate(10);
        return DanhMucResource::collection($categories);
    }

    public function reports(Request $request)
    {
        // Simple report data: Monthly revenue for the last 6 months
        $monthlyRevenue = HoaDon::where('trangthai', '!=', 'da_huy')
            ->select(
                DB::raw('SUM(tongtien) as total'),
                DB::raw('MONTH(ngaytao) as month')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json([
            'monthly_revenue' => $monthlyRevenue,
            'summary' => [
                'total_revenue' => HoaDon::where('trangthai', '!=', 'da_huy')->sum('tongtien'),
                'total_orders' => HoaDon::count(),
                'avg_order_value' => HoaDon::avg('tongtien')
            ]
        ]);
    }

    public function settings(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Khu vực cài đặt hệ thống đang được phát triển.',
                'available' => false,
            ]);
        }

        return redirect('/internal/settings');
    }
}
