import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/employee/login', form);
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('auth_user', JSON.stringify(res.data.employee));
      toast.success('Đăng nhập quản trị thành công!');
      navigate('/admin/dashboard');
      setTimeout(() => {
        window.location.reload(); 
      }, 500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl mb-4">
            <FiLock />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Quản Trị Viên</h1>
          <p className="text-gray-500 mt-2 text-sm italic">Hệ thống nội bộ BookZone</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email công việc</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="email" 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                required 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all"
                placeholder="email@bookzone.vn"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Mật khẩu</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="password" 
                value={form.password} 
                onChange={e => setForm({...form, password: e.target.value})} 
                required 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-green-500 text-white font-black py-4 rounded-xl shadow-lg shadow-green-100 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:translate-y-0 disabled:bg-gray-300 disabled:shadow-none"
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

        <div className="pt-4 text-center">
          <p className="text-xs text-gray-400">
            © 2026 BookStore Management System. <br/>
            Truy cập hạn chế. Vui lòng liên hệ IT nếu quên mật khẩu.
          </p>
        </div>
      </div>
    </div>
  );
}
