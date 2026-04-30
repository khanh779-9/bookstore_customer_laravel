import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiInfo,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import Loading from "../components/Common/Loading";
import ConfirmModal from "../components/Common/ConfirmModal";
import { useState } from "react";

// ===== Quantity Control =====
function QuantityControl({ value, onDecrease, onIncrease }) {
  return (
    <div
      className="flex items-center border border-slate-100 rounded-xl bg-slate-50"
      style={{ width: "fit-content" }}
    >
      <button
        onClick={onDecrease}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-400 hover:text-secondary transition"
      >
        <FiMinus />
      </button>

      <span className="w-10 text-center font-black text-secondary">
        {value}
      </span>

      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-400 hover:text-secondary transition"
      >
        <FiPlus />
      </button>
    </div>
  );
}

export default function Cart() {
  const {
    cart = [],
    removeFromCart,
    updateCartItem,
    total = 0,
    isLoading,
  } = useCart();

  const { isAuthenticated } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, id: null });

  const handleRemove = (id) => {
    setConfirmDelete({ isOpen: true, id });
  };

  const onConfirmDelete = () => {
    removeFromCart(confirmDelete.id);
    setConfirmDelete({ isOpen: false, id: null });
  };

  const handleUpdateQuantity = (id, qty) => {
    if (qty < 1) return;
    updateCartItem(id, qty);
  };

  // ===== Loading =====
  if (isLoading && cart.length === 0) {
    return <Loading message="Đang tải giỏ hàng..." />;
  }

  // ===== Empty =====
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-28 text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-28 h-28 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center text-5xl mx-auto mb-6"
        >
          <FiShoppingBag />
        </motion.div>

        <h2 className="text-2xl font-black text-secondary mb-3">
          Giỏ hàng trống
        </h2>

        <p className="text-slate-500 mb-8">
          Chưa có sản phẩm nào. Đi mua thôi 👀
        </p>

        <Link to="/products" className="btn-primary px-8 py-3">
          Mua ngay <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-28 lg:pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* ===== Header ===== */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-4xl font-black text-secondary">
            Giỏ hàng
          </h1>

          <span className="text-xs text-slate-400 font-bold uppercase">
            {cart.length} sản phẩm
          </span>
        </div>

        {/* ===== Not login ===== */}
        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3 text-blue-700">
            <FiInfo />
            <span className="text-sm font-medium">
              Chưa đăng nhập. Giỏ hàng chỉ lưu tạm.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ===== List ===== */}
          <div className="lg:col-span-8 space-y-3">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.sanpham_id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-4 rounded-2xl border border-slate-200 flex gap-4"
                >
                  {/* Image */}
                  <Link
                    to={`/products/${item.sanpham_id}`}
                    className="w-16 h-20 bg-slate-50 rounded-xl flex items-center justify-center shrink-0"
                  >
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `/assets/images/products/${
                              item.image || "defaultProduct.png"
                            }`
                      }
                      className="w-full h-full object-contain"
                    />
                  </Link>

                  {/* Info + Control */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/products/${item.sanpham_id}`}
                        className="font-black text-secondary text-sm line-clamp-2"
                      >
                        {item.name}
                      </Link>

                      <p className="text-xs text-slate-400 mt-1">
                        {item.price.toLocaleString("vi-VN")}₫
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-2 mt-3">
                      <QuantityControl
                        value={item.quantity}
                        onDecrease={() =>
                          handleUpdateQuantity(
                            item.sanpham_id,
                            item.quantity - 1,
                          )
                        }
                        onIncrease={() =>
                          handleUpdateQuantity(
                            item.sanpham_id,
                            item.quantity + 1,
                          )
                        }
                      />

                      <div className="flex items-center justify-between">
                        <span className="text-primary font-black text-sm">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}
                          ₫
                        </span>

                        <button
                          onClick={() => handleRemove(item.sanpham_id)}
                          className="text-slate-400 hover:text-red-500 w-8 h-8 cursor-pointer"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-secondary mt-3 text-sm"
            >
              <FiArrowLeft /> Tiếp tục mua
            </Link>
          </div>

          {/* ===== Desktop Summary ===== */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white p-6 border border-slate-200 rounded-2xl sticky top-24">
              <h3 className="font-black text-xl mb-6">Tổng đơn</h3>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{total.toLocaleString("vi-VN")}₫</span>
                </div>

                <div className="flex justify-between text-green-500">
                  <span>Ship</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-black mb-6">
                <span>Tổng</span>
                <span className="text-primary">
                  {total.toLocaleString("vi-VN")}₫
                </span>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-black text-white py-4 rounded-xl flex justify-center items-center gap-2"
              >
                Thanh toán <FiChevronRight />
              </Link>

              <div className="mt-6 space-y-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <FiShield /> Thanh toán an toàn
                </div>
                <div className="flex items-center gap-2">
                  <FiTruck /> Giao hàng miễn phí
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile Bottom Bar ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-xs text-slate-400">Tổng</p>
          <p className="text-lg font-black text-primary">
            {total.toLocaleString("vi-VN")}₫
          </p>
        </div>

        <Link
          to="/checkout"
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
        >
          Thanh toán <FiChevronRight />
        </Link>
      </div>

      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, id: null })}
        onConfirm={onConfirmDelete}
        title="Xóa sản phẩm"
        message="Bạn có chắc muốn xóa cuốn sách này khỏi giỏ hàng?"
        confirmText="Xóa ngay"
        type="danger"
      />
    </div>
  );
}
