import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Đăng nhập thành công!');
      navigate('/account');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Email hoặc mật khẩu không chính xác');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-gray-200 border border-gray-100 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="text-center mb-10 space-y-2">
            <h1 className="text-3xl font-black text-gray-900 italic tracking-tight">Đăng Nhập</h1>
            <p className="text-sm text-gray-400 font-bold italic">Chào mừng bạn quay trở lại với BookZone</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FiMail />
                </div>
                <input 
                  type="email" 
                  required 
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                  placeholder="Nhập email của bạn"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Mật khẩu</label>
                <Link to="/forgot-password" size="sm" className="text-[10px] font-black text-primary hover:underline italic">Quên mật khẩu?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FiLock />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  className="w-full pl-14 pr-14 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>ĐĂNG NHẬP <FiArrowRight /></>
              )}
            </button>
          </form>

          <div className="mt-10 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]"><span className="px-4 bg-white text-gray-300">Hoặc</span></div>
            </div>

            <button className="w-full border-2 border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm text-gray-600 hover:bg-gray-50 transition-all">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" className="w-5 h-5" alt="Google" />
              Tiếp tục với Google
            </button>

            <div className="text-center text-sm font-bold italic text-gray-400">
              Chưa có tài khoản? <Link to="/register" className="text-primary hover:underline ml-1">Đăng ký ngay</Link>
            </div>
          </div>
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
