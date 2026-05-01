import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/client';
import { FiUsers, FiShoppingBag, FiBox, FiDollarSign, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/employee/dashboard').then(res => {
      setStats(res.data.stats || null);
      setRecentOrders(res.data.recentOrders || []);
      setLoading(false);
    }).catch(() => {
      showToast('Không thể tải dữ liệu dashboard', 'error');
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Should navigate to employee login
  };

   if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Đang tải dữ liệu...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 min-h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">DASHBOARD QUẢN TRỊ</h1>
          <p className="text-slate-500 text-sm font-medium">Chào buổi sáng, <span className="text-primary">{user?.ten || 'Quản trị viên'}</span>. Đây là những gì đang diễn ra hôm nay.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-sm text-sm font-bold shadow-sm hover:bg-slate-50 transition-all cursor-pointer">
            Tải báo cáo
          </button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Tổng doanh thu" 
            value={`${stats.revenue.toLocaleString('vi-VN')}₫`} 
            icon={<FiDollarSign />} 
            color="bg-emerald-500" 
            lightColor="bg-emerald-50"
            textColor="text-emerald-600"
          />
          <StatCard 
            label="Đơn hàng" 
            value={stats.orders} 
            icon={<FiShoppingBag />} 
            color="bg-blue-500" 
            lightColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard 
            label="Sản phẩm" 
            value={stats.products} 
            icon={<FiBox />} 
            color="bg-amber-500" 
            lightColor="bg-amber-50"
            textColor="text-amber-600"
          />
          <StatCard 
            label="Khách hàng" 
            value={stats.customers} 
            icon={<FiUsers />} 
            color="bg-purple-500" 
            lightColor="bg-purple-50"
            textColor="text-purple-600"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Đơn hàng gần đây</h2>
            <button className="text-primary text-sm font-bold hover:underline">Xem tất cả</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-6 py-4">Mã ĐH</th>
                  <th className="px-6 py-4">Ngày tạo</th>
                  <th className="px-6 py-4">Tổng tiền</th>
                  <th className="px-6 py-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map(order => (
                  <tr key={order.hoadon_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">#{order.hoadon_id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{new Date(order.ngaytao).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{parseFloat(order.tongtien).toLocaleString('vi-VN')}₫</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        order.trangthai === 'da_giao_hang' ? 'bg-emerald-100 text-emerald-700' : 
                        order.trangthai === 'da_huy' ? 'bg-rose-100 text-rose-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.trangthai?.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-6">
          <h2 className="font-bold text-slate-900 mb-6">Hoạt động hệ thống</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-800 font-medium leading-tight">Cập nhật trạng thái đơn hàng #10{i}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">2 giờ trước</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, lightColor, textColor }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">{label}</p>
          <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{value}</h3>
        </div>
        <div className={`w-12 h-12 ${lightColor} ${textColor} rounded-sm flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
