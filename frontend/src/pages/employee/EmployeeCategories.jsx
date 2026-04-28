import { useState, useEffect } from 'react';
import api from '../../api/client';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function EmployeeCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [formData, setFormData] = useState({ tenDanhMuc: '', mo_ta: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employee/categories');
      setCategories(res.data.data || []);
    } catch (error) {
      toast.error('Không thể tải danh sách danh mục');
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
        toast.success('Cập nhật danh mục thành công');
      } else {
        await api.post('/employee/categories', formData);
        toast.success('Thêm danh mục thành công');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;
    try {
      await api.delete(`/employee/categories/${id}`);
      toast.success('Xóa danh mục thành công');
      fetchCategories();
    } catch (error) {
      toast.error('Không thể xóa danh mục');
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.tenDanhMuc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Danh mục</h1>
          <p className="text-sm text-gray-500">Quản lý các loại sản phẩm trong hệ thống</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <FiPlus /> Thêm danh mục
        </button>
      </div>

      <div className="admin-card">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-20">ID</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th className="w-32 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-gray-400">Đang tải dữ liệu...</td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-gray-400">Không tìm thấy danh mục nào</td>
                </tr>
              ) : (
                filteredCategories.map(cat => (
                  <tr key={cat.danhmucSP_id} className="hover:bg-gray-50 transition-colors">
                    <td className="font-mono text-gray-400">#{cat.danhmucSP_id}</td>
                    <td className="font-bold text-gray-800">{cat.tenDanhMuc}</td>
                    <td className="text-gray-500 truncate max-w-md">{cat.mo_ta || '---'}</td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenModal(cat)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.danhmucSP_id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {editingCat ? 'Sửa danh mục' : 'Thêm danh mục mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Tên danh mục <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  value={formData.tenDanhMuc}
                  onChange={(e) => setFormData({ ...formData, tenDanhMuc: e.target.value })}
                  placeholder="Ví dụ: Sách Văn Học"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Mô tả</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none min-h-[100px]"
                  value={formData.mo_ta}
                  onChange={(e) => setFormData({ ...formData, mo_ta: e.target.value })}
                  placeholder="Nhập mô tả cho danh mục..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-green-500 shadow-md shadow-green-200 transition-all"
                >
                  {editingCat ? 'Cập nhật' : 'Thêm ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
