import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft, FiShoppingBag, FiShield, FiTruck, FiInfo, FiChevronRight, FiArrowRight,
} from "react-icons/fi";
import { Loading } from "@/shared/ui";
import { ConfirmModal } from "@/shared/ui";
import { useState, useCallback } from "react";
import { formatCurrency } from "../utils/format";
import CartItem from "../components/Cart/CartItem";

export default function Cart() {
  const { cart = [], removeFromCart, updateCartItem, total = 0, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, id: null });

  const handleRemove = useCallback((id) => setConfirmDelete({ isOpen: true, id }), []);
  const onConfirmDelete = useCallback(() => {
    removeFromCart(confirmDelete.id);
    setConfirmDelete({ isOpen: false, id: null });
  }, [confirmDelete.id, removeFromCart]);

  const handleUpdateQuantity = useCallback((id, qty) => {
    if (qty < 1) return;
    updateCartItem(id, qty);
  }, [updateCartItem]);

  if (isLoading && cart.length === 0) return <Loading message="Đang lấy giỏ hàng..." />;

  if (cart.length === 0) return <EmptyCartView />;

  return (
    <div className="bg-background min-h-screen pb-32 lg:pb-12">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-slate-100 pb-8">
          <div>
            <h1 className="text-4xl font-black text-secondary uppercase tracking-tight">Giỏ hàng của bạn</h1>
            <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-2">{cart.length} sản phẩm đang chờ</p>
          </div>
          {!isAuthenticated && (
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-sm text-[10px] font-black uppercase tracking-widest">
              <FiInfo className="text-primary" size={16} />
              <span>Đăng nhập để lưu giỏ hàng vĩnh viễn</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* List Section */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <CartItem 
                  key={item.sanpham_id} 
                  item={item} 
                  onUpdateQuantity={handleUpdateQuantity} 
                  onRemove={handleRemove} 
                />
              ))}
            </AnimatePresence>

            <Link to="/products" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest mt-6 transition-colors">
              <FiArrowLeft size={16} /> Tiếp tục mua sắm
            </Link>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 border border-slate-200 rounded-sm sticky top-24 shadow-2xl shadow-slate-200/50">
              <h3 className="font-black text-xl mb-8 uppercase tracking-tight border-b border-slate-50 pb-4">Tóm tắt đơn hàng</h3>

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between font-bold text-slate-500">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-500">
                  <span>Phí vận chuyển</span>
                  <span>MIỄN PHÍ</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-black mb-10 pt-6 border-t border-slate-100">
                <span>Tổng cộng</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>

              <Link to="/checkout" className="w-full bg-slate-900 text-white py-5 rounded-sm font-black text-sm uppercase tracking-widest flex justify-center items-center gap-3 hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95">
                Tiến hành thanh toán <FiChevronRight size={18} />
              </Link>

              <div className="mt-8 space-y-4 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <FiShield className="text-emerald-500" size={16} /> Bảo mật thanh toán 100%
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <FiTruck className="text-blue-500" size={16} /> Giao hàng hỏa tốc trong ngày
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between lg:hidden shadow-2xl shadow-slate-900/10">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng tiền</p>
          <p className="text-xl font-black text-primary">{formatCurrency(total)}</p>
        </div>
        <Link to="/checkout" className="bg-primary text-white px-8 py-4 rounded-sm font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
          Thanh toán
        </Link>
      </div>

      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, id: null })}
        onConfirm={onConfirmDelete}
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa cuốn sách này khỏi giỏ hàng không?"
        confirmText="Xóa ngay"
        type="danger"
      />
    </div>
  );
}

function EmptyCartView() {
  return (
    <div className="container mx-auto px-4 py-32 text-center max-w-2xl">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-32 h-32 bg-slate-50 text-slate-100 rounded-full flex items-center justify-center text-6xl mx-auto mb-8">
        <FiShoppingBag />
      </motion.div>
      <h2 className="text-3xl font-black text-secondary mb-4 uppercase tracking-tight">Giỏ hàng của bạn đang trống</h2>
      <p className="text-slate-400 mb-10 font-medium">Có vẻ như bạn chưa chọn được cuốn sách nào ưng ý. Hãy dạo quanh cửa hàng của chúng tôi nhé!</p>
      <Link to="/products" className="btn-dark px-12 py-5 inline-flex items-center gap-3">
        Tiếp tục mua sắm <FiArrowRight />
      </Link>
    </div>
  );
}
