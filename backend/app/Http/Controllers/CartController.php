<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Display the shopping cart.
     */
    public function index(Request $request)
    {
        $cart = $this->cartService->getCart($this->getCustomerId());

        if ($request->expectsJson()) return response()->json($cart);
        return view('cart.index', $cart);
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

        try {
            $cart = $this->cartService->addItem($this->getCustomerId(), $validated['sanpham_id'], $validated['quantity']);
            return $this->handleSuccess($request, 'Đã thêm vào giỏ hàng.', $cart);
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }

    /**
     * Update an item in the shopping cart.
     */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate(['quantity' => ['required', 'integer', 'min:1']]);

        try {
            $this->cartService->updateItem($this->getCustomerId(), $id, $validated['quantity']);
            return $this->handleSuccess($request, 'Đã cập nhật giỏ hàng.');
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }

    /**
     * Remove an item from the shopping cart.
     */
    public function remove(Request $request, int $id)
    {
        $this->cartService->removeItem($this->getCustomerId(), $id);
        return $this->handleSuccess($request, 'Đã xóa sản phẩm.');
    }

    /**
     * Merge items from localStorage into database cart.
     */
    public function merge(Request $request)
    {
        $validated = $request->validate([
            'items' => ['required', 'array'],
            'items.*.sanpham_id' => ['required', 'integer'],
            'items.*.quantity' => ['required', 'integer', 'min:1']
        ]);

        try {
            foreach ($validated['items'] as $item) {
                $this->cartService->addItem($this->getCustomerId(), $item['sanpham_id'], $item['quantity']);
            }
            return $this->handleSuccess($request, 'Đã hợp nhất giỏ hàng.');
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }
}
