import { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../api/client";
import { useToast } from "../../contexts/ToastContext";
import { formatCurrency, formatProductImage } from "../../utils/format";
import AdminPageHeader from "../../components/Admin/AdminPageHeader";
import AdminDataTable from "../../components/Admin/AdminDataTable";
import AdminSearchInput from "../../components/Admin/AdminSearchInput";
import ProductFormModal from "./ProductFormModal";

const INIT_FORM = {
  type: "Sach",
  danhmucSP_id: "1",
  tenSP: "",
  gia: "",
  soluongton: "",
  mo_ta: "",
  hinhanh: "",
  attributes: {},
  nhaxuatban_id: "",
  tacgia_id: "",
  loaisach_code: "",
  namXB: "",
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
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  const [lookups, setLookups] = useState({
    publishers: [],
    authors: [],
    categories: []
  });

  const fetchProducts = useCallback(async (page = 1) => {
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
    } catch {
      showToast("Lỗi tải danh sách sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, showToast]);

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const [pub, auth, cat] = await Promise.all([
          api.get("/publishers"),
          api.get("/authors"),
          api.get("/categories"),
        ]);
        setLookups({
          publishers: pub.data.data || pub.data || [],
          authors: auth.data.data || auth.data || [],
          categories: cat.data.data || cat.data || []
        });
      } catch { /* ignore */ }
    };
    fetchProducts();
    fetchLookups();
  }, [fetchProducts]);

  const openEdit = (p) => {
    setEditingId(p.sanpham_id);
    setFormData({
      sanpham_id: p.sanpham_id,
      type: p.sach ? "Sach" : "VPP",
      danhmucSP_id: String(p.danhmucSP_id || "1"),
      tenSP: p.tenSP || "",
      gia: p.gia ?? "",
      soluongton: p.soluongton ?? "",
      mo_ta: p.mo_ta || "",
      hinhanh: p.hinhanh || "",
      attributes: p.attributes || {},
      nhaxuatban_id: p.sach?.nhaxuatban_id || "",
      tacgia_id: p.sach?.tacgia_id || "",
      loaisach_code: p.sach?.loaisach_code || "",
      namXB: p.sach?.namXB || "",
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (data, imageFile) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        type: data.type.toLowerCase(),
        danhmucSP_id: parseInt(data.danhmucSP_id),
        gia: parseFloat(data.gia),
        soluongton: parseInt(data.soluongton),
      };

      const res = editingId 
        ? await api.put(`/employee/products/${editingId}`, payload)
        : await api.post("/employee/products", payload);

      const productId = editingId || res.data?.product?.sanpham_id;

      if (imageFile && productId) {
        const fd = new FormData();
        fd.append("hinhanh_file", imageFile);
        await api.post(`/employee/products/${productId}/image`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      showToast(`${editingId ? "Cập nhật" : "Thêm"} sản phẩm thành công`, "success");
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

  const columns = useMemo(() => [
    {
      header: "Sản phẩm",
      render: (p) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-16 shrink-0 bg-slate-100 rounded-sm overflow-hidden border border-slate-100 shadow-sm">
            <img
              src={formatProductImage(p.hinhanh)}
              alt={p.tenSP}
              className="w-full h-full object-cover transition-transform hover:scale-110"
              onError={(e) => (e.target.src = "/assets/images/products/defaultProduct.png")}
            />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-slate-900 truncate max-w-[300px]">{p.tenSP}</div>
            <div className="text-[10px] text-slate-400 font-bold tracking-widest">ID: #{p.sanpham_id}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Loại",
      cellClassName: "text-center",
      render: (p) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${p.sach ? "bg-indigo-50 text-indigo-600" : "bg-purple-50 text-purple-600"}`}>
          {p.sach ? "Sách" : "VPP"}
        </span>
      ),
    },
    {
      header: "Giá bán",
      render: (p) => <span className="font-bold text-primary">{formatCurrency(parseFloat(p.gia))}</span>,
    },
    {
      header: "Tồn kho",
      cellClassName: "text-center",
      render: (p) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${p.soluongton > 10 ? "bg-emerald-50 text-emerald-600" : p.soluongton === 0 ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"}`}>
          {p.soluongton}
        </span>
      ),
    },
  ], []);

  return (
    <div className="space-y-4 bg-slate-50 p-4 md:p-8 min-h-full">
      <AdminPageHeader
        title="Quản lý Sản phẩm"
        description="Danh sách toàn bộ sách và văn phòng phẩm trong hệ thống."
        onAdd={() => { setEditingId(null); setFormData({ ...INIT_FORM }); setShowModal(true); }}
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
        pagination={{
          current_page: pagination.current_page,
          last_page: pagination.last_page,
          onPageChange: fetchProducts,
        }}
      />

      <ProductFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleFormSubmit}
        initialData={formData}
        isSubmitting={isSubmitting}
        categories={lookups.categories}
        publishers={lookups.publishers}
        authors={lookups.authors}
      />
    </div>
  );
}
