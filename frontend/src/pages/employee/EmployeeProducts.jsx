import { useState, useEffect } from "react";
import api from "../../api/client";
import { useToast } from "../../contexts/ToastContext";
import { FiUpload, FiCheck } from "react-icons/fi";
import AdminPageHeader from "../../components/Admin/AdminPageHeader";
import AdminDataTable from "../../components/Admin/AdminDataTable";
import AdminModal from "../../components/Admin/AdminModal";
import AdminSearchInput from "../../components/Admin/AdminSearchInput";

const INIT_FORM = {
  type: "Sach",
  danhmucSP_id: "1",
  gia: "",
  soluongton: "",
  mo_ta: "",
  hinhanh: "",
  // Book
  tenSach: "",
  nhaxuatban_id: "",
  tacgia_id: "",
  loaisach_code: "",
  namXB: "",
  // VPP
  tenVPP: "",
};

export default function EmployeeProducts() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ ...INIT_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  // Lookup data
  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchLookups();
  }, [searchTerm]);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/products`, { params: { page, q: searchTerm } });
      setProducts(res.data.data || []);
      if (res.data.meta) {
        setPagination({
          current_page: res.data.meta.current_page,
          last_page: res.data.meta.last_page
        });
      }
    } catch (e) {
      showToast("Lỗi tải danh sách sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchLookups = async () => {
    try {
      const [pubRes, authRes, catRes] = await Promise.all([
        api.get("/publishers"),
        api.get("/authors"),
        api.get("/categories"),
      ]);
      setPublishers(pubRes.data.data || pubRes.data || []);
      setAuthors(authRes.data.data || authRes.data || []);
      setCategories(catRes.data.data || catRes.data || []);
    } catch (e) {
      /* ignore */
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      type: isSach ? "Sach" : "VPP",
      danhmucSP_id: String(p.danhmucSP_id || "1"),
      gia: p.gia ?? "",
      soluongton: p.soluongton ?? "",
      mo_ta: p.mo_ta || "",
      hinhanh: p.hinhanh || "",
      tenSach: p.sach?.tenSach || "",
      nhaxuatban_id: p.sach?.nhaxuatban_id || "",
      tacgia_id: p.sach?.tacgia_id || "",
      loaisach_code: p.sach?.loaisach_code || "",
      namXB: p.sach?.namXB || "",
      tenVPP: p.van_phong_pham?.tenVPP || "",
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

      if (formData.type === "Sach") {
        payload.tenSach = formData.tenSach;
        if (formData.nhaxuatban_id)
          payload.nhaxuatban_id = parseInt(formData.nhaxuatban_id);
        if (formData.tacgia_id)
          payload.tacgia_id = parseInt(formData.tacgia_id);
        if (formData.loaisach_code)
          payload.loaisach_code = formData.loaisach_code;
        if (formData.namXB) payload.namXB = parseInt(formData.namXB);
      } else {
        payload.tenVPP = formData.tenVPP;
      }

      if (editingId) {
        await api.put(`/employee/products/${editingId}`, payload);
        showToast("Cập nhật sản phẩm thành công", "success");
      } else {
        const res = await api.post("/employee/products", payload);
        if (imageFile && res.data?.product?.sanpham_id) {
          const fd = new FormData();
          fd.append("hinhanh_file", imageFile);
          await api.post(
            `/employee/products/${res.data.product.sanpham_id}/image`,
            fd,
            {
              headers: { "Content-Type": "multipart/form-data" },
            },
          );
        }
        showToast("Thêm sản phẩm thành công", "success");
      }

      if (editingId && imageFile) {
        const fd = new FormData();
        fd.append("hinhanh_file", imageFile);
        await api.post(`/employee/products/${editingId}/image`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      fetchProducts();
    } catch (e) {
      showToast(e.response?.data?.message || "Lỗi lưu sản phẩm", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await api.delete(`/employee/products/${id}`);
      showToast("Đã xóa sản phẩm", "success");
      fetchProducts();
    } catch (e) {
      showToast(e.response?.data?.message || "Lỗi xóa sản phẩm", "error");
    }
  };

  const filtered = products.filter((p) => {
    const name = (
      p.sach?.tenSach ||
      p.van_phong_pham?.tenVPP ||
      ""
    ).toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const columns = [
    {
      header: "Sản phẩm",
      render: (p) => {
        const name =
          p.sach?.tenSach || p.van_phong_pham?.tenVPP || `SP #${p.sanpham_id}`;
        return (
          <div className="flex items-center gap-4">
            <div className="w-12 h-16 shrink-0 bg-slate-100 rounded-sm overflow-hidden border border-slate-100 shadow-sm">
              <img
                src={`/assets/images/products/${p.hinhanh}`}
                alt={name}
                className="w-full h-full object-cover transition-transform hover:scale-110"
                onError={(e) =>
                  (e.target.src = "/assets/image/defaultProduct_2.png")
                }
              />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-slate-900 truncate max-w-[300px]">
                {name}
              </div>
              <div className="text-[10px] text-slate-400 font-bold tracking-widest">
                ID: #{p.sanpham_id}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Loại",
      cellClassName: "text-center",
      render: (p) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            !!p.sach
              ? "bg-indigo-50 text-indigo-600"
              : "bg-purple-50 text-purple-600"
          }`}
        >
          {!!p.sach ? "Sách" : "VPP"}
        </span>
      ),
    },
    {
      header: "Giá bán",
      render: (p) => (
        <span className="font-bold text-primary">
          {parseFloat(p.gia).toLocaleString("vi-VN")}₫
        </span>
      ),
    },
    {
      header: "Tồn kho",
      cellClassName: "text-center",
      render: (p) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            p.soluongton > 10
              ? "bg-emerald-50 text-emerald-600"
              : p.soluongton === 0
                ? "bg-rose-50 text-rose-600"
                : "bg-amber-50 text-amber-600"
          }`}
        >
          {p.soluongton} sản phẩm
        </span>
      ),
    },
  ];

  const inputStyle =
    "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-sm";
  const labelStyle =
    "block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <div className="space-y-4 bg-slate-50 p-4 md:p-8 min-h-full">
      <AdminPageHeader
        title="Quản lý Sản phẩm"
        description="Danh sách toàn bộ sách và văn phòng phẩm trong hệ thống."
        onAdd={openAdd}
        addLabel="Thêm sản phẩm mới"
      />

      <AdminSearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Tìm theo tên sản phẩm..."
      />

      <AdminDataTable
        columns={columns}
        data={products}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
        idField="sanpham_id"
        emptyMessage="Không tìm thấy sản phẩm nào"
        pagination={{
          current_page: pagination.current_page,
          last_page: pagination.last_page,
          onPageChange: (page) => fetchProducts(page),
        }}
      />

      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
        subtitle="Vui lòng điền đầy đủ các thông tin bắt buộc (*)"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Loại sản phẩm</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInput}
                className={inputStyle}
                disabled={!!editingId}
              >
                <option value="Sach">📚 Sách</option>
                <option value="VPP">✏️ Văn phòng phẩm</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Danh mục</label>
              <select
                name="danhmucSP_id"
                value={formData.danhmucSP_id}
                onChange={handleInput}
                className={inputStyle}
              >
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c.danhmucSP_id} value={c.danhmucSP_id}>
                      {c.tenDanhMuc}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="1">Sách</option>
                    <option value="2">Văn phòng phẩm</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {formData.type === "Sach" ? (
            <div>
              <label className={labelStyle}>Tên sách *</label>
              <input
                type="text"
                name="tenSach"
                value={formData.tenSach}
                onChange={handleInput}
                required
                className={inputStyle}
                placeholder="Nhập tên sách"
              />
            </div>
          ) : (
            <div>
              <label className={labelStyle}>Tên văn phòng phẩm *</label>
              <input
                type="text"
                name="tenVPP"
                value={formData.tenVPP}
                onChange={handleInput}
                required
                className={inputStyle}
                placeholder="Nhập tên VPP"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Giá bán (VNĐ) *</label>
              <input
                type="number"
                name="gia"
                value={formData.gia}
                onChange={handleInput}
                required
                min="0"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Số lượng tồn kho *</label>
              <input
                type="number"
                name="soluongton"
                value={formData.soluongton}
                onChange={handleInput}
                required
                min="0"
                className={inputStyle}
              />
            </div>
          </div>

          {formData.type === "Sach" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Nhà xuất bản</label>
                  <select
                    name="nhaxuatban_id"
                    value={formData.nhaxuatban_id}
                    onChange={handleInput}
                    className={inputStyle}
                  >
                    <option value="">-- Chọn NXB --</option>
                    {publishers.map((pub) => (
                      <option key={pub.nhaxuatban_id} value={pub.nhaxuatban_id}>
                        {pub.ten}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Tác giả</label>
                  <select
                    name="tacgia_id"
                    value={formData.tacgia_id}
                    onChange={handleInput}
                    className={inputStyle}
                  >
                    <option value="">-- Chọn tác giả --</option>
                    {authors.map((a) => (
                      <option key={a.tacgia_id} value={a.tacgia_id}>
                        {a.ho} {a.tendem} {a.ten}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelStyle}>Năm xuất bản</label>
                <input
                  type="number"
                  name="namXB"
                  value={formData.namXB}
                  onChange={handleInput}
                  min="1900"
                  max="2100"
                  className={inputStyle}
                  placeholder="VD: 2024"
                />
              </div>
            </>
          )}

          <div>
            <label className={labelStyle}>
              Hình ảnh {editingId && "(để trống nếu không đổi)"}
            </label>
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 border-dashed rounded-sm">
              <label className="flex flex-col items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-sm cursor-pointer hover:bg-slate-50 transition-all shadow-sm group">
                <FiUpload className="text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-xs font-bold text-slate-600">
                  Chọn ảnh
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </label>
              <div className="flex-1">
                {imageFile ? (
                  <span className="text-sm font-medium text-emerald-600 flex items-center gap-2">
                    <FiCheck /> {imageFile.name}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">
                    Định dạng hỗ trợ: JPG, PNG, WEBP (Max 2MB)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className={labelStyle}>Mô tả chi tiết</label>
            <textarea
              name="mo_ta"
              value={formData.mo_ta}
              onChange={handleInput}
              rows="4"
              className={`${inputStyle} resize-none`}
              placeholder="Mô tả tóm tắt nội dung sản phẩm..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-sm font-bold hover:bg-slate-100 transition-all cursor-pointer"
              onClick={() => setShowModal(false)}
              disabled={isSubmitting}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-slate-900 text-white rounded-sm text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:shadow-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : editingId ? (
                "Cập nhật thay đổi"
              ) : (
                "Thêm vào hệ thống"
              )}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
