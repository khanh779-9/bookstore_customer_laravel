<?php

namespace App\Http\Controllers;

use App\Models\ChiTietHoaDon;
use App\Models\DiaChiGiaoHang;
use App\Models\HoaDon;
use App\Models\SanPham;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function create()
    {
        $cart = session('cart', []);
        $customerId = (int) (session('customer.id') ?? 0);

        if ($customerId <= 0) {
            return redirect()->route('customer.login')->with('error', 'Vui lòng đăng nhập trước khi thanh toán.');
        }

        if (empty($cart)) {
            return redirect()->route('customer.products.index')->with('error', 'Giỏ hàng đang trống.');
        }

        $total = collect($cart)->sum(fn ($item) => $item['subtotal']);
        $addresses = DiaChiGiaoHang::where('khachhang_id', $customerId)->get();

        return view('orders.checkout', [
            'cart' => $cart,
            'total' => $total,
            'addresses' => $addresses,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $cart = session('cart', []);
        $customerId = (int) (session('customer.id') ?? 0);

        if ($customerId <= 0) {
            return redirect()->route('customer.login')->with('error', 'Vui lòng đăng nhập trước khi thanh toán.');
        }

        if (empty($cart)) {
            return redirect()->route('customer.products.index')->with('error', 'Giỏ hàng đang trống.');
        }

        $validated = $request->validate([
            'dcgh_id' => ['nullable', 'integer', 'exists:diachi_giaohang,dcgh_id'],
            'phuongthuc_thanhtoan' => ['required', Rule::in(payment_method_db_codes())],
            'ghichu' => ['nullable', 'string', 'max:1000'],
        ]);

        $total = collect($cart)->sum(fn ($item) => $item['subtotal']);

        try {
            DB::transaction(function () use ($validated, $cart, $total, $customerId) {
                $hoaDon = HoaDon::create([
                    'khachhang_id' => $customerId,
                    'dcgh_id' => $validated['dcgh_id'] ?? null,
                    'tongtien' => $total,
                    'trangthai' => 'cho_thanh_toan',
                    'phuongthuc_thanhtoan' => $validated['phuongthuc_thanhtoan'],
                    'ghichu' => $validated['ghichu'] ?? null,
                ]);

                foreach ($cart as $item) {
                    $product = SanPham::where('sanpham_id', $item['sanpham_id'])->lockForUpdate()->firstOrFail();

                    if ($product->soluongton < $item['quantity']) {
                        throw new \RuntimeException('Sản phẩm "' . $item['name'] . '" không đủ tồn kho.');
                    }

                    $product->soluongton = $product->soluongton - $item['quantity'];
                    $product->soluongban = $product->soluongban + $item['quantity'];
                    $product->save();

                    ChiTietHoaDon::create([
                        'hoadon_id' => $hoaDon->hoadon_id,
                        'sanpham_id' => $item['sanpham_id'],
                        'soluong' => $item['quantity'],
                        'dongia' => $item['price'],
                        'thanhtien' => $item['subtotal'],
                    ]);
                }

                session(['last_order_id' => $hoaDon->hoadon_id]);
            });
        } catch (\RuntimeException $exception) {
            return back()->withInput()->with('error', $exception->getMessage());
        }

        session()->forget('cart');

        return redirect()->route('customer.checkout.success');
    }

    public function success()
    {
        $customerId = (int) (session('customer.id') ?? 0);
        $orderId = (int) (session('last_order_id') ?? 0);
        $order = null;

        if ($orderId > 0 && $customerId > 0) {
            $order = HoaDon::where('hoadon_id', $orderId)
                ->where('khachhang_id', $customerId)
                ->first();
        }

        return view('orders.success', [
            'order' => $order,
            'orderId' => $order?->hoadon_id,
        ]);
    }

    public function confirm(Request $request): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);

        $validated = $request->validate([
            'order_id' => ['required', 'integer'],
        ]);

        $order = HoaDon::where('hoadon_id', (int) $validated['order_id'])
            ->where('khachhang_id', $customerId)
            ->firstOrFail();

        if ($order->trangthai !== 'cho_thanh_toan') {
            return redirect()->route('customer.orders.detail', $order->hoadon_id)
                ->with('error', 'Đơn hàng này đã được xác nhận trước đó.');
        }

        $order->trangthai = 'cho_xac_nhan';
        $order->save();

        session()->forget('last_order_id');

        return redirect()->route('customer.orders.detail', $order->hoadon_id)
            ->with('success', 'Đã xác nhận thanh toán, đơn hàng đã chuyển sang chờ xác nhận.');
    }
}
