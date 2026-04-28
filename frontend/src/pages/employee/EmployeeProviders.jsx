import { useState, useEffect } from 'react';
import api from '../../api/client';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function EmployeeProviders() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ tenNhaCungCap: '', dia_chi: '', so_dien_thoai: '' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employee/providers');
      setItems(res.data.data || []);
    } catch (error) { toast.error('Lỗi tải dữ liệu'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/employee/providers/${editingItem.nhacungcap_id}`, formData);
        toast.success('Cập nhật thành công');
      } else {
        await api.post('/employee/providers', formData);
        toast.success('Thêm thành công');
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) { toast.error(error.response?.data?.message || 'Có lỗi xảy ra'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa?')) return;
    try {
      await api.delete(`/employee/providers/${id}`);
      toast.success('Đã xóa');
      fetchItems();
    } catch (error) { toast.error('Không thể xóa'); }
  };

  const filtered = items.filter(i => i.tenNhaCungCap.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nhà cung cấp</h1>
        <button onClick={() => { setEditingItem(null); setFormData({ tenNhaCungCap: '', dia_chi: '', so_dien_thoai: '' }); setIsModalOpen(true); }} className="btn-primary flex items-center gap-2">
          <FiPlus /> Thêm NCC
        </button>
      </div>

      <div className="admin-card">
        <div className="mb-6 relative max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Tên NCC</th><th>Địa chỉ</th><th>Số điện thoại</th><th className="text-center">Hành động</th></tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="5" className="text-center py-8">Đang tải...</td></tr> : filtered.map(i => (
              <tr key={i.nhacungcap_id}>
                <td className="text-gray-400">#{i.nhacungcap_id}</td>
                <td className="font-bold">{i.tenNhaCungCap}</td>
                <td>{i.dia_chi || '---'}</td>
                <td>{i.so_dien_thoai}</td>
                <td className="flex justify-center gap-2">
                  <button onClick={() => { setEditingItem(i); setFormData({ tenNhaCungCap: i.tenNhaCungCap, dia_chi: i.dia_chi || '', so_dien_thoai: i.so_dien_thoai || '' }); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(i.nhacungcap_id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between">
              <h3 className="font-bold">{editingItem ? 'Sửa NCC' : 'Thêm NCC'}</h3>
              <button onClick={() => setIsModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input type="text" placeholder="Tên NCC" required className="w-full border p-2 rounded" value={formData.tenNhaCungCap} onChange={e => setFormData({...formData, tenNhaCungCap: e.target.value})} />
              <input type="text" placeholder="Địa chỉ" className="w-full border p-2 rounded" value={formData.dia_chi} onChange={e => setFormData({...formData, dia_chi: e.target.value})} />
              <input type="text" placeholder="Số điện thoại" className="w-full border p-2 rounded" value={formData.so_dien_thoai} onChange={e => setFormData({...formData, so_dien_thoai: e.target.value})} />
              <button type="submit" className="w-full btn-primary mt-4">{editingItem ? 'Cập nhật' : 'Thêm mới'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
