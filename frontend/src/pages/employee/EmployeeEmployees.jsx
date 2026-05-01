import { useState, useEffect, useCallback } from 'react';
import api from '../../api/client';
import { FiShield } from 'react-icons/fi';
import { useToast } from '../../contexts/ToastContext';
import AdminPageHeader from '../../components/Admin/AdminPageHeader';
import AdminDataTable from '../../components/Admin/AdminDataTable';
import AdminModal from '../../components/Admin/AdminModal';
import AdminSearchInput from '../../components/Admin/AdminSearchInput';

export default function EmployeeEmployees() {
  const { showToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ ho: '', ten: '', email: '', role: 'nhanvien', password: '' });
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  const fetchItems = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get('/employee/employees', { params: { page, q: searchTerm } });
      setItems(res.data.data || []);
      if (res.data.meta) {
        setPagination({
          current_page: res.data.meta.current_page,
          last_page: res.data.meta.last_page
        });
      }
    } catch { showToast('Lỗi tải dữ liệu', 'error'); }
    finally { setLoading(false); }
  }, [searchTerm, showToast]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        ho: item.ho, 
        ten: item.ten, 
        email: item.email, 
        role: item.role, 
        password: '' 
      });
    } else {
      setEditingItem(null);
      setFormData({ ho: '', ten: '', email: '', role: 'nhanvien', password: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/employee/employees/${editingItem.nhanvien_id}`, formData);
        showToast('Cập nhật thành công', 'success');
      } else {
        await api.post('/employee/employees', formData);
        showToast('Thêm thành công', 'success');
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) { showToast(error.response?.data?.message || 'Có lỗi xảy ra', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa nhân viên này?')) return;
    try {
      await api.delete(`/employee/employees/${id}`);
      showToast('Đã xóa', 'success');
      fetchItems();
    } catch (error) { showToast(error.response?.data?.message || 'Không thể xóa', 'error'); }
  };


  const columns = [
    { 
      header: 'ID', 
      accessor: 'nhanvien_id', 
      className: 'w-24', 
      render: (item) => <span className="font-mono text-slate-400 text-xs">#{item.nhanvien_id}</span> 
    },
    { header: 'Họ tên', render: (i) => <span className="font-bold text-slate-900">{i.ho} {i.ten}</span> },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Vai trò', 
      render: (i) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider ${
          i.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
        }`}>
          {i.role === 'admin' && <FiShield className="w-3 h-3" />} {i.role === 'admin' ? 'Quản trị' : 'Nhân viên'}
        </span>
      ) 
    },
  ];

  return (
    <div className="space-y-4 bg-slate-50 p-4 md:p-8 min-h-full">
      <AdminPageHeader 
        title="Nhân viên hệ thống" 
        description="Quản lý đội ngũ nhân viên và phân quyền truy cập."
        onAdd={() => handleOpenModal()}
        addLabel="Thêm nhân viên"
      />

      <AdminSearchInput 
        value={searchTerm} 
        onChange={setSearchTerm} 
        placeholder="Tìm tên hoặc email..." 
      />

      <AdminDataTable 
        columns={columns}
        data={items}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        idField="nhanvien_id"
        emptyMessage="Không tìm thấy nhân viên nào"
        pagination={{
          current_page: pagination.current_page,
          last_page: pagination.last_page,
          onPageChange: (page) => fetchItems(page)
        }}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Sửa nhân viên' : 'Thêm nhân viên'}
        subtitle="Thông tin tài khoản nội bộ"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Họ</label>
              <input type="text" placeholder="Nhập họ..." required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" value={formData.ho} onChange={e => setFormData({...formData, ho: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Tên</label>
              <input type="text" placeholder="Nhập tên..." required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" value={formData.ten} onChange={e => setFormData({...formData, ten: e.target.value})} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email tài khoản</label>
            <input type="email" placeholder="email@example.com" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Vai trò hệ thống</label>
            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
              <option value="nhanvien">Nhân viên</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Mật khẩu</label>
            <input type="password" placeholder={editingItem ? "Để trống nếu không đổi" : "Mật khẩu tối thiểu 6 ký tự"} required={!editingItem} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-sm text-sm font-bold hover:bg-slate-100 transition-all cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-sm text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all cursor-pointer active:scale-[0.98]"
            >
              {editingItem ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
