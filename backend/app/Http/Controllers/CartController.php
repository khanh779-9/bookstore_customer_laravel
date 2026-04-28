<?php

namespace App\Http\Controllers;

use App\Models\GioHang;
use App\Models\SanPham;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index(Request $request)
    {
        $customerId = $this->getCustomerId();

        if ($customerId > 0) {
            $cart = GioHang::getOrCreateForCustomer($customerId);
            $items = $cart->chiTiet()->with('sanPham.sach', 'sanPham.vanPhongPham')->get()->map(function($item) {
                return [
                    'sanpham_id' => $item->sanpham_id,
                    'name' => $item->sanPham->ten_hien_thi,
                    'price' => (float) $item->dongia,
                    'quantity' => $item->soluong,
                    'subtotal' => (float) $item->thanhtien,
                    'image' => $item->sanPham->hinhanh
                ];
            })->toArray();
            $total = (float) $cart->chiTiet()->sum('thanhtien');
        } else {
            $items = session('cart', []);
            $total = collect($items)->sum('subtotal');
        }

        if ($request->expectsJson()) {
            return response()->json(['items' => array_values($items), 'total' => $total]);
        }

        return view('cart.index', ['cart' => $items, 'total' => $total]);
    }

    /**
     * Add an item to the shopping cart.
     */
    public function add(Request $request)
    {
        $validated = $request->validate([
            'sanpham_id' => ['required', 'integer'],
            'quantity' => ['required', 'integer', 'min:1']
        ]);

        $product = SanPham::findOrFail($validated['sanpham_id']);
        if (!$product->hasStock($validated['quantity'])) {
            return $this->handleFailure($request, 'Số lượng tồn không đủ.');
        }

        $customerId = $this->getCustomerId();
        if ($customerId > 0) {
            $cart = GioHang::getOrCreateForCustomer($customerId);
            $cart->addItem($product->sanpham_id, $validated['quantity']);
            $items = $cart->chiTiet->count(); // Simplified for response
        } else {
            $cart = session('cart', []);
            $id = (string) $product->sanpham_id;
            $qty = ($cart[$id]['quantity'] ?? 0) + $validated['quantity'];

            if ($qty > $product->soluongton) {
                return $this->handleFailure($request, 'Số lượng vượt quá tồn kho.');
            }

            $cart[$id] = [
                'sanpham_id' => $product->sanpham_id,
                'name' => $product->ten_hien_thi,
                'price' => (float) $product->gia,
                'quantity' => $qty,
                'subtotal' => (float) $product->gia * $qty,
                'image' => $product->hinhanh
            ];
            session(['cart' => $cart]);
            $items = array_values($cart);
        }

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Đã thêm vào giỏ hàng.', 'cart' => $items]);
        }

        return redirect()->route('customer.cart.index')->with('success', 'Đã thêm vào giỏ hàng.');
    }

    /**
     * Update an item in the shopping cart.
     */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate(['quantity' => ['required', 'integer', 'min:1']]);
        $product = SanPham::findOrFail($id);

        if ($validated['quantity'] > $product->soluongton) {
            return $this->handleFailure($request, 'Số lượng vượt quá tồn kho.');
        }

        $customerId = $this->getCustomerId();
        if ($customerId > 0) {
            $cart = GioHang::getOrCreateForCustomer($customerId);
            $cart->updateItem($id, $validated['quantity']);
        } else {
            $cart = session('cart', []);
            if (!isset($cart[(string)$id])) {
                return $this->handleFailure($request, 'Sản phẩm không có trong giỏ.');
            }

            $cart[(string)$id]['quantity'] = $validated['quantity'];
            $cart[(string)$id]['subtotal'] = $cart[(string)$id]['price'] * $validated['quantity'];
            session(['cart' => $cart]);
        }

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Đã cập nhật giỏ hàng.']);
        }

        return back()->with('success', 'Đã cập nhật giỏ hàng.');
    }

    /**
     * Remove an item from the shopping cart.
     */
    public function remove(Request $request, int $id)
    {
        $customerId = $this->getCustomerId();
        if ($customerId > 0) {
            $cart = GioHang::getOrCreateForCustomer($customerId);
            $cart->chiTiet()->where('sanpham_id', $id)->delete();
        } else {
            $cart = session('cart', []);
            unset($cart[(string)$id]);
            session(['cart' => $cart]);
        }

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Đã xóa sản phẩm.']);
        }

        return back()->with('success', 'Đã xóa sản phẩm khỏi giỏ hàng.');
    }

    private function getCustomerId(): int
    {
        $user = auth()->user();
        if ($user) return (int) $user->khachhang_id;
        return (int) (session('customer.id') ?? 0);
    }

    private function handleFailure(Request $request, string $msg)
    {
        if ($request->expectsJson()) return response()->json(['message' => $msg], 422);
        return back()->with('error', $msg);
    }
}
