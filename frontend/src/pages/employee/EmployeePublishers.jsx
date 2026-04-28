import { useState, useEffect } from 'react';
import api from '../../api/client';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function EmployeePublishers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ ten: '', diachi: '', email: '', sdt: '' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employee/publishers');
      setItems(res.data.data || res.data || []);
    } catch (error) { toast.error('Lỗi tải dữ liệu'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/employee/publishers/${editingItem.nhaxuatban_id}`, formData);
        toast.success('Cập nhật thành công');
      } else {
        await api.post('/employee/publishers', formData);
        toast.success('Thêm thành công');
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) { toast.error(error.response?.data?.message || 'Có lỗi xảy ra'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa?')) return;
    try {
      await api.delete(`/employee/publishers/${id}`);
      toast.success('Đã xóa');
      fetchItems();
    } catch (error) { toast.error('Không thể xóa'); }
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

  const filtered = items.filter(i => (i.ten || '').toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nhà xuất bản</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <FiPlus /> Thêm NXB
        </button>
      </div>

      <div className="admin-card">
        <div className="mb-6 relative max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Tên NXB</th><th>Địa chỉ</th><th>Liên hệ</th><th className="text-center">Hành động</th></tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="5" className="text-center py-8">Đang tải...</td></tr> : filtered.map(i => (
              <tr key={i.nhaxuatban_id}>
                <td className="text-gray-400">#{i.nhaxuatban_id}</td>
                <td className="font-bold">{i.ten}</td>
                <td>{i.diachi || '---'}</td>
                <td>{i.email}<br/><span className="text-xs">{i.sdt}</span></td>
                <td className="flex justify-center gap-2">
                  <button onClick={() => openEdit(i)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(i.nhaxuatban_id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && <tr><td colSpan="5" className="text-center py-8 text-gray-400">Không có dữ liệu</td></tr>}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between">
              <h3 className="font-bold">{editingItem ? 'Sửa NXB' : 'Thêm NXB'}</h3>
              <button onClick={() => setIsModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input type="text" placeholder="Tên NXB *" required className="w-full border p-2 rounded" value={formData.ten} onChange={e => setFormData({...formData, ten: e.target.value})} />
              <input type="text" placeholder="Địa chỉ" className="w-full border p-2 rounded" value={formData.diachi} onChange={e => setFormData({...formData, diachi: e.target.value})} />
              <input type="email" placeholder="Email" className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input type="text" placeholder="Số điện thoại" className="w-full border p-2 rounded" value={formData.sdt} onChange={e => setFormData({...formData, sdt: e.target.value})} />
              <button type="submit" className="w-full btn-primary mt-4">{editingItem ? 'Cập nhật' : 'Thêm mới'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
