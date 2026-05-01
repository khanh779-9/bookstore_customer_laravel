 import { useState, useEffect } from 'react';
import api from '../../api/client';
import { useToast } from '../../contexts/ToastContext';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';
import AdminPageHeader from '../../components/Admin/AdminPageHeader';
import AdminDataTable from '../../components/Admin/AdminDataTable';

export default function EmployeeOrders() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/orders?page=${page}`);
      setOrders(res.data.data || []);
      if (res.data.meta) {
        setPagination({
          current_page: res.data.meta.current_page,
          last_page: res.data.meta.last_page
        });
      }
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/employee/orders/${id}/status`, { trangthai: status });
      showToast('Đã cập nhật trạng thái đơn hàng', 'success');
      fetchOrders();
    } catch (e) {
      showToast('Lỗi cập nhật trạng thái', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm";
    switch (status) {
      case 'cho_thanh_toan': return <span className={`${baseClasses} bg-amber-50 text-amber-600`}>Chờ thanh toán</span>;
      case 'cho_xac_nhan': return <span className={`${baseClasses} bg-indigo-50 text-indigo-600`}>Chờ xác nhận</span>;
      case 'da_xac_nhan': return <span className={`${baseClasses} bg-blue-50 text-blue-600`}>Đã xác nhận</span>;
      case 'dang_giao_hang': return <span className={`${baseClasses} bg-cyan-50 text-cyan-600`}>Đang giao</span>;
      case 'da_giao_hang': return <span className={`${baseClasses} bg-emerald-50 text-emerald-600`}>Đã giao</span>;
      case 'da_huy': return <span className={`${baseClasses} bg-rose-50 text-rose-600`}>Đã hủy</span>;
      default: return <span className={`${baseClasses} bg-slate-50 text-slate-600`}>{status}</span>;
    }
  };

  const columns = [
    { header: 'Mã ĐH', render: (order) => <span className="font-bold text-slate-900">#{order.hoadon_id}</span> },
    { header: 'Khách hàng', render: (order) => <span className="text-sm font-medium text-slate-700">{order.customer_name || `Khách hàng #${order.khachhang_id}`}</span> },
    { header: 'Ngày đặt', render: (order) => <span className="text-sm text-slate-500">{new Date(order.ngaytao).toLocaleDateString('vi-VN')}</span> },
    { header: 'Tổng tiền', render: (order) => <span className="font-bold text-primary">{parseFloat(order.tongtien).toLocaleString('vi-VN')}₫</span> },
    { header: 'Trạng thái', render: (order) => getStatusBadge(order.trangthai) },
    { 
      header: 'Thao tác', 
      cellClassName: 'text-center',
      render: (order) => (
        <div className="flex justify-center gap-2">
          <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-sm transition-all cursor-pointer" title="Xem chi tiết">
            <FiEye className="w-4 h-4" />
          </button>
          
          {order.trangthai === 'cho_xac_nhan' && (
            <button 
              onClick={() => updateStatus(order.hoadon_id, 'da_xac_nhan')}
              className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-sm transition-all cursor-pointer" 
              title="Xác nhận đơn"
            >
              <FiCheck className="w-4 h-4" />
            </button>
          )}
          
          {(order.trangthai === 'cho_xac_nhan' || order.trangthai === 'cho_thanh_toan') && (
            <button 
              onClick={() => updateStatus(order.hoadon_id, 'da_huy')}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-sm transition-all cursor-pointer" 
              title="Hủy đơn"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-4 bg-slate-50 p-4 md:p-8 min-h-full">
      <AdminPageHeader 
        title="Quản lý Đơn hàng" 
        description="Theo dõi và cập nhật trạng thái đơn hàng của khách hàng."
      />

      <AdminDataTable 
        columns={columns}
        data={orders}
        loading={loading}
        idField="hoadon_id"
        emptyMessage="Không có đơn hàng nào"
        pagination={{
          current_page: pagination.current_page,
          last_page: pagination.last_page,
          onPageChange: (page) => fetchOrders(page)
        }}
      />
    </div>
  );
}



