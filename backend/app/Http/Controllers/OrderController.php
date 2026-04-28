<?php

namespace App\Http\Controllers;

use App\Models\ChiTietHoaDon;
use App\Models\DiaChiGiaoHang;
use App\Models\GioHang;
use App\Models\HoaDon;
use App\Models\SanPham;
use App\Models\ThongBao;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    /**
     * Display customer order history.
     */
    public function index(Request $request)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleAuthFailure($request);

        $orders = HoaDon::where('khachhang_id', $customerId)
            ->orderByDesc('hoadon_id')
            ->paginate(10);

        if ($request->expectsJson()) return response()->json($orders);
        return view('customer.orders', compact('orders'));
    }

    /**
     * Display order details.
     */
    public function show(Request $request, int $id)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleAuthFailure($request);

        $order = HoaDon::with('chiTiet.sanPham')
            ->where('hoadon_id', $id)
            ->where('khachhang_id', $customerId)
            ->firstOrFail();

        if ($request->expectsJson()) return response()->json($order);
        return view('customer.order-detail', compact('order'));
    }

    /**
     * Show checkout page.
     */
    public function create(Request $request)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return redirect()->route('customer.login')->with('error', 'Vui lòng đăng nhập.');

        $cartData = $this->getCartData($customerId);
        if (empty($cartData['items'])) return redirect()->route('customer.cart.index')->with('error', 'Giỏ hàng trống.');

        return view('orders.checkout', [
            'cart' => $cartData['items'],
            'total' => $cartData['total'],
            'addresses' => DiaChiGiaoHang::where('khachhang_id', $customerId)->get(),
        ]);
    }

    /**
     * Store a new order.
     */
    public function store(Request $request)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleFailure($request, 'Vui lòng đăng nhập.', 401);

        $cartData = $this->getCartData($customerId);
        if (empty($cartData['items'])) return $this->handleFailure($request, 'Giỏ hàng trống.', 422);

        $validated = $request->validate([
            'dcgh_id' => ['nullable', 'integer', 'exists:diachi_giaohang,dcgh_id'],
            'phuongthuc_thanhtoan' => ['required', Rule::in(['tien_mat', 'chuyen_khoan', 'vi_dien_tu'])],
            'ghichu' => ['nullable', 'string', 'max:1000'],
        ]);

        try {
            // Use the Model helper to create order with items and handle stock
            $hoaDon = HoaDon::createWithItems($customerId, $cartData['items'], [
                'dcgh_id' => $validated['dcgh_id'],
                'phuongthuc_thanhtoan' => $validated['phuongthuc_thanhtoan'],
                'ghichu' => $validated['ghichu'] ?? null,
            ]);

            // Clear cart
            if ($customerId > 0) {
                GioHang::where('khachhang_id', $customerId)->delete();
            }
            session()->forget('cart');
            session(['last_order_id' => $hoaDon->hoadon_id]);

            // Send notification
            ThongBao::send($customerId, 'Đặt hàng thành công', "Đơn hàng #{$hoaDon->hoadon_id} của bạn đã được tiếp nhận.", 'don_hang');

            if ($request->expectsJson()) {
                return response()->json(['message' => 'Đặt hàng thành công.', 'order_id' => $hoaDon->hoadon_id], 201);
            }
            return redirect()->route('customer.checkout.success');
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage(), 422);
        }
    }

    public function success()
    {
        $customerId = $this->getCustomerId();
        $orderId = (int) (session('last_order_id') ?? 0);
        $order = $orderId > 0 && $customerId > 0 ? HoaDon::where('hoadon_id', $orderId)->where('khachhang_id', $customerId)->first() : null;
        return view('orders.success', ['order' => $order, 'orderId' => $orderId]);
    }

    /**
     * Confirm payment for an order.
     */
    public function confirm(Request $request, int $id)
    {
        $customerId = $this->getCustomerId();
        $order = HoaDon::where('hoadon_id', $id)->where('khachhang_id', $customerId)->firstOrFail();

        if ($order->trangthai === 'cho_thanh_toan') {
            $order->update(['trangthai' => 'cho_xac_nhan']);
            if ($request->expectsJson()) return response()->json(['message' => 'Đã xác nhận thanh toán.']);
            return redirect()->route('customer.orders.detail', $id)->with('success', 'Đã xác nhận thanh toán.');
        }
        return $this->handleFailure($request, 'Đơn hàng không thể xác nhận.', 422);
    }

    // ── Employee Side ─────────────────────────────────────

    public function employeeOrders(Request $request)
    {
        $orders = HoaDon::with('khachHang')->orderByDesc('hoadon_id')->paginate(15);
        if ($request->expectsJson()) return response()->json($orders);
        return view('employee.orders', compact('orders'));
    }

    public function updateStatus(Request $request, int $id)
    {
        $validated = $request->validate([
            'trangthai' => ['required', Rule::in(['cho_xac_nhan', 'da_xac_nhan', 'dang_giao_hang', 'da_giao_hang', 'da_huy'])]
        ]);
        
        $order = HoaDon::findOrFail($id);
        $order->updateStatus($validated['trangthai']);

        if ($request->expectsJson()) return response()->json(['message' => 'Đã cập nhật trạng thái.', 'order' => $order]);
        return back()->with('success', 'Đã cập nhật trạng thái đơn hàng.');
    }

    /**
     * Create an order on behalf of a customer (at the counter).
     * Mirrors: EmployeeActionController::handleOrderCreate()
     */
    public function employeeCreateOrder(Request $request)
    {
        $validated = $request->validate([
            'khachhang_id'          => ['nullable', 'integer'],
            // New customer fields (if khachhang_id is not provided)
            'new_name'              => ['nullable', 'string', 'max:100'],
            'new_email'             => ['nullable', 'email', 'max:100'],
            'new_phone'             => ['nullable', 'string', 'max:20'],
            'new_address'           => ['nullable', 'string', 'max:500'],
            // Order items
            'items'                 => ['required', 'array', 'min:1'],
            'items.*.sanpham_id'    => ['required', 'integer', 'exists:sanpham,sanpham_id'],
            'items.*.soluong'       => ['required', 'integer', 'min:1'],
            'items.*.dongia'        => ['nullable', 'numeric', 'min:0'],
            // Payment
            'phuongthuc_thanhtoan'  => ['nullable', 'string'],
            'dcgh_id'              => ['nullable', 'integer'],
        ]);

        // Determine or create customer
        $customerId = $validated['khachhang_id'] ?? 0;
        if ($customerId <= 0) {
            $customer = \App\Models\KhachHang::create([
                'ho'       => $validated['new_name'] ?? 'Khách',
                'ten'      => 'lẻ',
                'email'    => $validated['new_email'] ?? null,
                'sdt'      => $validated['new_phone'] ?? null,
                'password' => \Illuminate\Support\Facades\Hash::make(\Illuminate\Support\Str::random(16)),
            ]);
            $customerId = $customer->khachhang_id;
        }

        // Check stock availability
        $stockErrors = [];
        $orderItems = [];
        foreach ($validated['items'] as $item) {
            $product = SanPham::find($item['sanpham_id']);
            if (!$product) continue;

            if ($item['soluong'] > $product->soluongton) {
                $stockErrors[] = "{$product->ten_hien_thi} (yêu cầu: {$item['soluong']}, tồn: {$product->soluongton})";
                continue;
            }

            $orderItems[] = [
                'sanpham_id' => $item['sanpham_id'],
                'soluong'    => $item['soluong'],
                'dongia'     => $item['dongia'] ?? (float) $product->gia,
            ];
        }

        if (!empty($stockErrors)) {
            return $this->handleFailure($request, 'Tồn kho không đủ cho: ' . implode(', ', $stockErrors), 422);
        }

        if (empty($orderItems)) {
            return $this->handleFailure($request, 'Không có sản phẩm hợp lệ.', 422);
        }

        try {
            $order = HoaDon::createWithItems(
                $customerId,
                $orderItems,
                $validated['phuongthuc_thanhtoan'] ?? 'tien_mat',
                $validated['dcgh_id'] ?? null,
                HoaDon::STATUS_PENDING_CONFIRMATION
            );

            ThongBao::send($customerId, 'Đơn hàng mới', "Đơn hàng #{$order->hoadon_id} đã được tạo bởi nhân viên.", 'don_hang');

            if ($request->expectsJson()) {
                return response()->json(['message' => 'Tạo đơn hàng thành công!', 'order' => $order], 201);
            }
            return back()->with('success', 'Tạo đơn hàng thành công!');
        } catch (\Exception $e) {
            return $this->handleFailure($request, 'Tạo đơn hàng thất bại: ' . $e->getMessage(), 500);
        }
    }

    // ── Helpers ──────────────────────────────────────────

    private function getCustomerId(): int
    {
        $user = auth()->user();
        if ($user) return (int) $user->khachhang_id;
        return (int) (session('customer.id') ?? 0);
    }

    private function getCartData(int $customerId): array
    {
        if ($customerId > 0) {
            $cart = GioHang::where('khachhang_id', $customerId)->first();
            if (!$cart) return ['items' => [], 'total' => 0];
            $items = $cart->chiTiet->map(fn($i) => [
                'sanpham_id' => $i->sanpham_id,
                'name' => $i->sanPham->ten_hien_thi,
                'price' => (float)$i->dongia,
                'quantity' => $i->soluong,
                'subtotal' => (float)$i->thanhtien
            ])->toArray();
            return ['items' => $items, 'total' => collect($items)->sum('subtotal')];
        }
        $items = session('cart', []);
        return ['items' => $items, 'total' => collect($items)->sum('subtotal')];
    }

    private function handleAuthFailure(Request $request)
    {
        if ($request->expectsJson()) return response()->json(['message' => 'Vui lòng đăng nhập.'], 401);
        return redirect()->route('customer.login')->with('error', 'Vui lòng đăng nhập.');
    }

    private function handleFailure(Request $request, string $msg, int $code = 400)
    {
        if ($request->expectsJson()) return response()->json(['message' => $msg], $code);
        return back()->with('error', $msg);
    }
}
