<?php

namespace App\Services;

use App\Models\GioHang;
use App\Models\SanPham;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class CartService
{
    /**
     * Get cart data (items and total).
     */
    public function getCart(int $customerId): array
    {
        if ($customerId > 0) {
            $cart = GioHang::getOrCreateForCustomer($customerId);
            $items = $cart->chiTiet()->with('sanPham.sach', 'sanPham.vanPhongPham')->get()->map(function($item) {
                return [
                    'sanpham_id' => $item->sanpham_id,
                    'name' => $item->sanPham->ten_hien_thi,
                    'price' => (float) $item->dongia,
                    'quantity' => (int) $item->soluong,
                    'subtotal' => (float) $item->thanhtien,
                    'image' => $item->sanPham->hinhanh
                ];
            })->toArray();
            $total = (float) $cart->chiTiet()->sum('thanhtien');
        } else {
            $items = Session::get('cart', []);
            $total = collect($items)->sum('subtotal');
        }

        return [
            'items' => array_values($items),
            'total' => $total
        ];
    }

    /**
     * Add item to cart.
     */
    public function addItem(int $customerId, int $productId, int $quantity): array
    {
        $product = SanPham::findOrFail($productId);
        
        if ($customerId > 0) {
            return DB::transaction(function() use ($customerId, $productId, $quantity, $product) {
                $cart = GioHang::getOrCreateForCustomer($customerId);
                $item = $cart->chiTiet()->where('sanpham_id', $productId)->first();
                
                if ($item) {
                    $newQty = $item->soluong + $quantity;
                    if ($newQty > $product->soluongton) throw new \Exception('Số lượng vượt quá tồn kho.');
                    $item->update([
                        'soluong' => $newQty,
                        'thanhtien' => $newQty * $item->dongia,
                    ]);
                } else {
                    if ($quantity > $product->soluongton) throw new \Exception('Số lượng vượt quá tồn kho.');
                    $cart->chiTiet()->create([
                        'sanpham_id' => $productId,
                        'soluong' => $quantity,
                        'dongia' => (float) $product->gia,
                        'thanhtien' => $quantity * (float) $product->gia,
                    ]);
                }
                $cart->refreshCount();
                return $this->getCart($customerId);
            });
        } else {
            $cart = Session::get('cart', []);
            $id = (string) $productId;
            $qty = ($cart[$id]['quantity'] ?? 0) + $quantity;

            if ($qty > $product->soluongton) throw new \Exception('Số lượng vượt quá tồn kho.');

            $cart[$id] = [
                'sanpham_id' => $product->sanpham_id,
                'name' => $product->ten_hien_thi,
                'price' => (float) $product->gia,
                'quantity' => $qty,
                'subtotal' => (float) $product->gia * $qty,
                'image' => $product->hinhanh
            ];
            Session::put('cart', $cart);
            return $this->getCart(0);
        }
    }

    /**
     * Update item quantity.
     */
    public function updateItem(int $customerId, int $productId, int $quantity): void
    {
        $product = SanPham::findOrFail($productId);
        if ($quantity > $product->soluongton) throw new \Exception('Số lượng vượt quá tồn kho.');

        if ($customerId > 0) {
            DB::transaction(function() use ($customerId, $productId, $quantity) {
                $cart = GioHang::getOrCreateForCustomer($customerId);
                if ($quantity <= 0) {
                    $cart->chiTiet()->where('sanpham_id', $productId)->delete();
                } else {
                    $item = $cart->chiTiet()->where('sanpham_id', $productId)->first();
                    if ($item) {
                        $item->update([
                            'soluong' => $quantity,
                            'thanhtien' => $quantity * $item->dongia,
                        ]);
                    }
                }
                $cart->refreshCount();
            });
        } else {
            $cart = Session::get('cart', []);
            if (!isset($cart[(string)$productId])) throw new \Exception('Sản phẩm không có trong giỏ.');

            if ($quantity <= 0) {
                unset($cart[(string)$productId]);
            } else {
                $cart[(string)$productId]['quantity'] = $quantity;
                $cart[(string)$productId]['subtotal'] = $cart[(string)$productId]['price'] * $quantity;
            }
            Session::put('cart', $cart);
        }
    }

    /**
     * Remove item from cart.
     */
    public function removeItem(int $customerId, int $productId): void
    {
        if ($customerId > 0) {
            $cart = GioHang::getOrCreateForCustomer($customerId);
            $cart->chiTiet()->where('sanpham_id', $productId)->delete();
            $cart->refreshCount();
        } else {
            $cart = Session::get('cart', []);
            unset($cart[(string)$productId]);
            Session::put('cart', $cart);
        }
    }

    /**
     * Merge session cart into database cart after login.
     */
    public function mergeGuestCart(int $customerId): void
    {
        $sessionCart = Session::get('cart', []);
        if (empty($sessionCart)) return;

        foreach ($sessionCart as $productId => $item) {
            try {
                $this->addItem($customerId, (int)$productId, (int)$item['quantity']);
            } catch (\Exception $e) {
                // Skip if stock issues during merge, or handle as needed
                logger()->warning("Failed to merge cart item $productId: " . $e->getMessage());
            }
        }

        Session::forget('cart');
    }
}
