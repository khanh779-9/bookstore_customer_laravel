import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { useToast } from '../../contexts/ToastContext';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';

 export default function EmployeeLogin() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState({ ma_nhan_vien: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/employee/login', form);
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('auth_user', JSON.stringify(res.data.data));
      showToast('Đăng nhập quản trị thành công!', 'success');
      navigate('/internal/dashboard');
      setTimeout(() => {
        window.location.reload(); 
      }, 500);
    } catch (err) {
      showToast(err.response?.data?.message || 'Đăng nhập thất bại', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10">
      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-sm shadow-xl p-8 md:p-10 space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl mb-6 shadow-inner">
              <FiLock />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">HỆ THỐNG QUẢN TRỊ</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Vui lòng đăng nhập để tiếp tục</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Mã nhân viên</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                   type="text" 
                  value={form.ma_nhan_vien} 
                  onChange={e => setForm({...form, ma_nhan_vien: e.target.value})} 
                  required 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all placeholder:text-slate-400 text-sm"
                  placeholder="Nhập mã nhân viên của bạn"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Mật khẩu</label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  value={form.password} 
                  onChange={e => setForm({...form, password: e.target.value})} 
                  required 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all placeholder:text-slate-400 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-sm shadow-lg shadow-slate-200 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none cursor-pointer"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <FiLogIn /> Đăng nhập hệ thống
                </>
              )}
            </button>
          </form>

          <div className="pt-6 text-center border-t border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
              © 2026 BookStore Management <br/>
              TRUY CẬP HẠN CHẾ • CHỈ DÙNG NỘI BỘ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



