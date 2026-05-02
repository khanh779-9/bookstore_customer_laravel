import { Link } from "react-router-dom";
import { FiCheckCircle, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export default function CheckoutAddressSection({ addresses, selectedId, onSelect }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">1. Địa chỉ giao hàng</h2>
        <Link to="/account" className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:underline">
          <FiPlus /> Thêm địa chỉ mới
        </Link>
      </div>

      {addresses.length === 0 ? (
        <div className="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm text-center">
          <p className="text-slate-400 font-bold mb-4">Bạn chưa có địa chỉ giao hàng nào.</p>
          <Link to="/account" className="btn-dark px-8 py-3 text-xs">Cập nhật ngay</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.dcgh_id}
              onClick={() => onSelect(addr.dcgh_id.toString())}
              className={cn(
                "relative p-6 rounded-sm border-2 transition-all cursor-pointer flex items-start gap-4",
                selectedId == addr.dcgh_id
                  ? "bg-white border-slate-900 shadow-xl shadow-slate-200"
                  : "bg-white border-slate-100 hover:border-slate-300"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1",
                selectedId == addr.dcgh_id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200"
              )}>
                {selectedId == addr.dcgh_id && <FiCheckCircle size={14} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-black text-secondary uppercase tracking-tight">{addr.ten_nguoi_nhan || 'Người nhận'}</span>
                  {addr.is_default && <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded-sm font-black uppercase tracking-widest text-slate-400">Mặc định</span>}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{addr.diachi}</p>
                <p className="text-xs text-slate-400 mt-2 font-bold">{addr.sdt || 'Chưa có số điện thoại'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
