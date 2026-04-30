import { useState, useEffect } from 'react';
import api from '../../api/client';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';

const INIT_FORM = {
  type: 'Sach',
  danhmucSP_id: '1',
  gia: '',
  soluongton: '',
  mo_ta: '',
  hinhanh: '',
  // Book
  tenSach: '',
  nhaxuatban_id: '',
  tacgia_id: '',
  loaisach_code: '',
  namXB: '',
  // VPP
  tenVPP: '',
};

export default function EmployeeProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ ...INIT_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Lookup data
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchLookups();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/employee/products');
      setProducts(res.data.data || res.data || []);
    } catch (e) {
      toast.error('Lỗi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const fetchLookups = async () => {
    try {
      const [pubRes, authRes, catRes] = await Promise.all([
        api.get('/publishers'),
        api.get('/authors'),
        api.get('/categories'),
      ]);
      setPublishers(pubRes.data.data || pubRes.data || []);
      setAuthors(authRes.data.data || authRes.data || []);
      setCategories(catRes.data.data || catRes.data || []);
    } catch (e) { /* ignore */ }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ ...INIT_FORM });
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = (p) => {
    const isSach = !!p.sach;
    setEditingId(p.sanpham_id);
    setFormData({
      type: isSach ? 'Sach' : 'VPP',
      danhmucSP_id: String(p.danhmucSP_id || '1'),
      gia: p.gia ?? '',
      soluongton: p.soluongton ?? '',
      mo_ta: p.mo_ta || '',
      hinhanh: p.hinhanh || '',
      tenSach: p.sach?.tenSach || '',
      nhaxuatban_id: p.sach?.nhaxuatban_id || '',
      tacgia_id: p.sach?.tacgia_id || '',
      loaisach_code: p.sach?.loaisach_code || '',
      namXB: p.sach?.namXB || '',
      tenVPP: p.van_phong_pham?.tenVPP || '',
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        type: formData.type,
        danhmucSP_id: parseInt(formData.danhmucSP_id),
        gia: parseFloat(formData.gia),
        soluongton: parseInt(formData.soluongton),
        mo_ta: formData.mo_ta || null,
        hinhanh: formData.hinhanh || null,
      };

      if (formData.type === 'Sach') {
        payload.tenSach = formData.tenSach;
        if (formData.nhaxuatban_id) payload.nhaxuatban_id = parseInt(formData.nhaxuatban_id);
        if (formData.tacgia_id) payload.tacgia_id = parseInt(formData.tacgia_id);
        if (formData.loaisach_code) payload.loaisach_code = formData.loaisach_code;
        if (formData.namXB) payload.namXB = parseInt(formData.namXB);
      } else {
        payload.tenVPP = formData.tenVPP;
      }

      if (editingId) {
        await api.put(`/employee/products/${editingId}`, payload);
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        const res = await api.post('/employee/products', payload);
        // Upload image if selected
        if (imageFile && res.data?.product?.sanpham_id) {
          const fd = new FormData();
          fd.append('hinhanh_file', imageFile);
          await api.post(`/employee/products/${res.data.product.sanpham_id}/image`, fd, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
        toast.success('Thêm sản phẩm thành công');
      }

      // Upload image for existing product
      if (editingId && imageFile) {
        const fd = new FormData();
        fd.append('hinhanh_file', imageFile);
        await api.post(`/employee/products/${editingId}/image`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setShowModal(false);
      fetchProducts();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Lỗi lưu sản phẩm');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    try {
      await api.delete(`/employee/products/${id}`);
      toast.success('Đã xóa sản phẩm');
      fetchProducts();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Lỗi xóa sản phẩm');
    }
  };

  const filtered = products.filter(p => {
    const name = (p.sach?.tenSach || p.van_phong_pham?.tenVPP || '').toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const inputStyle = 'w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition';
  const labelStyle = 'block text-sm font-semibold text-gray-700 mb-1';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button className="btn-primary flex items-center gap-2" onClick={openAdd}>
          <FiPlus /> Thêm sản phẩm
        </button>
      </div>

      <div className="admin-card">
        <div className="mb-6 relative max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm sản phẩm..." className="w-full pl-10 pr-4 py-2 border rounded-none outline-none" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        {loading ? <p className="text-center py-8">Đang tải dữ liệu...</p> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Mã SP</th>
                <th>Tên sản phẩm</th>
                <th>Loại</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const name = p.sach?.tenSach || p.van_phong_pham?.tenVPP || `SP #${p.sanpham_id}`;
                const isSach = !!p.sach;
                return (
                  <tr key={p.sanpham_id}>
                    <td>
                      <img src={`/assets/images/${p.hinhanh}`} alt={name} className="w-12 h-12 object-cover rounded-none" onError={e => e.target.src='/placeholder.svg'} />
                    </td>
                    <td className="text-gray-400">#{p.sanpham_id}</td>
                    <td className="max-w-[250px] truncate font-medium">{name}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-none text-xs font-bold ${isSach ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {isSach ? 'Sách' : 'VPP'}
                      </span>
                    </td>
                    <td className="font-semibold text-indigo-600">{parseFloat(p.gia).toLocaleString('vi-VN')}₫</td>
                    <td>
                      <span className={`px-2 py-1 rounded-none text-xs font-bold ${p.soluongton > 5 ? 'bg-green-100 text-green-700' : p.soluongton === 0 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {p.soluongton}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-none" title="Sửa"><FiEdit2 /></button>
                        <button onClick={() => handleDelete(p.sanpham_id)} className="p-2 text-red-600 hover:bg-red-50 rounded-none" title="Xóa"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="text-center py-8 text-gray-400">Không có sản phẩm.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-none w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h3 className="text-lg font-bold">{editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-none"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Type */}
              <div>
                <label className={labelStyle}>Loại sản phẩm</label>
                <select name="type" value={formData.type} onChange={handleInput} className={inputStyle} disabled={!!editingId}>
                  <option value="Sach">📚 Sách</option>
                  <option value="VPP">✏️ Văn phòng phẩm</option>
                </select>
              </div>

              {/* Name */}
              {formData.type === 'Sach' ? (
                <div>
                  <label className={labelStyle}>Tên sách *</label>
                  <input type="text" name="tenSach" value={formData.tenSach} onChange={handleInput} required className={inputStyle} placeholder="Nhập tên sách" />
                </div>
              ) : (
                <div>
                  <label className={labelStyle}>Tên văn phòng phẩm *</label>
                  <input type="text" name="tenVPP" value={formData.tenVPP} onChange={handleInput} required className={inputStyle} placeholder="Nhập tên VPP" />
                </div>
              )}

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Giá bán (VNĐ) *</label>
                  <input type="number" name="gia" value={formData.gia} onChange={handleInput} required min="0" className={inputStyle} />
                </div>
                <div>
                  <label className={labelStyle}>Số lượng tồn kho *</label>
                  <input type="number" name="soluongton" value={formData.soluongton} onChange={handleInput} required min="0" className={inputStyle} />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className={labelStyle}>Danh mục</label>
                <select name="danhmucSP_id" value={formData.danhmucSP_id} onChange={handleInput} className={inputStyle}>
                  {categories.length > 0 ? categories.map(c => (
                    <option key={c.danhmucSP_id} value={c.danhmucSP_id}>{c.tenDanhMuc}</option>
                  )) : (
                    <>
                      <option value="1">Sách</option>
                      <option value="2">Văn phòng phẩm</option>
                    </>
                  )}
                </select>
              </div>

              {/* Book-specific fields */}
              {formData.type === 'Sach' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelStyle}>Nhà xuất bản</label>
                      <select name="nhaxuatban_id" value={formData.nhaxuatban_id} onChange={handleInput} className={inputStyle}>
                        <option value="">-- Chọn NXB --</option>
                        {publishers.map(pub => (
                          <option key={pub.nhaxuatban_id} value={pub.nhaxuatban_id}>{pub.ten}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelStyle}>Tác giả</label>
                      <select name="tacgia_id" value={formData.tacgia_id} onChange={handleInput} className={inputStyle}>
                        <option value="">-- Chọn tác giả --</option>
                        {authors.map(a => (
                          <option key={a.tacgia_id} value={a.tacgia_id}>{a.ho} {a.tendem} {a.ten}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelStyle}>Năm xuất bản</label>
                    <input type="number" name="namXB" value={formData.namXB} onChange={handleInput} min="1900" max="2100" className={inputStyle} placeholder="VD: 2024" />
                  </div>
                </>
              )}

              {/* Image */}
              <div>
                <label className={labelStyle}>Hình ảnh {editingId && '(để trống nếu không đổi)'}</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-none cursor-pointer transition">
                    <FiUpload /> Chọn ảnh
                    <input type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files[0])} />
                  </label>
                  {imageFile && <span className="text-sm text-green-600">{imageFile.name}</span>}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={labelStyle}>Mô tả</label>
                <textarea name="mo_ta" value={formData.mo_ta} onChange={handleInput} rows="3" className={inputStyle} placeholder="Nhập mô tả sản phẩm..." />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)} disabled={isSubmitting}>Hủy</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



