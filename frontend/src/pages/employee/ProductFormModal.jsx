import { useState, useEffect } from "react";
import AdminModal from "../../components/Admin/AdminModal";
import { FiUpload, FiCheck } from "react-icons/fi";

const inputStyle = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-sm";
const labelStyle = "block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1";

export default function ProductFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData, 
  isSubmitting,
  categories = [],
  publishers = [],
  authors = []
}) {
  const [formData, setFormData] = useState(initialData);
  const [imageFile, setImageFile] = useState(null);
  const [newAttrKey, setNewAttrKey] = useState("");
  const [newAttrValue, setNewAttrValue] = useState("");

  useEffect(() => {
    setFormData(initialData);
    setImageFile(null);
  }, [initialData, isOpen]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, imageFile);
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData.sanpham_id ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
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
              disabled={!!initialData.sanpham_id}
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
              {categories.map((c) => (
                <option key={c.danhmucSP_id} value={c.danhmucSP_id}>
                  {c.tenDanhMuc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelStyle}>Tên sản phẩm *</label>
          <input
            type="text"
            name="tenSP"
            value={formData.tenSP}
            onChange={handleInput}
            required
            className={inputStyle}
            placeholder="Nhập tên sản phẩm"
          />
        </div>

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
            Hình ảnh {initialData.sanpham_id && "(để trống nếu không đổi)"}
          </label>
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 border-dashed rounded-sm">
            <label className="flex flex-col items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-sm cursor-pointer hover:bg-slate-50 transition-all shadow-sm group">
              <FiUpload className="text-slate-400 group-hover:text-primary transition-colors" />
              <span className="text-xs font-bold text-slate-600">Chọn ảnh</span>
              <input
                type="file"
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
                <span className="text-xs text-slate-400">Định dạng hỗ trợ: JPG, PNG, WEBP (Max 2MB)</span>
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

        <div className="p-4 bg-slate-50 rounded-sm border border-slate-200">
          <label className={labelStyle}>Thuộc tính bổ sung (JSON)</label>
          <div className="space-y-3">
            {Object.entries(formData.attributes || {}).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-medium">
                  <span className="text-slate-400 mr-2">{key}:</span> {val}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = { ...formData.attributes };
                    delete next[key];
                    setFormData({ ...formData, attributes: next });
                  }}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition-colors"
                >Xóa</button>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Tên thuộc tính"
                value={newAttrKey}
                onChange={(e) => setNewAttrKey(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded text-sm outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Giá trị"
                  value={newAttrValue}
                  onChange={(e) => setNewAttrValue(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded text-sm outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newAttrKey.trim()) return;
                    setFormData({
                      ...formData,
                      attributes: { ...formData.attributes, [newAttrKey.trim()]: newAttrValue }
                    });
                    setNewAttrKey("");
                    setNewAttrValue("");
                  }}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-800 transition-all"
                >Thêm</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-sm font-bold hover:bg-slate-100 transition-all cursor-pointer"
            onClick={onClose}
            disabled={isSubmitting}
          >Hủy bỏ</button>
          <button
            type="submit"
            className="px-8 py-2.5 bg-slate-900 text-white rounded-sm text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer disabled:bg-slate-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (initialData.sanpham_id ? "Cập nhật" : "Thêm mới")}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
