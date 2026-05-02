import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { formatCurrency, formatProductImage } from "../../utils/format";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white p-5 rounded-sm border border-slate-200 flex gap-6 hover:border-primary/20 transition-all shadow-sm hover:shadow-md"
    >
      {/* Product Image */}
      <Link
        to={`/products/${item.sanpham_id}`}
        className="w-20 h-28 bg-slate-50 rounded-sm flex items-center justify-center shrink-0 overflow-hidden border border-slate-100"
      >
        <img
          src={formatProductImage(item.image)}
          alt={item.name}
          className="w-full h-full object-contain transition-transform group-hover:scale-110"
        />
      </Link>

      {/* Info & Actions */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="flex justify-between gap-4">
          <div className="min-w-0">
            <Link
              to={`/products/${item.sanpham_id}`}
              className="font-black text-secondary text-base hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight"
            >
              {item.name}
            </Link>
            <p className="text-xs text-slate-400 mt-1 font-bold">
              Đơn giá: {formatCurrency(item.price)}
            </p>
          </div>
          
          <button
            onClick={() => onRemove(item.sanpham_id)}
            className="text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
            title="Xóa khỏi giỏ"
          >
            <FiTrash2 size={20} />
          </button>
        </div>

        <div className="flex items-end justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center bg-slate-900 rounded-sm p-1 shadow-lg">
            <button
              onClick={() => onUpdateQuantity(item.sanpham_id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <FiMinus />
            </button>
            <span className="w-10 text-center font-black text-white text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.sanpham_id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <FiPlus />
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Thành tiền</p>
            <p className="text-lg font-black text-primary">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
