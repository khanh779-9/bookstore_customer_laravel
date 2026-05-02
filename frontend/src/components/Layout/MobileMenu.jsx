import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu({ isOpen, onClose, categories, isAuthenticated }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="h-full w-[85%] max-w-xs bg-white p-6 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-10">
              <span className="text-2xl font-black text-secondary tracking-tighter uppercase">BookZone</span>
              <button onClick={onClose} className="p-2 bg-slate-50 rounded-sm text-slate-400">
                <FiX size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-1 flex-1 overflow-y-auto custom-scrollbar">
              <MobileNavLink to="/" onClick={onClose}>Trang chủ</MobileNavLink>
              <MobileNavLink to="/products" onClick={onClose}>Sản phẩm</MobileNavLink>
              <MobileNavLink to="/about" onClick={onClose}>Giới thiệu</MobileNavLink>
              <MobileNavLink to="/contact" onClick={onClose}>Liên hệ</MobileNavLink>
              
              <div className="h-px bg-slate-100 my-4" />
              <p className="px-3 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Danh mục sách</p>
              
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?danhmucSP_id=${cat.id}`}
                  className="px-3 py-3 text-slate-600 font-bold text-sm hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {!isAuthenticated && (
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                <Link to="/login" onClick={onClose} className="w-full btn-dark py-4 text-center text-sm">Đăng nhập</Link>
                <Link to="/register" onClick={onClose} className="w-full btn-primary py-4 text-center text-sm">Đăng ký thành viên</Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileNavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="px-3 py-4 text-lg font-black text-secondary hover:text-primary transition-all border-b border-slate-50 last:border-none"
    >
      {children}
    </Link>
  );
}
