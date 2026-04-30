import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../api/client';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  // 1. Initial Load
  const fetchCart = useCallback(async () => {
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        const res = await api.get('/cart');
        setItems(res.data.items || []);
        setTotal(res.data.total || 0);
      } catch (e) {
        console.error("Cart fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    } else {
      const savedCart = localStorage.getItem('guest_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        setItems(parsed.items || []);
        setTotal(parsed.total || 0);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // 2. Helper to save guest cart
  const saveGuestCart = useCallback((newItems) => {
    const newTotal = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartData = { items: newItems, total: newTotal };
    setItems(newItems);
    setTotal(newTotal);
    localStorage.setItem('guest_cart', JSON.stringify(cartData));
  }, []);

  const mergeCart = useCallback(async () => {
    const guestCart = localStorage.getItem('guest_cart');
    if (!guestCart) return;

    try {
      const parsed = JSON.parse(guestCart);
      if (parsed.items && parsed.items.length > 0) {
        await api.post('/cart/merge', { items: parsed.items });
        localStorage.removeItem('guest_cart');
        await fetchCart();
      }
    } catch (e) {
      console.error("Cart merge error:", e);
    }
  }, [fetchCart]);

  // Auto-merge when logged in
  useEffect(() => {
    if (isAuthenticated) {
      mergeCart();
    }
  }, [isAuthenticated, mergeCart]);

  // 3. Actions
  const addToCart = useCallback(async (product, quantity = 1) => {
    // Robust ID resolution: handle both API resource 'id' and cart item 'sanpham_id'
    const rawId = typeof product === 'object' ? (product.sanpham_id || product.id) : product;
    const productId = Number(rawId);

    if (!productId) {
      console.error("Invalid Product ID:", product);
      return showToast('ID sản phẩm không hợp lệ', 'error');
    }

    if (isAuthenticated) {
      try {
        const res = await api.post('/cart', { sanpham_id: productId, quantity });
        if (res.data.cart) {
          setItems(res.data.cart.items || []);
          setTotal(res.data.cart.total || 0);
        } else {
          await fetchCart();
        }
        showToast(res.data.message || 'Đã thêm vào giỏ hàng', 'success');
      } catch (e) {
        showToast(e.response?.data?.message || 'Lỗi thêm vào giỏ hàng', 'error');
      }
    } else {
      setItems(prevItems => {
        const existingItems = [...prevItems];
        const itemIndex = existingItems.findIndex(i => Number(i.sanpham_id) === productId);

        if (itemIndex > -1) {
          const updatedItem = { ...existingItems[itemIndex] };
          updatedItem.quantity += quantity;
          updatedItem.subtotal = updatedItem.quantity * updatedItem.price;
          existingItems[itemIndex] = updatedItem;
        } else {
          existingItems.push({
            sanpham_id: productId,
            name: product.display_name || product.name,
            price: Number(product.promo_price || product.price),
            quantity: quantity,
            subtotal: Number(product.promo_price || product.price) * quantity,
            image: product.image
          });
        }
        
        const newTotal = existingItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(newTotal);
        localStorage.setItem('guest_cart', JSON.stringify({ items: existingItems, total: newTotal }));
        return existingItems;
      });
      showToast('Đã thêm vào giỏ hàng (Tạm thời)', 'success');
    }
  }, [isAuthenticated, fetchCart, showToast]);

  const updateCartItem = useCallback(async (productId, quantity) => {
    const id = Number(productId);
    if (isAuthenticated) {
      try {
        await api.patch(`/cart/${id}`, { quantity });
        await fetchCart();
      } catch (e) {
        showToast(e.response?.data?.message || 'Lỗi cập nhật giỏ hàng', 'error');
      }
    } else {
      setItems(prevItems => {
        const updated = prevItems.map(item => {
          if (Number(item.sanpham_id) === id) {
            return { ...item, quantity, subtotal: quantity * item.price };
          }
          return item;
        });
        const newTotal = updated.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(newTotal);
        localStorage.setItem('guest_cart', JSON.stringify({ items: updated, total: newTotal }));
        return updated;
      });
    }
  }, [isAuthenticated, fetchCart, showToast]);

  const removeFromCart = useCallback(async (productId) => {
    const id = Number(productId);
    if (isAuthenticated) {
      try {
        const res = await api.delete(`/cart/${id}`);
        await fetchCart();
        showToast(res.data.message || 'Đã xóa sản phẩm', 'success');
      } catch (e) {
        showToast(e.response?.data?.message || 'Lỗi xóa sản phẩm', 'error');
      }
    } else {
      setItems(prevItems => {
        const filtered = prevItems.filter(i => Number(i.sanpham_id) !== id);
        const newTotal = filtered.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(newTotal);
        localStorage.setItem('guest_cart', JSON.stringify({ items: filtered, total: newTotal }));
        return filtered;
      });
      showToast('Đã xóa sản phẩm', 'success');
    }
  }, [isAuthenticated, fetchCart, showToast]);

  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart: items, 
      items, 
      total, 
      count, 
      isLoading,
      fetchCart, 
      addToCart, 
      updateCartItem, 
      removeFromCart,
      mergeCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
