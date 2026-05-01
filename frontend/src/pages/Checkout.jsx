import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/client';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { 
  FiMapPin, FiCreditCard, FiCheckCircle, FiChevronRight, 
  FiArrowLeft, FiShoppingBag, FiTruck, FiShield 
} from 'react-icons/fi';
import { cn } from '../utils/cn';
import Loading from '../components/Common/Loading';
import TextArea from '../components/Common/TextArea';

 export default function Checkout() {
  const { showToast } = useToast();
  const { cart = [], total, fetchCart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [form, setForm] = useState({
    dcgh_id: '',
    phuongthuc_thanhtoan: 'tien_mat',
    ghichu: ''
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
    setPageLoading(true);
    api.get('/addresses').then(res => {
      setAddresses(res.data);
      if (res.data.length > 0) {
        setForm(prev => ({ ...prev, dcgh_id: res.data[0].dcgh_id.toString() }));
      }
    }).catch(() => {}).finally(() => setPageLoading(false));
  }, [cart.length, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        dcgh_id: form.dcgh_id ? parseInt(form.dcgh_id) : null
      };
      const res = await api.post('/orders', payload);
      showToast(res.data.message, "success");
      await fetchCart();
      navigate('/orders');
    } catch (err) {
      showToast(err.response?.data?.message || 'Lỗi đặt hàng', "error");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null;
  if (pageLoading) return <Loading message="Đang chuẩn bị trang thanh toán..." />;

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/cart" className="w-12 h-12 rounded-none bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-none">
            <FiArrowLeft />
          </Link>
          <h1 className="text-4xl font-black text-secondary serif">Thanh toán</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Form */}
          <div className="lg:col-span-7 space-y-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Delivery Address */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-blue-50 text-blue-500 flex items-center justify-center">
                    <FiMapPin />
                  </div>
                  <h2 className="text-xl font-black text-secondary serif">Địa chỉ giao hàng</h2>
                </div>

                {addresses.length === 0 ? (
                  <div className="p-8 bg-amber-50 border border-amber-100 rounded-none text-amber-700 text-sm font-bold flex flex-col items-center text-center gap-4">
                    <p>Bạn chưa có địa chỉ giao hàng nào được lưu.</p>
                    <Link to="/account" className="btn-dark py-3 px-8 text-xs">Thêm địa chỉ ngay</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {addresses.map(addr => (
                      <label 
                        key={addr.dcgh_id} 
                        className={cn(
                          "relative p-6 rounded-none border-2 transition-all cursor-pointer flex items-center gap-4",
                          form.dcgh_id == addr.dcgh_id 
                            ? "bg-white border-primary shadow-none shadow-primary/5" 
                            : "bg-white border-slate-50 hover:border-slate-200"
                        )}
                      >
                        <input 
                          type="radio" 
                          name="dcgh_id" 
                          value={addr.dcgh_id} 
                          checked={form.dcgh_id == addr.dcgh_id}
                          onChange={e => setForm({...form, dcgh_id: e.target.value})} 
                          className="w-5 h-5 accent-primary"
                        />
                        <div className="flex-grow">
                          <p className="font-bold text-secondary">{addr.diachi}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Mặc định</p>
                        </div>
                        {form.dcgh_id == addr.dcgh_id && (
                          <FiCheckCircle className="text-primary text-xl" />
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </motion.section>

              {/* Payment Methods */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <FiCreditCard />
                  </div>
                  <h2 className="text-xl font-black text-secondary serif">Phương thức thanh toán</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PaymentOption 
                    active={form.phuongthuc_thanhtoan === 'tien_mat'}
                    onClick={() => setForm({...form, phuongthuc_thanhtoan: 'tien_mat'})}
                    icon="💵"
                    title="Tiền mặt (COD)"
                    desc="Thanh toán khi nhận hàng"
                  />
                  <PaymentOption 
                    active={form.phuongthuc_thanhtoan === 'chuyen_khoan'}
                    onClick={() => setForm({...form, phuongthuc_thanhtoan: 'chuyen_khoan'})}
                    icon="🏦"
                    title="Chuyển khoản"
                    desc="Nhanh chóng & an toàn"
                  />
                </div>
              </motion.section>

              {/* Notes */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-black text-secondary serif">Ghi chú đơn hàng</h2>
                <TextArea 
                  placeholder="Bạn có yêu cầu đặc biệt gì cho đơn hàng này không?"
                  value={form.ghichu}
                  onChange={e => setForm({...form, ghichu: e.target.value})}
                />
              </motion.section>

              <button 
                type="submit" 
                className="w-full btn-dark py-6 text-lg shadow-none shadow-slate-200" 
                disabled={loading || addresses.length === 0}
              >
                {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng'} <FiChevronRight />
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-none p-10 border border-slate-100 shadow-none sticky top-24"
            >
              <h3 className="text-2xl font-black text-secondary serif mb-8">Tóm tắt đơn hàng</h3>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.sanpham_id} className="flex gap-4">
                    <div className="w-16 h-20 bg-slate-50 rounded-none overflow-hidden p-2 flex-shrink-0">
                      <img src={`/assets/images/products/${item.image || 'defaultProduct.png'}`} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-secondary text-sm line-clamp-1">{item.name}</p>
                      <p className="text-xs text-slate-400 font-bold mt-1">x{item.quantity}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-black text-secondary text-sm">{(item.price * item.quantity).toLocaleString('vi-VN')}₫</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-50">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Tạm tính</span>
                  <span className="font-black text-secondary">{total.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Phí giao hàng</span>
                  <span className="font-black text-emerald-500 uppercase tracking-widest text-[10px] bg-emerald-50 px-2 py-1 rounded-none">Miễn phí</span>
                </div>
                <div className="h-[1px] bg-slate-50 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="font-black text-secondary text-xl">Tổng thanh toán</span>
                  <div className="text-right">
                    <div className="text-4xl font-black text-primary leading-none">{total.toLocaleString('vi-VN')}₫</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4 pt-10 border-t border-slate-50">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <FiShield className="text-emerald-500 text-xl" />
                  <span>Cam kết bảo mật thông tin</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <FiTruck className="text-blue-500 text-xl" />
                  <span>Giao hàng tiêu chuẩn (2-3 ngày)</span>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentOption({ active, onClick, icon, title, desc }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-6 rounded-none border-2 cursor-pointer transition-all flex items-center gap-5",
        active ? "bg-white border-primary shadow-none shadow-primary/5" : "bg-white border-slate-50 hover:border-slate-100"
      )}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="font-black text-secondary text-sm">{title}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{desc}</p>
      </div>
    </div>
  );
}



