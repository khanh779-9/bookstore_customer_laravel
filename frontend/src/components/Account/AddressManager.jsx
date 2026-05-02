import { useState } from "react";
import { FiMapPin, FiEdit2, FiTrash2, FiPlus, FiSave, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { TextArea, ConfirmModal } from "@/shared/ui";
import api from "../../api/client";
import { useToast } from "../../contexts/ToastContext";

export default function AddressManager({ addresses, onRefresh }) {
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, id: null });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await api.put(`/addresses/${editingAddress.dcgh_id}`, { diachi: newAddress });
        showToast("Cập nhật địa chỉ thành công", "success");
      } else {
        await api.post("/addresses", { diachi: newAddress });
        showToast("Thêm địa chỉ mới thành công", "success");
      }
      onRefresh();
      closeModal();
    } catch {
      showToast("Lỗi lưu địa chỉ", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/addresses/${confirmDelete.id}`);
      showToast("Đã xóa địa chỉ", "success");
      onRefresh();
    } catch {
      showToast("Lỗi xóa địa chỉ", "error");
    } finally {
      setConfirmDelete({ isOpen: false, id: null });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAddress(null);
    setNewAddress("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-secondary uppercase tracking-tight">Địa chỉ giao hàng</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Quản lý nơi nhận sách của bạn</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all"
        >
          <FiPlus /> Thêm mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length === 0 ? (
          <div className="col-span-full py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm text-center">
            <FiMapPin className="mx-auto text-slate-200 text-4xl mb-4" />
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Chưa có địa chỉ nào</p>
          </div>
        ) : (
          addresses.map((addr) => (
            <div key={addr.dcgh_id} className="group bg-white p-6 border border-slate-100 rounded-sm hover:border-primary/30 hover:shadow-xl transition-all relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                  <FiMapPin size={20} />
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditingAddress(addr); setNewAddress(addr.diachi); setShowModal(true); }} className="p-2 text-slate-400 hover:text-primary transition-colors"><FiEdit2 /></button>
                  <button onClick={() => setConfirmDelete({ isOpen: true, id: addr.dcgh_id })} className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><FiTrash2 /></button>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-600 leading-relaxed">{addr.diachi}</p>
              {addr.is_default && <span className="absolute bottom-4 right-4 text-[8px] font-black uppercase tracking-widest text-slate-300">Mặc định</span>}
            </div>
          ))
        )}
      </div>

      {/* Address Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white p-8 rounded-sm shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-secondary uppercase tracking-tight">{editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-secondary"><FiX size={24} /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-6">
                <TextArea
                  label="Địa chỉ chi tiết"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  required
                />
                <button type="submit" className="w-full btn-dark py-4 flex items-center justify-center gap-2">
                  <FiSave /> {editingAddress ? "Cập nhật" : "Lưu địa chỉ"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Xóa địa chỉ"
        message="Bạn có chắc muốn xóa địa chỉ này không?"
        confirmText="Xóa ngay"
        type="danger"
      />
    </div>
  );
}
