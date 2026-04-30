import { useState, useEffect } from 'react';
import api from '../../api/client';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function EmployeeEmployees() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ ho: '', ten: '', email: '', role: 'nhanvien', password: '' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employee/employees');
      setItems(res.data.data || []);
    } catch (error) { toast.error('Lỗi tải dữ liệu'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/employee/employees/${editingItem.nhanvien_id}`, formData);
        toast.success('Cập nhật thành công');
      } else {
        await api.post('/employee/employees', formData);
        toast.success('Thêm thành công');
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) { toast.error(error.response?.data?.message || 'Có lỗi xảy ra'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xác nhận xóa nhân viên này?')) return;
    try {
      await api.delete(`/employee/employees/${id}`);
      toast.success('Đã xóa');
      fetchItems();
    } catch (error) { toast.error(error.response?.data?.message || 'Không thể xóa'); }
  };

  const filtered = items.filter(i => (i.ho + ' ' + i.ten).toLowerCase().includes(searchTerm.toLowerCase()) || i.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nhân viên hệ thống</h1>
        <button onClick={() => { setEditingItem(null); setFormData({ ho: '', ten: '', email: '', role: 'nhanvien', password: '' }); setIsModalOpen(true); }} className="btn-primary flex items-center gap-2">
          <FiPlus /> Thêm nhân viên
        </button>
      </div>

      <div className="admin-card">
        <div className="mb-6 relative max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm tên hoặc email..." className="w-full pl-10 pr-4 py-2 border rounded-none outline-none" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Họ tên</th><th>Email</th><th>Vai trò</th><th className="text-center">Hành động</th></tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="5" className="text-center py-8">Đang tải...</td></tr> : filtered.map(i => (
              <tr key={i.nhanvien_id}>
                <td className="text-gray-400">#{i.nhanvien_id}</td>
                <td className="font-bold">{i.ho} {i.ten}</td>
                <td>{i.email}</td>
                <td>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-none text-xs font-bold ${i.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {i.role === 'admin' ? <FiShield /> : null} {i.role === 'admin' ? 'Quản trị' : 'Nhân viên'}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  <button onClick={() => { setEditingItem(i); setFormData({ ho: i.ho, ten: i.ten, email: i.email, role: i.role, password: '' }); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-none"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(i.nhanvien_id)} className="p-2 text-red-600 hover:bg-red-50 rounded-none"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-none w-full max-w-md">
            <div className="p-4 border-b flex justify-between">
              <h3 className="font-bold">{editingItem ? 'Sửa nhân viên' : 'Thêm nhân viên'}</h3>
              <button onClick={() => setIsModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Họ" required className="w-full border p-2 rounded-none" value={formData.ho} onChange={e => setFormData({...formData, ho: e.target.value})} />
                <input type="text" placeholder="Tên" required className="w-full border p-2 rounded-none" value={formData.ten} onChange={e => setFormData({...formData, ten: e.target.value})} />
              </div>
              <input type="email" placeholder="Email" required className="w-full border p-2 rounded-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <select className="w-full border p-2 rounded-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="nhanvien">Nhân viên</option>
                <option value="admin">Quản trị viên</option>
              </select>
              <input type="password" placeholder={editingItem ? "Để trống nếu không đổi" : "Mật khẩu"} required={!editingItem} className="w-full border p-2 rounded-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              <button type="submit" className="w-full btn-primary mt-4">{editingItem ? 'Cập nhật' : 'Thêm mới'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



