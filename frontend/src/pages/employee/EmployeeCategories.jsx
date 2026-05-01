 import { useState, useEffect } from 'react';
import api from '../../api/client';
import { useToast } from '../../contexts/ToastContext';
import AdminPageHeader from '../../components/Admin/AdminPageHeader';
import AdminDataTable from '../../components/Admin/AdminDataTable';
import AdminModal from '../../components/Admin/AdminModal';
import AdminSearchInput from '../../components/Admin/AdminSearchInput';

export default function EmployeeCategories() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [formData, setFormData] = useState({ tenDanhMuc: '', mo_ta: '' });
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  useEffect(() => {
    fetchCategories();
  }, [searchTerm]);

  const fetchCategories = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get('/employee/categories', { params: { page, q: searchTerm } });
      setCategories(res.data.data || []);
      if (res.data.meta) {
        setPagination({
          current_page: res.data.meta.current_page,
          last_page: res.data.meta.last_page
        });
      }
    } catch (error) {
      showToast('Không thể tải danh sách danh mục', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (cat = null) => {
    if (cat) {
      setEditingCat(cat);
      setFormData({ tenDanhMuc: cat.tenDanhMuc, mo_ta: cat.mo_ta || '' });
    } else {
      setEditingCat(null);
      setFormData({ tenDanhMuc: '', mo_ta: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCat) {
        await api.put(`/employee/categories/${editingCat.danhmucSP_id}`, formData);
        showToast('Cập nhật danh mục thành công', 'success');
      } else {
        await api.post('/employee/categories', formData);
        showToast('Thêm danh mục thành công', 'success');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      showToast(error.response?.data?.message || 'Có lỗi xảy ra', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;
    try {
      await api.delete(`/employee/categories/${id}`);
      showToast('Xóa danh mục thành công', 'success');
      fetchCategories();
    } catch (error) {
      showToast('Không thể xóa danh mục', 'error');
    }
  };


  const columns = [
    { 
      header: 'ID', 
      accessor: 'danhmucSP_id', 
      className: 'w-24', 
      render: (item) => <span className="font-mono text-slate-400 text-xs">#{item.danhmucSP_id}</span> 
    },
    { 
      header: 'Tên danh mục', 
      render: (item) => <span className="font-bold text-slate-900">{item.tenDanhMuc}</span> 
    },
    { 
      header: 'Mô tả', 
      render: (item) => <p className="text-sm text-slate-500 truncate max-w-md">{item.mo_ta || '---'}</p> 
    },
  ];

  return (
    <div className="space-y-4 bg-slate-50 p-4 md:p-8 min-h-full">
      <AdminPageHeader 
        title="Quản lý Danh mục" 
        description="Quản lý các loại sản phẩm và phân loại trong hệ thống."
        onAdd={() => handleOpenModal()}
        addLabel="Thêm danh mục mới"
      />

      <AdminSearchInput 
        value={searchTerm} 
        onChange={setSearchTerm} 
        placeholder="Tìm kiếm danh mục..." 
      />

      <AdminDataTable 
        columns={columns}
        data={categories}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        idField="danhmucSP_id"
        emptyMessage="Không tìm thấy danh mục nào"
        pagination={{
          current_page: pagination.current_page,
          last_page: pagination.last_page,
          onPageChange: (page) => fetchCategories(page)
        }}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCat ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
        subtitle="Thông tin phân loại sản phẩm"
      >
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Tên danh mục <span className="text-rose-500">*</span></label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-sm"
              value={formData.tenDanhMuc}
              onChange={(e) => setFormData({ ...formData, tenDanhMuc: e.target.value })}
              placeholder="Ví dụ: Sách Văn Học, Văn Phòng Phẩm..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Mô tả chi tiết</label>
            <textarea
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-sm min-h-[120px] resize-none"
              value={formData.mo_ta}
              onChange={(e) => setFormData({ ...formData, mo_ta: e.target.value })}
              placeholder="Mô tả tóm tắt về loại danh mục này..."
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
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
              {editingCat ? 'Cập nhật ngay' : 'Thêm danh mục'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
