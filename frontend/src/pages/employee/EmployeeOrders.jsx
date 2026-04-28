import { useState, useEffect } from 'react';
import api from '../../api/client';
import toast from 'react-hot-toast';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';

export default function EmployeeOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/employee/orders');
      setOrders(res.data.data || []);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/employee/orders/${id}/status`, { trangthai: status });
      toast.success('Đã cập nhật trạng thái đơn hàng');
      fetchOrders();
    } catch (e) {
      toast.error('Lỗi cập nhật trạng thái');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'cho_thanh_toan': return <span className="role-badge" style={{ background: '#fef3c7', color: '#d97706' }}>Chờ thanh toán</span>;
      case 'cho_xac_nhan': return <span className="role-badge" style={{ background: '#e0e7ff', color: '#4338ca' }}>Chờ xác nhận</span>;
      case 'da_xac_nhan': return <span className="role-badge" style={{ background: '#dbeafe', color: '#1d4ed8' }}>Đã xác nhận</span>;
      case 'dang_giao_hang': return <span className="role-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>Đang giao</span>;
      case 'da_giao_hang': return <span className="role-badge" style={{ background: '#d1fae5', color: '#059669' }}>Đã giao</span>;
      case 'da_huy': return <span className="role-badge" style={{ background: '#fee2e2', color: '#b91c1c' }}>Đã hủy</span>;
      default: return <span>{status}</span>;
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Quản lý đơn hàng</h1>
      </div>

      <div className="admin-card">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã ĐH</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.hoadon_id}>
                  <td>#{order.hoadon_id}</td>
                  <td>Khách hàng {order.khachhang_id}</td>
                  <td>{new Date(order.ngaytao).toLocaleDateString('vi-VN')}</td>
                  <td style={{ fontWeight: '600', color: '#4f46e5' }}>{parseFloat(order.tongtien).toLocaleString('vi-VN')}₫</td>
                  <td>{getStatusBadge(order.trangthai)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }} title="Xem chi tiết">
                        <FiEye />
                      </button>
                      
                      {order.trangthai === 'cho_xac_nhan' && (
                        <button 
                          onClick={() => updateStatus(order.hoadon_id, 'da_xac_nhan')}
                          className="btn-primary" 
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', background: '#10b981' }} 
                          title="Xác nhận đơn"
                        >
                          <FiCheck />
                        </button>
                      )}
                      
                      {(order.trangthai === 'cho_xac_nhan' || order.trangthai === 'cho_thanh_toan') && (
                        <button 
                          onClick={() => updateStatus(order.hoadon_id, 'da_huy')}
                          className="btn-primary" 
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', background: '#ef4444' }} 
                          title="Hủy đơn"
                        >
                          <FiX />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Không có đơn hàng nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
