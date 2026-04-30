import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrash2, FiMinus, FiPlus, FiArrowLeft, 
  FiShoppingBag, FiShield, FiTruck, FiInfo, FiChevronRight, FiArrowRight 
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

export default function Cart() {
  const { cart = [], removeFromCart, updateCartItem, total = 0, isLoading } = useCart();
  const { isAuthenticated } = useAuth();

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    updateCartItem(id, newQty);
  };

  if (isLoading && cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-2xl">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center text-6xl mx-auto mb-8"
        >
          <FiShoppingBag />
        </motion.div>
        <h2 className="text-3xl font-black text-secondary mb-4 serif">Giỏ hàng của bạn đang trống</h2>
        <p className="text-slate-500 mb-10 leading-relaxed">Có vẻ như bạn chưa chọn được cuốn sách nào ưng ý. Hãy khám phá bộ sưu tập mới nhất của chúng tôi!</p>
        <Link to="/products" className="btn-primary px-12 py-4">
          Khám phá ngay <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-black text-secondary serif">Giỏ hàng</h1>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
          <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">{cart.length} sản phẩm</span>
        </div>

        {!isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-5 bg-blue-50/50 border border-blue-100 rounded-[2rem] flex items-center gap-4 text-blue-700"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <FiInfo className="text-lg" />
            </div>
            <p className="text-sm font-bold">Bạn chưa đăng nhập. Giỏ hàng sẽ được lưu tạm trong trình duyệt.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.sanpham_id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-premium transition-all flex flex-col sm:flex-row items-center gap-8"
                  >
                    {/* Image */}
                    <Link to={`/products/${item.sanpham_id}`} className="shrink-0 w-24 h-32 bg-slate-50 rounded-2xl overflow-hidden border border-slate-50 flex items-center justify-center p-3 group-hover:shadow-lg transition-all">
                      <img 
                        src={item.image?.startsWith('http') ? item.image : `/assets/images/products/${item.image || 'defaultProduct.png'}`} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => { e.target.src = '/assets/images/products/defaultProduct.png'; }} 
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-grow min-w-0 text-center sm:text-left">
                      <Link to={`/products/${item.sanpham_id}`} className="block font-black text-secondary hover:text-primary transition-colors text-lg mb-1 truncate">
                        {item.name}
                      </Link>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Sách & Tri thức</div>
                      
                      <div className="text-lg font-black text-secondary">
                        {item.price.toLocaleString('vi-VN')}₫
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-center sm:items-end gap-4">
                      <div className="flex items-center border border-slate-100 rounded-xl p-1 bg-slate-50">
                        <button 
                          onClick={() => handleUpdateQuantity(item.sanpham_id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:text-secondary text-slate-400 transition-all"
                        >
                          <FiMinus />
                        </button>
                        <span className="w-10 text-center font-black text-secondary">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.sanpham_id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:text-secondary text-slate-400 transition-all"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Thành tiền</div>
                          <div className="text-lg font-black text-primary">{(item.price * item.quantity).toLocaleString('vi-VN')}₫</div>
                        </div>
                        
                        <button 
                          onClick={() => {
                            removeFromCart(item.sanpham_id);
                          }}
                          className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Link to="/products" className="inline-flex items-center gap-3 text-slate-400 font-bold text-sm hover:text-secondary transition-all group pt-6">
              <FiArrowLeft className="group-hover:-translate-x-2 transition-transform" /> TIẾP TỤC KHÁM PHÁ
            </Link>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-premium sticky top-24">
              <h3 className="text-2xl font-black text-secondary serif mb-10">Tổng đơn hàng</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Tạm tính</span>
                  <span className="font-black text-secondary">{total.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Giao hàng</span>
                  <span className="font-black text-emerald-500 uppercase tracking-widest text-[10px] bg-emerald-50 px-2 py-1 rounded-md">Miễn phí</span>
                </div>
                <div className="h-[1px] bg-slate-50"></div>
                <div className="flex justify-between items-end">
                  <span className="font-black text-secondary text-lg">Tổng cộng</span>
                  <div className="text-right">
                    <div className="text-4xl font-black text-primary leading-none mb-1">{total.toLocaleString('vi-VN')}₫</div>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Đã bao gồm thuế</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="w-full btn-dark py-5 text-lg shadow-xl shadow-slate-200"
              >
                THANH TOÁN <FiChevronRight />
              </Link>

              <div className="mt-12 space-y-5 pt-10 border-t border-slate-50">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <FiShield className="text-emerald-500 text-xl" />
                  <span>Giao dịch bảo mật & an toàn</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <FiTruck className="text-blue-500 text-xl" />
                  <span>Miễn phí vận chuyển toàn quốc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
