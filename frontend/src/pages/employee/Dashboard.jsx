import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/client';
import { FiUsers, FiShoppingBag, FiBox, FiDollarSign, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Note: The auth context would need to support employee login, or this would use a separate EmployeeAuthContext
    api.get('/employee/dashboard').then(res => {
      setStats(res.data.stats);
      setRecentOrders(res.data.recentOrders);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Should navigate to employee login
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="employee-dashboard" style={{ padding: '2rem' }}>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1>Dashboard Quản Trị</h1>
          <p>Xin chào, {user?.ten || 'Quản trị viên'}</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary">
          <FiLogOut /> Đăng xuất
        </button>
      </div>

      {stats && (
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p className="text-muted">Tổng doanh thu</p>
                <h3>{stats.revenue.toLocaleString('vi-VN')}₫</h3>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '0.5rem' }}>
                <FiDollarSign size={24} />
              </div>
            </div>
          </div>
          <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p className="text-muted">Đơn hàng</p>
                <h3>{stats.orders}</h3>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', borderRadius: '0.5rem' }}>
                <FiShoppingBag size={24} />
              </div>
            </div>
          </div>
          <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p className="text-muted">Sản phẩm</p>
                <h3>{stats.products}</h3>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderRadius: '0.5rem' }}>
                <FiBox size={24} />
              </div>
            </div>
          </div>
          <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p className="text-muted">Khách hàng</p>
                <h3>{stats.customers}</h3>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)', borderRadius: '0.5rem' }}>
                <FiUsers size={24} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="recent-orders" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Đơn hàng gần đây</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
              <th style={{ padding: '1rem 0' }}>Mã ĐH</th>
              <th>Ngày tạo</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.hoadon_id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '1rem 0' }}>#{order.hoadon_id}</td>
                <td>{new Date(order.ngaytao).toLocaleDateString('vi-VN')}</td>
                <td>{parseFloat(order.tongtien).toLocaleString('vi-VN')}₫</td>
                <td>
                  <span className={`badge badge-${order.trangthai === 'da_giao_hang' ? 'success' : order.trangthai === 'da_huy' ? 'danger' : 'warning'}`}>
                    {order.trangthai}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
