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
    protected $cartService;

    public function __construct(OrderService $orderService, \App\Services\CartService $cartService)
    {
        $this->orderService = $orderService;
        $this->cartService = $cartService;
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
        if ($customerId <= 0) return $this->handleFailure($request, 'Vui lòng đăng nhập.', 401);

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
        if ($customerId <= 0) return $this->handleFailure($request, 'Vui lòng đăng nhập.', 401);

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

            return $this->handleSuccess($request, 'Đặt hàng thành công.', new HoaDonResource($order), route('customer.checkout.success'));
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
        
        try {
            $order = $this->orderService->updateStatus($id, $validated['trangthai'], $request->user()?->getAuthIdentifier());
            return $this->handleSuccess($request, 'Đã cập nhật trạng thái.', new HoaDonResource($order));
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }

    /**
     * Confirm order (Customer action - if applicable).
     */
    public function confirm(Request $request, int $id)
    {
        $customerId = $this->getCustomerId();
        $order = HoaDon::where('hoadon_id', $id)->where('khachhang_id', $customerId)->firstOrFail();
        
        try {
            $order = $this->orderService->updateStatus($id, HoaDon::STATUS_CONFIRMED);
            return $this->handleSuccess($request, 'Đã xác nhận đơn hàng.', new HoaDonResource($order));
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
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
        return $this->handleFailure($request, 'Chức năng tạo đơn hàng tại quầy đang được phát triển.', 501);
    }

    private function getCartData(int $customerId): array
    {
        return $this->cartService->getCart($customerId);
    }
}
