import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data.cart || []);
      setTotal(res.data.total || 0);
      setCount(res.data.count || 0);
    } catch (e) { /* ignore */ }
  }, []);

  const addToCart = async (sanpham_id, quantity = 1) => {
    try {
      const res = await api.post('/cart', { sanpham_id, quantity });
      setCart(res.data.cart || []);
      setTotal(res.data.total || 0);
      setCount(res.data.count || 0);
      toast.success(res.data.message);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Lỗi thêm giỏ hàng');
    }
  };

  const updateCartItem = async (id, quantity) => {
    try {
      const res = await api.patch(`/cart/${id}`, { quantity });
      setCart(res.data.cart || []);
      setTotal(res.data.total || 0);
      setCount(res.data.count || 0);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Lỗi cập nhật giỏ hàng');
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await api.delete(`/cart/${id}`);
      setCart(res.data.cart || []);
      setTotal(res.data.total || 0);
      setCount(res.data.count || 0);
      toast.success(res.data.message);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Lỗi xóa giỏ hàng');
    }
  };

  return (
    <CartContext.Provider value={{ cart, total, count, fetchCart, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
