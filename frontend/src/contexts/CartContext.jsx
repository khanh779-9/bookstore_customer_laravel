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
  const saveGuestCart = (newItems) => {
    const newTotal = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartData = { items: newItems, total: newTotal };
    setItems(newItems);
    setTotal(newTotal);
    localStorage.setItem('guest_cart', JSON.stringify(cartData));
  };

  // 3. Actions
  const addToCart = async (product, quantity = 1) => {
    const productId = typeof product === 'object' ? product.id : product;

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
      // Guest logic
      const existingItems = [...items];
      const itemIndex = existingItems.findIndex(i => i.sanpham_id === productId);

      if (itemIndex > -1) {
        existingItems[itemIndex].quantity += quantity;
        existingItems[itemIndex].subtotal = existingItems[itemIndex].quantity * existingItems[itemIndex].price;
      } else {
        // We need product info. If 'product' is just an ID, we'd need to fetch it or pass the object.
        // For simplicity, let's assume 'product' passed is the object from ProductCard
        existingItems.push({
          sanpham_id: productId,
          name: product.display_name || product.name,
          price: product.promo_price || product.price,
          quantity: quantity,
          subtotal: (product.promo_price || product.price) * quantity,
          image: product.image
        });
      }
      saveGuestCart(existingItems);
      showToast('Đã thêm vào giỏ hàng (Tạm thời)', 'success');
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (isAuthenticated) {
      try {
        await api.patch(`/cart/${productId}`, { quantity });
        await fetchCart();
      } catch (e) {
        showToast(e.response?.data?.message || 'Lỗi cập nhật giỏ hàng', 'error');
      }
    } else {
      const existingItems = items.map(item => {
        if (item.sanpham_id === productId) {
          return { ...item, quantity, subtotal: quantity * item.price };
        }
        return item;
      });
      saveGuestCart(existingItems);
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        const res = await api.delete(`/cart/${productId}`);
        await fetchCart();
        showToast(res.data.message || 'Đã xóa sản phẩm', 'success');
      } catch (e) {
        showToast(e.response?.data?.message || 'Lỗi xóa sản phẩm', 'error');
      }
    } else {
      const filtered = items.filter(i => i.sanpham_id !== productId);
      saveGuestCart(filtered);
      showToast('Đã xóa sản phẩm', 'success');
    }
  };

  const mergeCart = async () => {
    const guestCart = localStorage.getItem('guest_cart');
    if (!guestCart) return;

    try {
      const parsed = JSON.parse(guestCart);
      if (parsed.items && parsed.items.length > 0) {
        // Send all guest items to a merge endpoint
        await api.post('/cart/merge', { items: parsed.items });
        localStorage.removeItem('guest_cart');
        await fetchCart();
      }
    } catch (e) {
      console.error("Cart merge error:", e);
    }
  };

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
