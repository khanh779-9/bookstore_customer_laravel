import { useState, useEffect, useCallback } from 'react';
import api from '../../api/client';
import { FiEye, FiMail, FiPhone } from 'react-icons/fi';
import { useToast } from '../../contexts/ToastContext';
import AdminPageHeader from '../../components/Admin/AdminPageHeader';
import AdminDataTable from '../../components/Admin/AdminDataTable';
import AdminSearchInput from '../../components/Admin/AdminSearchInput';

export default function EmployeeCustomers() {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  const fetchCustomers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get('/employee/customers', { params: { page, q: searchTerm } });
      setCustomers(res.data.data || []);
      if (res.data.meta) {
        setPagination({
          current_page: res.data.meta.current_page,
          last_page: res.data.meta.last_page
        });
      }
    } catch {
      showToast('Không thể tải danh sách khách hàng', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, showToast]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);


  const columns = [
    { 
      header: 'Khách hàng', 
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200">
            {c.ten?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-slate-900">{c.ho} {c.tendem} {c.ten}</div>
            <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">ID: #{c.khachhang_id}</div>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Liên hệ', 
      render: (c) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FiMail className="text-slate-400 w-3.5 h-3.5" /> {c.email}
          </div>
          {c.sdt && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FiPhone className="text-slate-400 w-3.5 h-3.5" /> {c.sdt}
            </div>
          )}
        </div>
      ) 
    },
    { 
      header: 'Giới tính', 
      cellClassName: 'text-center',
      render: (c) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
          c.gioitinh === 'nam' ? 'bg-blue-50 text-blue-600' : 
          c.gioitinh === 'nu' ? 'bg-rose-50 text-rose-600' : 
          'bg-slate-50 text-slate-600'
        }`}>
          {c.gioitinh === 'nam' ? 'Nam' : c.gioitinh === 'nu' ? 'Nữ' : 'Khác'}
        </span>
      ) 
    },
    { 
      header: 'Ngày tham gia', 
      render: (c) => <span className="text-sm text-slate-500 font-medium">{c.ngaythamgia ? new Date(c.ngaythamgia).toLocaleDateString('vi-VN') : '—'}</span> 
    },
  ];

  return (
    <div className="space-y-4 bg-slate-50 p-4 md:p-8 min-h-full">
      <AdminPageHeader 
        title="Quản lý Khách hàng" 
        description="Danh sách toàn bộ khách hàng đã đăng ký tài khoản trên hệ thống."
      />

      <AdminSearchInput 
        value={searchTerm} 
        onChange={setSearchTerm} 
        placeholder="Tìm khách hàng theo tên hoặc email..." 
      />

      <AdminDataTable 
        columns={columns}
        data={customers}
        loading={loading}
        idField="khachhang_id"
        emptyMessage="Không tìm thấy khách hàng nào"
        pagination={{
          current_page: pagination.current_page,
          last_page: pagination.last_page,
          onPageChange: (page) => fetchCustomers(page)
        }}
      />
    </div>
  );
}



