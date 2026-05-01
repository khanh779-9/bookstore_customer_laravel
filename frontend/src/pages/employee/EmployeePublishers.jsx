 import { useState, useEffect, useCallback } from 'react';
import api from '../../api/client';
import { useToast } from '../../contexts/ToastContext';
import AdminPageHeader from '../../components/Admin/AdminPageHeader';
import AdminDataTable from '../../components/Admin/AdminDataTable';
import AdminModal from '../../components/Admin/AdminModal';
import AdminSearchInput from '../../components/Admin/AdminSearchInput';

export default function EmployeePublishers() {
  const { showToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ ten: '', diachi: '', email: '', sdt: '' });
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  const fetchItems = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get('/employee/publishers', { params: { page, q: searchTerm } });
      setItems(res.data.data || []);
      if (res.data.meta) {
        setPagination({
          current_page: res.data.meta.current_page,
          last_page: res.data.meta.last_page
        });
      }
    } catch { 
      showToast('Lỗi tải dữ liệu', 'error'); 
    } finally { 
      setLoading(false); 
    }
  }, [searchTerm, showToast]);

  useEffect(() => { 
    fetchItems(); 
  }, [fetchItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/employee/publishers/${editingItem.nhaxuatban_id}`, formData);
        showToast('Cập nhật thành công', 'success');
      } else {
        await api.post('/employee/publishers', formData);
        showToast('Thêm thành công', 'success');
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) { 
      showToast(error.response?.data?.message || 'Có lỗi xảy ra', 'error'); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa?')) return;
    try {
      await api.delete(`/employee/publishers/${id}`);
      showToast('Đã xóa', 'success');
      fetchItems();
    } catch { 
      showToast('Không thể xóa', 'error'); 
    }
  };

  const openAdd = () => {
    setEditingItem(null);
    setFormData({ ten: '', diachi: '', email: '', sdt: '' });
    setIsModalOpen(true);
  };

  const openEdit = (i) => {
    setEditingItem(i);
    setFormData({ ten: i.ten || '', diachi: i.diachi || '', email: i.email || '', sdt: i.sdt || '' });
    setIsModalOpen(true);
  };


  const columns = [
    { 
      header: 'ID', 
      accessor: 'nhaxuatban_id', 
      className: 'w-24', 
      render: (item) => <span className="font-mono text-slate-400 text-xs">#{item.nhaxuatban_id}</span> 
    },
    { 
      header: 'Tên NXB', 
      render: (item) => <span className="font-bold text-slate-900">{item.ten}</span> 
    },
    { 
      header: 'Địa chỉ', 
      render: (item) => <p className="text-sm text-slate-500 truncate max-w-xs">{item.diachi || '---'}</p> 
    },
    { 
      header: 'Liên hệ', 
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-slate-700">{item.email}</div>
          <div className="text-xs text-slate-400 font-bold">{item.sdt}</div>
        </div>
      ) 
    },
  ];

  const inputStyle = 'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-sm';
  const labelStyle = 'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1';

  return (
    <div className="space-y-4 bg-slate-50 p-4 md:p-8 min-h-full">
      <AdminPageHeader 
        title="Nhà xuất bản" 
        description="Danh sách các đối tác xuất bản sách của BookZone."
        onAdd={openAdd}
        addLabel="Thêm nhà xuất bản"
      />

      <AdminSearchInput 
        value={searchTerm} 
        onChange={setSearchTerm} 
        placeholder="Tìm theo tên NXB..." 
      />

      <AdminDataTable 
        columns={columns}
        data={items}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
        idField="nhaxuatban_id"
        emptyMessage="Không có dữ liệu NXB"
        pagination={{
          current_page: pagination.current_page,
          last_page: pagination.last_page,
          onPageChange: (page) => fetchItems(page)
        }}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Sửa nhà xuất bản' : 'Thêm nhà xuất bản'}
        subtitle="Thông tin đơn vị đối tác"
      >
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-1.5">
            <label className={labelStyle}>Tên nhà xuất bản *</label>
            <input 
              type="text" 
              placeholder="Nhập tên NXB..." 
              required 
              className={inputStyle} 
              value={formData.ten} 
              onChange={e => setFormData({...formData, ten: e.target.value})} 
            />
          </div>
          
          <div className="space-y-1.5">
            <label className={labelStyle}>Địa chỉ</label>
            <input 
              type="text" 
              placeholder="Địa chỉ trụ sở..." 
              className={inputStyle} 
              value={formData.diachi} 
              onChange={e => setFormData({...formData, diachi: e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelStyle}>Email liên hệ</label>
              <input 
                type="email" 
                placeholder="nxb@example.com" 
                className={inputStyle} 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelStyle}>Số điện thoại</label>
              <input 
                type="text" 
                placeholder="024..." 
                className={inputStyle} 
                value={formData.sdt} 
                onChange={e => setFormData({...formData, sdt: e.target.value})} 
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-sm text-sm font-bold hover:bg-slate-100 transition-all cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-sm text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all cursor-pointer active:scale-[0.98]"
            >
              {editingItem ? 'Lưu thay đổi' : 'Thêm đối tác'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
