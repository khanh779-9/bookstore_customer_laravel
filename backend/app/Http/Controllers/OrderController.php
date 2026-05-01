<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Http\Resources\HoaDonResource;
use App\Models\DiaChiGiaoHang;
use App\Models\GioHang;
use App\Models\HoaDon;
use App\Models\SanPham;
use App\Models\ThongBao;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * Display customer order history.
     */
    public function create(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Sử dụng frontend route /checkout để thanh toán.',
                'path' => '/checkout',
            ]);
        }

        return redirect('/checkout');
    }

    public function success(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Đặt hàng thành công.',
                'last_order_id' => session('last_order_id'),
            ]);
        }

        return redirect('/orders');
    }

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

        if ($request->expectsJson()) return HoaDonResource::collection($orders);
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

        if ($request->expectsJson()) return new HoaDonResource($order);
        return view('customer.order-detail', compact('order'));
    }

    /**
     * Store a new order.
     */
    public function store(CheckoutRequest $request)
    {
        $customerId = $this->getCustomerId();
        if ($customerId <= 0) return $this->handleFailure($request, 'Vui lòng đăng nhập.', 401);

        $cartData = $this->getCartData($customerId);
        if (empty($cartData['items'])) return $this->handleFailure($request, 'Giỏ hàng trống.', 422);

        try {
            $order = $this->orderService->createOrder($customerId, $cartData['items'], $request->validated());

            // Clear session cart
            session()->forget('cart');
            session(['last_order_id' => $order->hoadon_id]);

            if ($request->expectsJson()) {
                return (new HoaDonResource($order))->additional(['message' => 'Đặt hàng thành công.']);
            }
            return redirect()->route('customer.checkout.success');
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage(), 422);
        }
    }

    /**
     * Update order status (Employee).
     */
    public function updateStatus(Request $request, int $id)
    {
        $validated = $request->validate([
            'trangthai' => ['required', Rule::in(['cho_xac_nhan', 'da_xac_nhan', 'dang_giao_hang', 'da_giao_hang', 'da_huy'])]
        ]);
        
        $order = $this->orderService->updateStatus($id, $validated['trangthai'], $request->user()?->getAuthIdentifier());

        if ($request->expectsJson()) {
            return (new HoaDonResource($order))->additional(['message' => 'Đã cập nhật trạng thái.']);
        }
        return back()->with('success', 'Đã cập nhật trạng thái đơn hàng.');
    }

    /**
     * Confirm order (Customer action - if applicable).
     */
    public function confirm(Request $request, int $id)
    {
        $customerId = $this->getCustomerId();
        $order = HoaDon::where('hoadon_id', $id)->where('khachhang_id', $customerId)->firstOrFail();
        
        // Custom confirmation logic if any
        $order = $this->orderService->updateStatus($id, HoaDon::STATUS_CONFIRMED);

        if ($request->expectsJson()) {
            return (new HoaDonResource($order))->additional(['message' => 'Đã xác nhận đơn hàng.']);
        }
        return back()->with('success', 'Đã xác nhận đơn hàng.');
    }

    /**
     * Get all orders for employee management.
     */
    public function employeeOrders(Request $request)
    {
        $orders = HoaDon::with(['khachHang', 'nhanVien'])
            ->orderByDesc('hoadon_id')
            ->paginate(10);

        return HoaDonResource::collection($orders);
    }

    /**
     * Create order by employee (POS-like or manual entry).
     */
    public function employeeCreateOrder(Request $request)
    {
        // For now, return not implemented or basic logic
        return response()->json(['message' => 'Chức năng tạo đơn hàng tại quầy đang được phát triển.'], 501);
    }

    private function getCustomerId(): int
    {
        $user = request()->user();
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
