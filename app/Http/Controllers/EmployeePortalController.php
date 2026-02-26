<?php

namespace App\Http\Controllers;

use App\Models\DanhMucSanPham;
use App\Models\HoaDon;
use App\Models\KhachHang;
use App\Models\KhuyenMai;
use App\Models\NhaCungCap;
use App\Models\NhanVien;
use App\Models\NhaXuatBan;
use App\Models\SanPham;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class EmployeePortalController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'products' => SanPham::count(),
            'orders' => HoaDon::count(),
            'customers' => KhachHang::count(),
            'employees' => NhanVien::count(),
            'revenue' => (float) HoaDon::where('trangthai', '!=', 'da_huy')->sum('tongtien'),
        ];

        $recentOrders = HoaDon::orderByDesc('hoadon_id')->limit(10)->get();

        return view('employee.dashboard', compact('stats', 'recentOrders'));
    }

    public function products()
    {
        $products = SanPham::with(['sach', 'vanPhongPham'])
            ->orderByDesc('sanpham_id')
            ->paginate(15);

        return view('employee.products', compact('products'));
    }

    public function orders()
    {
        $orders = HoaDon::orderByDesc('hoadon_id')->paginate(15);

        return view('employee.orders', compact('orders'));
    }

    public function updateOrderStatus(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'trangthai' => ['required', Rule::in(order_status_db_codes())],
        ]);

        $order = HoaDon::findOrFail($id);
        $order->trangthai = $validated['trangthai'];
        $order->save();

        return back()->with('success', 'Đã cập nhật trạng thái đơn hàng.');
    }

    public function customers()
    {
        $customers = KhachHang::orderByDesc('khachhang_id')->paginate(15);

        return view('employee.customers', compact('customers'));
    }

    public function employees()
    {
        $employees = NhanVien::orderByDesc('nhanvien_id')->paginate(15);

        return view('employee.employees', compact('employees'));
    }

    public function publishers()
    {
        $publishers = NhaXuatBan::orderByDesc('nhaxuatban_id')->paginate(15);

        return view('employee.publishers', compact('publishers'));
    }

    public function providers()
    {
        $providers = NhaCungCap::orderByDesc('nhacungcap_id')->paginate(15);

        return view('employee.providers', compact('providers'));
    }

    public function categories()
    {
        $categories = DanhMucSanPham::orderByDesc('danhmucSP_id')->paginate(15);

        return view('employee.categories', compact('categories'));
    }

    public function promotions()
    {
        $promotions = KhuyenMai::orderByDesc('khuyenmai_id')->paginate(15);

        return view('employee.promotions', compact('promotions'));
    }

    public function reports()
    {
        $revenueByMonth = HoaDon::select(
            DB::raw("DATE_FORMAT(ngaytao, '%Y-%m') as thang"),
            DB::raw('SUM(tongtien) as doanhthu'),
            DB::raw('COUNT(*) as sodon')
        )
            ->where('trangthai', '!=', 'da_huy')
            ->groupBy('thang')
            ->orderBy('thang', 'desc')
            ->limit(12)
            ->get();

        return view('employee.reports', compact('revenueByMonth'));
    }

    public function settings()
    {
        return view('employee.settings');
    }

    public function profile()
    {
        $employeeId = (int) (session('employee.id') ?? 0);
        $employee = NhanVien::find($employeeId);

        return view('employee.profile', compact('employee'));
    }
}
