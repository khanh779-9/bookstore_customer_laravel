<?php

namespace App\Http\Controllers;

use App\Models\SanPham;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cart = session('cart', []);
        $total = collect($cart)->sum(fn ($item) => $item['subtotal']);

        return view('cart.index', [
            'cart' => $cart,
            'total' => $total,
        ]);
    }

    public function add(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'sanpham_id' => ['required', 'integer'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = SanPham::with(['sach', 'vanPhongPham'])
            ->where('sanpham_id', $validated['sanpham_id'])
            ->firstOrFail();

        if ($product->soluongton < $validated['quantity']) {
            return back()->with('error', 'Số lượng tồn không đủ.');
        }

        $cart = session('cart', []);
        $key = (string) $product->sanpham_id;
        $currentQty = $cart[$key]['quantity'] ?? 0;
        $newQty = $currentQty + $validated['quantity'];

        if ($newQty > $product->soluongton) {
            return back()->with('error', 'Số lượng vượt quá tồn kho.');
        }

        $price = (float) $product->gia;

        $cart[$key] = [
            'sanpham_id' => $product->sanpham_id,
            'name' => $product->ten_hien_thi,
            'price' => $price,
            'quantity' => $newQty,
            'subtotal' => $price * $newQty,
        ];

        session(['cart' => $cart]);

        return redirect()->route('customer.cart.index')->with('success', 'Đã thêm vào giỏ hàng.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = SanPham::where('sanpham_id', $id)->firstOrFail();

        if ($validated['quantity'] > $product->soluongton) {
            return back()->with('error', 'Số lượng vượt quá tồn kho.');
        }

        $cart = session('cart', []);
        $key = (string) $id;

        if (! isset($cart[$key])) {
            return back()->with('error', 'Sản phẩm không tồn tại trong giỏ.');
        }

        $cart[$key]['quantity'] = $validated['quantity'];
        $cart[$key]['subtotal'] = $cart[$key]['price'] * $validated['quantity'];

        session(['cart' => $cart]);

        return back()->with('success', 'Đã cập nhật giỏ hàng.');
    }

    public function remove(int $id): RedirectResponse
    {
        $cart = session('cart', []);
        unset($cart[(string) $id]);
        session(['cart' => $cart]);

        return back()->with('success', 'Đã xóa sản phẩm khỏi giỏ hàng.');
    }
}
