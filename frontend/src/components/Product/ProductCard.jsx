import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { FiShoppingCart, FiEye, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";
import { useToast } from "../../contexts/ToastContext";
import { useState } from "react";
import { cn } from "../../utils/cn";
import api from "../../api/client";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(
    product.is_wishlisted || false,
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await api.post("/wishlist/toggle", {
        sanpham_id: product.id,
      });
      setIsWishlisted(res.data.added);
      showToast(res.data.message, "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Vui lòng đăng nhập", "error");
    }
  };

  const hasPromo = product.promo_price && product.promo_price < product.price;

  const discountPercent = hasPromo
    ? Math.round(((product.price - product.promo_price) / product.price) * 100)
    : 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.03, ease: "easeOut" }}
      className="group p-1 bg-white border border-slate-200 hover:border-primary hover:shadow-lg transition-all flex flex-col overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative p-1.5">
        <Link
          to={`/products/${product.id}`}
          className="block w-full h-[180px] bg-slate-50 flex items-center justify-center p-2 overflow-hidden"
        >
          <img
            src={`/assets/images/products/${product.image || "defaultProduct.png"}`}
            alt={product.display_name}
            className="w-full h-full object-contain"
            loading="lazy"
          />

          {hasPromo && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5">
              -{discountPercent}%
            </div>
          )}
        </Link>

        {/* ACTIONS */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
          <button
            type="button"
            onClick={toggleWishlist}
            className={cn(
              "w-7 h-7 flex items-center justify-center transition cursor-pointer",
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white text-slate-400 hover:text-red-500",
            )}
          >
            <FiHeart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-3 pt-5 pb-2.5 flex flex-col gap-1">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-[14px] font-bold text-secondary line-clamp-1 hover:text-primary transition-colors leading-tight">
            {product.display_name}
          </h3>
        </Link>

        {/* PRICE + CART */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {hasPromo ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-primary">
                  {product.promo_price.toLocaleString("vi-VN")}₫
                </span>
                <span className="text-[10px] text-slate-400 line-through">
                  {product.price.toLocaleString("vi-VN")}₫
                </span>
              </div>
            ) : (
              <span className="text-sm font-black text-secondary">
                {product.price.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-primary hover:text-white transition cursor-pointer"
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* SOLD */}
        <div className="text-[10px] text-slate-400 font-medium">
          Đã bán {product.sold_quantity || 0}
        </div>
      </div>
    </motion.article>
  );
}
