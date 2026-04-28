import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag, FiShield, FiTruck, FiInfo } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cart = [], removeFromCart, updateCartItem, total = 0 } = useCart();
  const { isAuthenticated } = useAuth();

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    updateCartItem(id, newQty);
  };

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
          <FiShoppingBag />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 italic">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 mb-8 italic">Đừng để giỏ hàng cô đơn, hãy thêm gì đó thật ý nghĩa nhé!</p>
        <Link 
          to="/products" 
          className="inline-block bg-primary text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all"
        >
          TIẾP TỤC MUA SẮM
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 italic tracking-tight">Giỏ hàng</h1>
        <span className="text-sm font-bold text-gray-400 italic">({cart.length} sản phẩm)</span>
      </div>

      {!isAuthenticated && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4 text-blue-600">
          <FiInfo className="text-xl shrink-0" />
          <p className="text-sm font-bold italic">Bạn chưa đăng nhập. Giỏ hàng sẽ được lưu tạm trong phiên này.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Sản phẩm</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400 text-center hidden md:table-cell">Đơn giá</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400 text-center">Số lượng</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400 text-end">Thành tiền</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400 text-center">Xóa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {cart.map((item) => (
                  <tr key={item.sanpham_id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <Link to={`/products/${item.sanpham_id}`} className="shrink-0 w-20 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                          <img 
                            src={`/assets/images/${item.hinhanh || 'products/defaultProduct.png'}`} 
                            alt={item.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = '/assets/images/products/defaultProduct.png'; }} 
                          />
                        </Link>
                        <div className="min-w-0">
                          <Link to={`/products/${item.sanpham_id}`} className="font-black text-gray-900 hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">
                            {item.name}
                          </Link>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tight">{item.type || 'Khác'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center hidden md:table-cell">
                      <span className="font-bold text-gray-400 text-sm italic">{item.gia.toLocaleString('vi-VN')}₫</span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center justify-center border-2 border-gray-100 rounded-xl p-1 bg-white mx-auto w-fit">
                        <button 
                          onClick={() => handleUpdateQuantity(item.sanpham_id, item.soluong - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <input 
                          type="number" 
                          value={item.soluong} 
                          readOnly
                          className="w-10 text-center font-black text-sm bg-transparent"
                        />
                        <button 
                          onClick={() => handleUpdateQuantity(item.sanpham_id, item.soluong + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-end">
                      <span className="font-black text-primary italic">{(item.gia * item.soluong).toLocaleString('vi-VN')}₫</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <button 
                        onClick={() => {
                          if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                            removeFromCart(item.sanpham_id);
                            toast.success('Đã xóa khỏi giỏ hàng');
                          }
                        }}
                        className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 font-black text-sm hover:text-primary transition-colors group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> TIẾP TỤC MUA SẮM
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm sticky top-24">
            <h3 className="text-xl font-black text-gray-900 italic mb-8">Tóm tắt đơn hàng</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold text-gray-400 italic">
                <span>Tạm tính</span>
                <span className="text-gray-900">{total.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-400 italic">
                <span>Phí vận chuyển</span>
                <span className="text-green-500">Miễn phí</span>
              </div>
              
              <div className="pt-6 border-t border-gray-50 flex justify-between items-end">
                <span className="font-black text-gray-900">Tổng cộng</span>
                <div className="text-right">
                  <div className="text-3xl font-black text-primary italic leading-none">{total.toLocaleString('vi-VN')}₫</div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-2 italic">Đã bao gồm VAT</p>
                </div>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="block w-full mt-10 bg-primary text-white text-center font-black py-5 rounded-2xl shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-100 transition-all text-lg"
            >
              THANH TOÁN NGAY
            </Link>

            <div className="mt-8 space-y-4 pt-8 border-t border-gray-50">
              <div className="flex items-center gap-3 text-xs text-gray-500 font-bold italic">
                <FiShield className="text-green-500 text-lg" /> Bảo mật thông tin thanh toán
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-bold italic">
                <FiTruck className="text-blue-500 text-lg" /> Miễn phí giao hàng đơn từ 500k
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
