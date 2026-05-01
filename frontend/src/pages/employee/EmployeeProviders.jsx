 import { useState, useEffect } from 'react';
import api from '../../api/client';
import { useToast } from '../../contexts/ToastContext';
import AdminPageHeader from '../../components/Admin/AdminPageHeader';
import AdminDataTable from '../../components/Admin/AdminDataTable';
import AdminModal from '../../components/Admin/AdminModal';
import AdminSearchInput from '../../components/Admin/AdminSearchInput';

export default function EmployeeProviders() {
  const { showToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ tenNhaCungCap: '', dia_chi: '', so_dien_thoai: '' });
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  useEffect(() => { fetchItems(); }, [searchTerm]);

  const fetchItems = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get('/employee/providers', { params: { page, q: searchTerm } });
      setItems(res.data.data || []);
      if (res.data.meta) {
        setPagination({
          current_page: res.data.meta.current_page,
          last_page: res.data.meta.last_page
        });
      }
    } catch (error) { showToast('Lỗi tải dữ liệu', 'error'); }
    finally { setLoading(false); }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        tenNhaCungCap: item.tenNhaCungCap, 
        dia_chi: item.dia_chi || '', 
        so_dien_thoai: item.so_dien_thoai || '' 
      });
    } else {
      setEditingItem(null);
      setFormData({ tenNhaCungCap: '', dia_chi: '', so_dien_thoai: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/employee/providers/${editingItem.nhacungcap_id}`, formData);
        showToast('Cập nhật thành công', 'success');
      } else {
        await api.post('/employee/providers', formData);
        showToast('Thêm thành công', 'success');
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) { showToast(error.response?.data?.message || 'Có lỗi xảy ra', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa?')) return;
    try {
      await api.delete(`/employee/providers/${id}`);
      showToast('Đã xóa', 'success');
      fetchItems();
    } catch (error) { showToast('Không thể xóa', 'error'); }
  };


  const columns = [
    { 
      header: 'ID', 
      accessor: 'nhacungcap_id', 
      className: 'w-24', 
      render: (item) => <span className="font-mono text-slate-400 text-xs">#{item.nhacungcap_id}</span> 
    },
    { 
      header: 'Tên Nhà Cung Cấp', 
      render: (item) => <span className="font-bold text-slate-900">{item.tenNhaCungCap}</span> 
    },
    { 
      header: 'Địa chỉ', 
      render: (item) => <p className="text-sm text-slate-500 truncate max-w-xs">{item.dia_chi || '---'}</p> 
    },
    { header: 'Số điện thoại', accessor: 'so_dien_thoai', cellClassName: 'font-medium text-slate-700' },
  ];

  const inputStyle = 'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-sm';
  const labelStyle = 'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1';

  return (
    <div className="space-y-4 bg-slate-50 p-4 md:p-8 min-h-full">
      <AdminPageHeader 
        title="Nhà cung cấp" 
        description="Quản lý các đơn vị cung cấp hàng hóa cho kho sách."
        onAdd={() => handleOpenModal()}
        addLabel="Thêm nhà cung cấp"
      />

      <AdminSearchInput 
        value={searchTerm} 
        onChange={setSearchTerm} 
        placeholder="Tìm theo tên NCC..." 
      />

      <AdminDataTable 
        columns={columns}
        data={items}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        idField="nhacungcap_id"
        emptyMessage="Không tìm thấy nhà cung cấp nào"
        pagination={{
          current_page: pagination.current_page,
          last_page: pagination.last_page,
          onPageChange: (page) => fetchItems(page)
        }}
      />

       <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Sửa nhà cung cấp' : 'Thêm nhà cung cấp'}
        subtitle="Thông tin đơn vị cung ứng"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className={labelStyle}>Tên nhà cung cấp *</label>
            <input 
              type="text" 
              placeholder="Nhập tên NCC..." 
              required 
              className={inputStyle} 
              value={formData.tenNhaCungCap} 
              onChange={e => setFormData({...formData, tenNhaCungCap: e.target.value})} 
            />
          </div>
          
          <div className="space-y-1.5">
            <label className={labelStyle}>Địa chỉ trụ sở</label>
            <input 
              type="text" 
              placeholder="Địa chỉ chi tiết..." 
              className={inputStyle} 
              value={formData.dia_chi} 
              onChange={e => setFormData({...formData, dia_chi: e.target.value})} 
            />
          </div>

          <div className="space-y-1.5">
            <label className={labelStyle}>Số điện thoại liên hệ *</label>
            <input 
              type="text" 
              placeholder="Nhập số điện thoại..." 
              required
              className={inputStyle} 
              value={formData.so_dien_thoai} 
              onChange={e => setFormData({...formData, so_dien_thoai: e.target.value})} 
            />
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
              {editingItem ? 'Cập nhật ngay' : 'Thêm NCC mới'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
