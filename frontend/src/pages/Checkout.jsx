import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';
import { FiMapPin, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

export default function Checkout() {
  const { cart, total, fetchCart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
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
    api.get('/addresses').then(res => {
      setAddresses(res.data);
      if (res.data.length > 0) {
        setForm(prev => ({ ...prev, dcgh_id: res.data[0].dcgh_id.toString() }));
      }
    }).catch(() => {});
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
      toast.success(res.data.message);
      await fetchCart();
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi đặt hàng');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="checkout-page">
      <h1>Thanh toán</h1>
      
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Address Selection */}
          <section className="checkout-section">
            <h2><FiMapPin /> Địa chỉ giao hàng</h2>
            {addresses.length === 0 ? (
              <div className="alert-warning">
                Bạn chưa có địa chỉ giao hàng. Vui lòng thêm trong trang Tài khoản trước khi thanh toán.
              </div>
            ) : (
              <div className="address-list">
                {addresses.map(addr => (
                  <label key={addr.dcgh_id} className={`address-option ${form.dcgh_id == addr.dcgh_id ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="dcgh_id" 
                      value={addr.dcgh_id} 
                      checked={form.dcgh_id == addr.dcgh_id}
                      onChange={e => setForm({...form, dcgh_id: e.target.value})} 
                    />
                    <span>{addr.diachi}</span>
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* Payment Method */}
          <section className="checkout-section">
            <h2><FiCreditCard /> Phương thức thanh toán</h2>
            <div className="payment-options">
              <label className={`payment-option ${form.phuongthuc_thanhtoan === 'tien_mat' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="phuongthuc_thanhtoan" 
                  value="tien_mat" 
                  checked={form.phuongthuc_thanhtoan === 'tien_mat'}
                  onChange={e => setForm({...form, phuongthuc_thanhtoan: e.target.value})} 
                />
                <span>💵 Tiền mặt khi nhận hàng (COD)</span>
              </label>
              <label className={`payment-option ${form.phuongthuc_thanhtoan === 'chuyen_khoan' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="phuongthuc_thanhtoan" 
                  value="chuyen_khoan" 
                  checked={form.phuongthuc_thanhtoan === 'chuyen_khoan'}
                  onChange={e => setForm({...form, phuongthuc_thanhtoan: e.target.value})} 
                />
                <span>🏦 Chuyển khoản ngân hàng</span>
              </label>
              <label className={`payment-option ${form.phuongthuc_thanhtoan === 'vi_dien_tu' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="phuongthuc_thanhtoan" 
                  value="vi_dien_tu" 
                  checked={form.phuongthuc_thanhtoan === 'vi_dien_tu'}
                  onChange={e => setForm({...form, phuongthuc_thanhtoan: e.target.value})} 
                />
                <span>📱 Ví điện tử (MoMo/ZaloPay)</span>
              </label>
            </div>
          </section>

          {/* Note */}
          <section className="checkout-section">
            <h2>📝 Ghi chú đơn hàng</h2>
            <textarea 
              rows="3" 
              placeholder="Ghi chú về giao hàng..."
              value={form.ghichu}
              onChange={e => setForm({...form, ghichu: e.target.value})}
            ></textarea>
          </section>

          <button type="submit" className="btn-primary btn-lg btn-full" disabled={loading || addresses.length === 0}>
            <FiCheckCircle /> {loading ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
          </button>
        </form>

        <aside className="checkout-summary">
          <h3>Đơn hàng của bạn</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.sanpham_id} className="summary-item">
                <span className="item-name">{item.name} x{item.quantity}</span>
                <span className="item-price">{item.subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="summary-row">
              <span>Phí giao hàng:</span>
              <span>0₫</span>
            </div>
            <div className="summary-row summary-final">
              <span>Tổng cộng:</span>
              <span>{total.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
