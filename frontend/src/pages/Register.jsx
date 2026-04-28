import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiArrowRight, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({
    ho: '', tendem: '', ten: '',
    email: '', password: '', password_confirmation: '',
    sdt: '', diachi: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      return toast.error('Mật khẩu xác nhận không khớp');
    }

    setLoading(true);
    try {
      await api.post('/register', form);
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi đăng ký tài khoản');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[90vh]">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-gray-200 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-24 -mt-24 blur-3xl"></div>
          
          <div className="text-center mb-10 space-y-2 relative z-10">
            <h1 className="text-3xl font-black text-gray-900 italic tracking-tight">Tạo Tài Khoản</h1>
            <p className="text-sm text-gray-400 font-bold italic">Bắt đầu hành trình khám phá kho tàng tri thức</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Họ</label>
                <input 
                  type="text" required 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                  placeholder="Họ"
                  value={form.ho}
                  onChange={e => setForm({...form, ho: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tên đệm</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                  placeholder="Tên đệm"
                  value={form.tendem}
                  onChange={e => setForm({...form, tendem: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tên</label>
                <input 
                  type="text" required 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                  placeholder="Tên"
                  value={form.ten}
                  onChange={e => setForm({...form, ten: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiMail /> Email</label>
                <input 
                  type="email" required 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiPhone /> Số điện thoại</label>
                <input 
                  type="tel" 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                  placeholder="09xx xxx xxx"
                  value={form.sdt}
                  onChange={e => setForm({...form, sdt: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiLock /> Mật khẩu</label>
                <div className="relative group">
                  <input 
                    type={showPassword ? 'text' : 'password'} required 
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold pr-14"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiLock /> Xác nhận mật khẩu</label>
                <input 
                  type={showPassword ? 'text' : 'password'} required 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                  placeholder="••••••••"
                  value={form.password_confirmation}
                  onChange={e => setForm({...form, password_confirmation: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiMapPin /> Địa chỉ</label>
              <textarea 
                rows="2"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold resize-none"
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                value={form.diachi}
                onChange={e => setForm({...form, diachi: e.target.value})}
              />
            </div>

            <div className="pt-6 flex flex-col md:flex-row items-center gap-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:flex-1 bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <>ĐĂNG KÝ NGAY <FiArrowRight /></>}
              </button>
              <div className="text-sm font-bold italic text-gray-400">
                Đã có tài khoản? <Link to="/login" className="text-primary hover:underline ml-1">Đăng nhập</Link>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs font-black text-gray-400 hover:text-gray-600 flex items-center justify-center gap-2 transition-colors">
            <FiArrowLeft /> QUAY LẠI TRANG CHỦ
          </Link>
        </div>
      </div>
    </div>
  );
}
