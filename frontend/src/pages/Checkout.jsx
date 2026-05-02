import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/client';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { FiArrowLeft, FiChevronRight, FiShield, FiTruck, FiCreditCard } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { Loading, TextArea } from "@/shared/ui";
import { formatCurrency, formatProductImage } from '../utils/format';
import CheckoutAddressSection from '../components/Checkout/CheckoutAddressSection';

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
    if (cart.length === 0) { navigate('/cart'); return; }
    setPageLoading(true);
    api.get('/addresses')
      .then(res => {
        setAddresses(res.data);
        if (res.data.length > 0) {
          const def = res.data.find(a => a.is_default) || res.data[0];
          setForm(prev => ({ ...prev, dcgh_id: def.dcgh_id.toString() }));
        }
      })
      .catch(() => {})
      .finally(() => setPageLoading(false));
  }, [cart.length, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.dcgh_id) return showToast("Vui lòng chọn địa chỉ giao hàng", "error");
    
    setLoading(true);
    try {
      const res = await api.post('/orders', {
        ...form,
        dcgh_id: parseInt(form.dcgh_id)
      });
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-10">
          <div className="flex items-center gap-6">
            <Link to="/cart" className="p-3 text-slate-400 hover:text-primary transition-all bg-white border border-slate-100 rounded-sm">
              <FiArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-4xl font-black text-secondary uppercase tracking-tight">Thanh toán</h1>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-2">Bước cuối cùng để sở hữu sách</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Flow */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-12">
              <CheckoutAddressSection 
                addresses={addresses} 
                selectedId={form.dcgh_id} 
                onSelect={(id) => setForm(f => ({ ...f, dcgh_id: id }))} 
              />

              <CheckoutPaymentSection 
                value={form.phuongthuc_thanhtoan} 
                onChange={(val) => setForm(f => ({ ...f, phuongthuc_thanhtoan: val }))} 
              />

              <section className="space-y-6">
                <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">3. Ghi chú đơn hàng</h2>
                <TextArea 
                  placeholder="Yêu cầu đặc biệt cho shipper hoặc nhà sách..."
                  value={form.ghichu}
                  onChange={e => setForm(f => ({ ...f, ghichu: e.target.value }))}
                  className="bg-white border-slate-200"
                />
              </section>

              <button 
                type="submit" 
                className="w-full bg-slate-900 text-white py-6 text-sm font-black uppercase tracking-widest rounded-sm shadow-2xl shadow-slate-200 transition-all hover:bg-slate-800 hover:scale-[1.01] active:scale-95 disabled:grayscale" 
                disabled={loading || addresses.length === 0}
              >
                {loading ? 'Đang khởi tạo đơn hàng...' : 'Xác nhận & Thanh toán'}
              </button>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <aside className="sticky top-24 space-y-6">
              <OrderSummary cart={cart} total={total} />
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-sm space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <FiShield className="text-emerald-500" size={18} /> Giao dịch bảo mật 256-bit SSL
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <FiTruck className="text-blue-500" size={18} /> Giao hàng tiêu chuẩn 2-3 ngày
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Internal Components --- */

function CheckoutPaymentSection({ value, onChange }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">2. Phương thức thanh toán</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PaymentMethodCard 
          active={value === 'tien_mat'} 
          onClick={() => onChange('tien_mat')}
          icon="💵" title="Tiền mặt (COD)" desc="Thanh toán khi nhận hàng"
        />
        <PaymentMethodCard 
          active={value === 'chuyen_khoan'} 
          onClick={() => onChange('chuyen_khoan')}
          icon="🏦" title="Chuyển khoản" desc="An toàn & Xác nhận nhanh"
        />
      </div>
    </section>
  );
}

function PaymentMethodCard({ active, onClick, icon, title, desc }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-6 rounded-sm border-2 cursor-pointer transition-all flex items-center gap-5",
        active ? "bg-white border-slate-900 shadow-xl shadow-slate-100" : "bg-white border-slate-100 hover:border-slate-300"
      )}
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="font-black text-secondary text-sm uppercase tracking-tight">{title}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{desc}</p>
      </div>
    </div>
  );
}

function OrderSummary({ cart, total }) {
  return (
    <div className="bg-white p-8 border border-slate-200 rounded-sm shadow-xl shadow-slate-100">
      <h3 className="text-xl font-black text-secondary uppercase tracking-tight mb-8 border-b border-slate-50 pb-4">Tóm tắt đơn hàng</h3>
      
      <div className="space-y-6 max-h-[350px] overflow-y-auto pr-3 mb-8 custom-scrollbar">
        {cart.map(item => (
          <div key={item.sanpham_id} className="flex gap-4 group">
            <div className="w-14 h-20 bg-slate-50 rounded-sm overflow-hidden p-1 flex-shrink-0 border border-slate-100">
              <img src={formatProductImage(item.image)} className="w-full h-full object-contain" />
            </div>
            <div className="flex-grow min-w-0 flex flex-col justify-between py-1">
              <p className="font-bold text-secondary text-sm line-clamp-1 group-hover:text-primary transition-colors uppercase tracking-tight">{item.name}</p>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-slate-400">SỐ LƯỢNG: {item.quantity}</span>
                <span className="font-black text-secondary text-sm">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-slate-100">
        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span>Tạm tính</span>
          <span className="text-secondary">{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between text-xs font-bold text-emerald-500 uppercase tracking-widest">
          <span>Phí vận chuyển</span>
          <span>Miễn phí</span>
        </div>
        <div className="h-px bg-slate-100 my-2"></div>
        <div className="flex justify-between items-end">
          <span className="font-black text-secondary text-base uppercase tracking-tight">Tổng thanh toán</span>
          <span className="text-3xl font-black text-primary tracking-tighter">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
